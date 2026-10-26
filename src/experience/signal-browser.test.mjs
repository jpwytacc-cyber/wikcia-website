// Isolated integration fixture; does not import App or alter the shared production build.
// Start: node src/experience/signal-browser.test.mjs --serve
// Open: http://127.0.0.1:5188/__signal
import { createServer } from 'vite';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

if (process.argv.includes('--serve')) {
  const server = await createServer({
    cacheDir: join(process.env.TMPDIR || tmpdir(), 'wikcia-signal-vite'),
    optimizeDeps: { include: ['react', 'react-dom/client', 'three', 'three/addons/environments/RoomEnvironment.js'] },
    server: { host: '127.0.0.1', port: 5188, strictPort: true, open: false },
    plugins: [{
      name: 'signal-isolated-test-fixture',
      resolveId(id) { if (id === '/__signal-entry.js') return '\0signal-test-entry'; },
      load(id) {
        if (id === '\0signal-test-entry') return `
import React from 'react';
import { createRoot } from 'react-dom/client';
import SignalScene from '/src/experience/SignalScene.tsx';
const root = createRoot(document.getElementById('root'));
window.unmountSignal = () => root.unmount();
root.render(React.createElement(React.StrictMode, null, React.createElement(SignalScene)));`;
      },
      configureServer(vite) {
        vite.middlewares.use('/__signal', async (_request, response) => {
          response.setHeader('Content-Type', 'text/html');
          response.end(await vite.transformIndexHtml('/__signal', `<!doctype html>
<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Signal sculpture isolated test</title>
<style>body{margin:0;background:#f1f0e9;font-family:Arial,sans-serif}#root{width:min(700px,100%);margin:20px auto}</style>
</head><body><div id="root"></div><script type="module" src="/__signal-entry.js"></script></body></html>`));
        });
      },
    }],
  });
  await server.listen();
  console.log('SIGNAL_FIXTURE_READY http://127.0.0.1:5188/__signal');
}
