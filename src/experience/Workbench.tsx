import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ARTIFACT_COMPOSITIONS,
  ARTIFACT_PALETTES,
  DEFAULT_SETTINGS,
  buildArtifact,
} from './artifact';
import type { ArtifactComposition, ArtifactSettings } from './artifact';
import './workbench.css';

function FormIcon({ composition }: { composition: ArtifactComposition }) {
  return (
    <svg className="wb-form-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {composition === 'ribbon' && <>
        <path d="M10 30C-2 12 34-1 31 15S5 37 10 21 37 12 30 30" />
        <path d="M13 32C1 14 37 1 34 17S8 39 13 23 40 14 33 32" />
      </>}
      {composition === 'orbit' && <>
        <circle cx="20" cy="20" r="12" />
        <ellipse cx="20" cy="20" rx="6" ry="12" transform="rotate(-30 20 20)" />
        <ellipse cx="20" cy="20" rx="18" ry="5" transform="rotate(-30 20 20)" />
      </>}
      {composition === 'contour' && [0, 1, 2, 3, 4].map(index => (
        <path key={index} d={`M4 ${12 + index * 4}C12 ${24 + index * 2} 23 ${index * 3} 36 ${14 + index * 4}`} />
      ))}
    </svg>
  );
}

/** Browser-only interactive study; no inference, network calls or persisted input. */
export function Workbench() {
  const id = useId();
  const [settings, setSettings] = useState<ArtifactSettings>({ ...DEFAULT_SETTINGS });
  const [exportStatus, setExportStatus] = useState('');
  const exports = useRef(0);
  const downloads = useRef(new Map<string, number>());
  const artifact = useMemo(() => buildArtifact(settings), [settings]);

  useEffect(() => {
    const pending = downloads.current;
    return () => {
      pending.forEach((timer, url) => {
        window.clearTimeout(timer);
        URL.revokeObjectURL(url);
      });
      pending.clear();
    };
  }, []);

  function exportSvg() {
    let url: string | undefined;
    const anchor = document.createElement('a');
    try {
      url = URL.createObjectURL(new Blob([artifact], { type: 'image/svg+xml;charset=utf-8' }));
      anchor.href = url;
      anchor.download = `wikcia-${settings.palette}-${settings.composition}.svg`;
      document.body.append(anchor);
      anchor.click();
      const exportedUrl = url;
      // Allow the browser to consume the download before releasing its object URL.
      const timer = window.setTimeout(() => {
        URL.revokeObjectURL(exportedUrl);
        downloads.current.delete(exportedUrl);
      }, 2000);
      downloads.current.set(url, timer);
      exports.current += 1;
      setExportStatus(`Export ${exports.current} ready. SVG sent to your downloads.`);
    } catch {
      if (url) URL.revokeObjectURL(url);
      setExportStatus('The browser could not export this SVG. Please try again.');
    } finally {
      anchor.remove();
    }
  }

  return (
    <div className="wb-root" aria-label="Browser-only art-direction workbench">
      <div className="wb-topbar">
        <span className="wb-wordmark"><span className="wb-spark" aria-hidden="true">✳</span> WIKCIA / OPEN STUDIO</span>
        <span className="wb-topbar-note">A small tool for big ideas <span aria-hidden="true">↗</span></span>
      </div>

      <div className="wb-layout">
        <div className="wb-controls">
          <div className="wb-intro">
            <p className="wb-eyebrow">THE ART-DIRECTION LAB</p>
            <h3 className="wb-heading">Less prompting.<br />More playing.</h3>
            <p className="wb-description">Your words. Your palette. Your point of view. Make a graphic study, then take the real artwork with you.</p>
          </div>

          <div className="wb-title-control">
            <div className="wb-label-row">
              <label className="wb-label" htmlFor={`${id}-title`}><span>01</span> The words</label>
              <span className="wb-counter" aria-hidden="true">{settings.title.length}/32</span>
            </div>
            <input
              className="wb-title-input"
              id={`${id}-title`}
              type="text"
              maxLength={32}
              value={settings.title}
              onChange={event => setSettings(current => ({ ...current, title: event.target.value }))}
              aria-describedby={`${id}-title-hint`}
              autoComplete="off"
              spellCheck={false}
              placeholder="A thought worth making"
            />
            <p className="wb-hint" id={`${id}-title-hint`}>A short title. Up to 32 characters.</p>
          </div>

          <fieldset className="wb-fieldset">
            <legend className="wb-label"><span>02</span> The material</legend>
            <div className="wb-palette-options">
              {ARTIFACT_PALETTES.map(palette => (
                <label className={`wb-palette-option wb-palette-${palette.value}`} key={palette.value}>
                  <input
                    className="wb-radio"
                    type="radio"
                    name={`${id}-palette`}
                    value={palette.value}
                    checked={settings.palette === palette.value}
                    onChange={() => setSettings(current => ({ ...current, palette: palette.value }))}
                    aria-label={`${palette.label} — ${palette.description}`}
                  />
                  <span className="wb-swatch" aria-hidden="true"><span /></span>
                  <span className="wb-palette-name">{palette.label}</span>
                  <span className="wb-selection-mark" aria-hidden="true">✓</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="wb-fieldset">
            <legend className="wb-label"><span>03</span> The composition</legend>
            <div className="wb-form-options">
              {ARTIFACT_COMPOSITIONS.map((composition, index) => (
                <label className="wb-form-option" key={composition.value}>
                  <input
                    className="wb-radio"
                    type="radio"
                    name={`${id}-composition`}
                    value={composition.value}
                    checked={settings.composition === composition.value}
                    onChange={() => setSettings(current => ({ ...current, composition: composition.value }))}
                  />
                  <FormIcon composition={composition.value} />
                  <span className="wb-form-copy"><span className="wb-form-name">{composition.label}</span><span className="wb-form-description">{composition.description}</span></span>
                  <span className="wb-form-index" aria-hidden="true">0{index + 1}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="wb-actions">
            <button className="wb-export" type="button" onClick={exportSvg}>
              <span>Download your SVG</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></svg>
            </button>
            <div className="wb-export-meta"><span>Vector. Editable. Yours.</span><button className="wb-reset" type="button" onClick={() => setSettings({ ...DEFAULT_SETTINGS })}>Reset study <span aria-hidden="true">↺</span></button></div>
            <p className="wb-export-status" role="status" aria-live="polite" aria-atomic="true">{exportStatus}</p>
          </div>
        </div>

        <figure className="wb-stage">
          <div className="wb-stage-toolbar"><span><span className="wb-canvas-dot" aria-hidden="true" /> YOUR LIVE CANVAS</span><span>SVG / 900 × 1120</span></div>
          <div className="wb-canvas">
            <span className="wb-canvas-tag" aria-hidden="true">FORM FOLLOWS CURIOSITY.</span>
            <div
              className="wb-poster"
              // Only our pure generator is inserted. All editable text is XML-escaped.
              dangerouslySetInnerHTML={{ __html: artifact }}
            />
            <span className="wb-canvas-index" aria-hidden="true">W/01</span>
          </div>
          <figcaption className="wb-caption"><span>STUDY / {settings.palette.toUpperCase()} + {settings.composition.toUpperCase()}</span><span>Built from math. Directed by you.</span></figcaption>
        </figure>
      </div>

      <div className="wb-disclosure"><span><span className="wb-disclosure-dot" aria-hidden="true" /> Browser-only design study · no AI inference</span><span>Instant SVG, generated on your device. No uploads.</span></div>
    </div>
  );
}

export default Workbench;
