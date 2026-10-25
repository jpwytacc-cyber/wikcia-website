export type Locale = "en" | "nl" | "de" | "pl" | "el";

export const locales: Locale[] = ["en", "nl", "de", "pl", "el"];

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    nav_home: "Home",
    nav_about: "About",
    nav_showcase: "Showcase",
    nav_skills: "Skills",
    nav_tools: "Tools",
    nav_apps: "Connected Apps",
    nav_blog: "Dev News",
    nav_faq: "FAQs",
    nav_contact: "Contact",
    nav_login: "Login",
    // Hero
    hero_title: "Wikcia Studio",
    hero_tagline: "Imagine anything. Make it real.",
    hero_subtitle:
      "The proprietary creative and automation platform by Love & Pixels. 3D experiences, AI agents, workflow automation, and interactive digital products — built to ship.",
    hero_cta_primary: "Get Started",
    hero_cta_secondary: "View Showcase",
    // About
    about_title: "Why Wikcia",
    about_problem_title: "The Problem",
    about_problem:
      "Creative teams juggle a dozen disconnected tools. Designers can't ship code. Developers wait on assets. AI agents live in isolation. Nothing talks to anything. Projects stall.",
    about_solution_title: "The Solution",
    about_solution:
      "Wikcia Studio unifies design, automation, and AI in one platform. From the CLI to the Desktop app, every tool speaks the same language. Build once, deploy everywhere.",
    about_story_title: "Our Story",
    about_story:
      "Love & Pixels built Wikcia after years of wrestling with fragmented creative stacks. We needed a platform that could generate images, edit video, run autonomous agents, manage clients, and deploy websites — all from one command line. Wikcia is that platform.",
    // Showcase
    showcase_title: "Showcase",
    showcase_subtitle:
      "What Wikcia has built — and what you can build with it. Real projects, real automation, real results.",
    showcase_byloveandpixels: "Love & Pixels",
    showcase_byloveandpixels_desc: "Marketing, AI, analytics, consultancy and business development platform.",
    showcase_bella: "Bella Beauty Atelier",
    showcase_bella_desc: "Premium beauty booking platform with real appointment storage and Vercel deployment.",
    showcase_onyx: "Onyx Auto Studio",
    showcase_onyx_desc: "Five-language automotive detailing concept with localized prerendered routes and booking engine.",
    // Skills
    skills_title: "Skills & Capabilities",
    skills_subtitle:
      "Wikcia Studio ships with 40+ installed skills spanning creative, development, DevOps, research, media, and business automation.",
    // Tools
    tools_title: "Tools & Integrations",
    tools_subtitle:
      "Native CLI tools, local AI providers, and connected MCP servers that power the Wikcia ecosystem.",
    // Apps
    apps_title: "Connected Apps",
    apps_subtitle:
      "The Wikcia application hub — desktop, CLI, and web applications that connect to your workflow.",
    // Blog
    blog_title: "Dev News",
    blog_subtitle:
      "Behind the build. Engineering notes, release updates, and deep dives into the Wikcia platform.",
    // FAQ
    faq_title: "Frequently Asked Questions",
    faq_subtitle:
      "Everything you need to know about Wikcia Studio, from installation to enterprise deployment.",
    faq_q1: "What is Wikcia Studio?",
    faq_a1:
      "Wikcia Studio is a proprietary creative and automation platform by Love & Pixels. It combines a CLI, Desktop application, 40+ skills, local AI providers, and connected apps into one unified system.",
    faq_q2: "What platforms does it run on?",
    faq_a2:
      "Wikcia Studio runs on Windows, macOS, and Linux. The CLI works anywhere Node.js runs. The Desktop app is built with Electron.",
    faq_q3: "Is it open source?",
    faq_a3:
      "Wikcia Studio is proprietary software by Love & Pixels. It is built on a customized Hermes Agent foundation (Nous Research, MIT) but the product itself is commercial.",
    faq_q4: "Can I integrate my own tools?",
    faq_a4:
      "Yes. Wikcia supports MCP servers, custom skills, local model providers, and REST/webhook integrations so you can connect your existing stack.",
    faq_q5: "How do I get started?",
    faq_a5:
      "Install the Wikcia CLI, run `wikcia --version` to verify, then explore the skills catalog. The Desktop app provides a graphical interface for visual workflows.",
    // Contact
    contact_title: "Contact",
    contact_subtitle:
      "Ready to build with Wikcia? Get in touch with the Love & Pixels team.",
    contact_name: "Your name",
    contact_email: "Email address",
    contact_message: "Your message",
    contact_send: "Send message",
    // Footer
    footer_rights: "© 2026 Love & Pixels. Wikcia Studio is proprietary software.",
    footer_made_with: "Made with Wikcia Studio.",
  },
  nl: {
    nav_home: "Home",
    nav_about: "Over",
    nav_showcase: "Showcase",
    nav_skills: "Vaardigheden",
    nav_tools: "Tools",
    nav_apps: "Verbonden apps",
    nav_blog: "Ontwikkelnieuws",
    nav_faq: "Veelgestelde vragen",
    nav_contact: "Contact",
    nav_login: "Inloggen",
    hero_title: "Wikcia Studio",
    hero_tagline: "Stel je voor. Maak het waar.",
    hero_subtitle:
      "Het propriëtaire creatieve en automatiseringsplatform van Love & Pixels. 3D-ervaringen, AI-agenten, workflowautomatisering en interactieve digitale producten — gebouwd om te shippen.",
    hero_cta_primary: "Aan de slag",
    hero_cta_secondary: "Bekijk showcase",
    about_title: "Waarom Wikcia",
    about_problem_title: "Het probleem",
    about_problem:
      "Creatieve teams worstelen met een dozijn losse tools. Ontwerpers kunnen geen code shippen. Ontwikkelaars wachten op assets. AI-agenten leven in isolatie. Niets praat met iets. Projecten stagneren.",
    about_solution_title: "De oplossing",
    about_solution:
      "Wikcia Studio verenigt ontwerp, automatisering en AI op één platform. Van de CLI tot de Desktop-app, elk spreekt dezelfde taal. Bouw een keer, implementeer overal.",
    about_story_title: "Ons verhaal",
    about_story:
      "Love & Pixels bouwde Wikcia na jaren van worstelen met gefragmenteerde creatieve stacks. We hadden een platform nodig dat afbeeldingen kon genereren, video kon bewerken, autonome agenten kon uitvoeren, klanten kon beheren en websites kon implementeren — allemaal vanaf één opdrachtregel. Wikcia is dat platform.",
    showcase_title: "Showcase",
    showcase_subtitle:
      "Wat Wikcia heeft gebouwd — en wat jij ermee kunt bouwen. Echte projecten, echte automatisering, echte resultaten.",
    showcase_byloveandpixels: "Love & Pixels",
    showcase_byloveandpixels_desc: "Marketing, AI, analyse, consultancy en business developmentplatform.",
    showcase_bella: "Bella Beauty Atelier",
    showcase_bella_desc: "Premium beauty-boekingsplatform met echte afspraakopslag en Vercel-implementatie.",
    showcase_onyx: "Onyx Auto Studio",
    showcase_onyx_desc: "Vijftalige concept voor autodetailing met gelokaliseerde vooraf gerenderde routes en boekingsengine.",
    skills_title: "Vaardigheden en mogelijkheden",
    skills_subtitle:
      "Wikcia Studio wordt geleverd met 40+ geïnstalleerde vaardigheden die creatief, ontwikkeling, DevOps, onderzoek, media en bedrijfsautomatisering omvatten.",
    tools_title: "Tools en integraties",
    tools_subtitle:
      "Native CLI-tools, lokale AI-providers en verbonden MCP-servers die het Wikcia-ecosysteem aandrijven.",
    apps_title: "Verbonden apps",
    apps_subtitle:
      "De Wikcia-toepassingshub — desktop-, CLI- en webtoepassingen die verbinding maken met je workflow.",
    blog_title: "Ontwikkelnieuws",
    blog_subtitle:
      "Achter de schermen. Engineering-notities, release-updates en diepgaande analyses van het Wikcia-platform.",
    faq_title: "Veelgestelde vragen",
    faq_subtitle:
      "Alles wat je moet weten over Wikcia Studio, van installatie tot enterprise-implementatie.",
    faq_q1: "Wat is Wikcia Studio?",
    faq_a1:
      "Wikcia Studio is een propriëtair creatief en automatiseringsplatform van Love & Pixels. Het combineert een CLI, Desktop-toepassing, 40+ vaardigheden, lokale AI-providers en verbonden apps in één geünificeerd systeem.",
    contact_title: "Contact",
    contact_subtitle:
      "Klaar om met Wikcia te bouwen? Neem contact op met het Love & Pixels-team.",
    contact_name: "Je naam",
    contact_email: "E-mailadres",
    contact_message: "Je bericht",
    contact_send: "Bericht verzenden",
    footer_rights: "© 2026 Love & Pixels. Wikcia Studio is propriëtaire software.",
    footer_made_with: "Gemaakt met Wikcia Studio.",
  },
  de: {
    nav_home: "Startseite",
    nav_about: "Über uns",
    nav_showcase: "Showcase",
    nav_skills: "Fähigkeiten",
    nav_tools: "Tools",
    nav_apps: "Verbundene Apps",
    nav_blog: "Entwickler-News",
    nav_faq: "FAQs",
    nav_contact: "Kontakt",
    nav_login: "Anmelden",
    hero_title: "Wikcia Studio",
    hero_tagline: "Stell dir vor. Mach es wahr.",
    hero_subtitle:
      "Die proprietäre Kreativ- und Automatisierungsplattform von Love & Pixels. 3D-Erlebnisse, KI-Agenten, Workflow-Automatisierung und interaktive digitale Produkte — gebaut zum Verschiffen.",
    hero_cta_primary: "Loslegen",
    hero_cta_secondary: "Showcase ansehen",
    about_title: "Warum Wikcia",
    about_problem_title: "Das Problem",
    about_problem:
      "Kreativteams jonglieren mit einem Dutzend getrennter Tools. Designer können keinen Code ausliefern. Entwickler warten auf Assets. KI-Agenten leben in Isolation. Nichts spricht mit etwas. Projekte stocken.",
    about_solution_title: "Die Lösung",
    about_solution:
      "Wikcia Studio vereint Design, Automatisierung und KI auf einer Plattform. Von der CLI bis zur Desktop-App spricht jedes Tool dieselbe Sprache. Einmal bauen, überall bereitstellen.",
    about_story_title: "Unsere Geschichte",
    about_story:
      "Love & Pixels hat Wikcia nach jahrelangem Ringen mit fragmentierten kreativen Stacks entwickelt. Wir brauchten eine Plattform, die Bilder generieren, Videos bearbeiten, autonome Agenten ausführen, Kunden verwalten und Websites bereitstellen kann — alles von einer einzigen Kommandozeile aus. Wikcia ist diese Plattform.",
    showcase_title: "Showcase",
    showcase_subtitle:
      "Was Wikcia gebaut hat — und was du damit bauen kannst. Echte Projekte, echte Automatisierung, echte Ergebnisse.",
    showcase_byloveandpixels: "Love & Pixels",
    showcase_byloveandpixels_desc: "Marketing-, KI-, Analysen-, Beratungs- und Business-Entwicklungsplattform.",
    showcase_bella: "Bella Beauty Atelier",
    showcase_bella_desc: "Premium-Schönheitsbuchungsplattform mit echter Terminverwaltung und Vercel-Bereitstellung.",
    showcase_onyx: "Onyx Auto Studio",
    showcase_onyx_desc: "Fünfsprachiges Konzept für Autodetailing mit lokalisierten vorgerenderten Routen und Buchungsengine.",
    skills_title: "Fähigkeiten & Möglichkeiten",
    skills_subtitle:
      "Wikcia Studio wird mit 40+ installierten Fähigkeiten ausgeliefert, die Kreativität, Entwicklung, DevOps, Forschung, Medien und Geschäftsautomatisierung umfassen.",
    tools_title: "Tools & Integrationen",
    tools_subtitle:
      "Native CLI-Tools, lokale KI-Anbieter und verbundene MCP-Server, die das Wikcia-Ökosystem antreiben.",
    apps_title: "Verbundene Apps",
    apps_subtitle:
      "Das Wikcia-Anwendungszentrum — Desktop-, CLI- und Webanwendungen, die mit Ihrem Workflow verbunden sind.",
    blog_title: "Entwickler-News",
    blog_subtitle:
      "Dahinter steckt Engineering. Entwicklerhinweise, Release-Updates und Tiefenbohrungen in die Wikcia-Plattform.",
    faq_title: "Häufig gestellte Fragen",
    faq_subtitle:
      "Alles, was Sie über Wikcia Studio wissen müssen, von der Installation bis zur Unternehmensbereitstellung.",
    faq_q1: "Was ist Wikcia Studio?",
    faq_a1:
      "Wikcia Studio ist eine proprietäre Kreativ- und Automatisierungsplattform von Love & Pixels. Es kombiniert eine CLI, eine Desktop-Anwendung, 40+ Fähigkeiten, lokale KI-Anbieter und verbundene Apps in einem einheitlichen System.",
    contact_title: "Kontakt",
    contact_subtitle:
      "Bereit, mit Wikcia zu bauen? Nehmen Sie Kontakt mit dem Love & Pixels-Team auf.",
    contact_name: "Ihr Name",
    contact_email: "E-Mail-Adresse",
    contact_message: "Ihre Nachricht",
    contact_send: "Nachricht senden",
    footer_rights: "© 2026 Love & Pixels. Wikcia Studio ist proprietäre Software.",
    footer_made_with: "Gemacht mit Wikcia Studio.",
  },
  pl: {
    nav_home: "Strona główna",
    nav_about: "O nas",
    nav_showcase: "Showcase",
    nav_skills: "Umiejętności",
    nav_tools: "Narzędzia",
    nav_apps: "Połączone aplikacje",
    nav_blog: "Nowości dla deweloperów",
    nav_faq: "FAQ",
    nav_contact: "Kontakt",
    nav_login: "Zaloguj się",
    hero_title: "Wikcia Studio",
    hero_tagline: "Wyobraź sobie to. Zrób to rzeczywistym.",
    hero_subtitle:
      "Własnościowa platforma kreatywna i automatyzacyjna od Love & Pixels. Doświadczenia 3D, agenci AI, automatyzacja procesów i interaktywne produkty cyfrowe — zbudowane, aby wysyłać.",
    hero_cta_primary: "Zacznij",
    hero_cta_secondary: "Zobacz showcase",
    about_title: "Dlaczego Wikcia",
    about_problem_title: "Problem",
    about_problem:
      "Zespoły kreatywne kombinują z dziesięcioma odłączonymi narzędziami. Projektanci nie mogą wysłać kodu. Deweloperzy czekają na zasoby. Agenci AI żyją w izolacji. Nic nie rozmawia z niczym. Projekty utknęły.",
    about_solution_title: "Rozwiązanie",
    about_solution:
      "Wikcia Studio łączy projektowanie, automatyzację i AI w jednej platformie. Od CLI po aplikację desktopową, każde narzędzie mówi tym samym językiem. Zbuduj raz, wdrażaj wszędzie.",
    about_story_title: "Nasza historia",
    about_story:
      "Love & Pixels stworzyło Wikcię po latach zmagania się z fragmentowanymi stosami kreatywnymi. Potrzebowaliśmy platformy, która mogłaby generować obrazy, edytować wideo, uruchamiać autonomicznych agentów, zarządzać klientami i wdrażać strony internetowe — wszystko z jednej linii poleceń. Wikcia jest tą platformą.",
    showcase_title: "Showcase",
    showcase_subtitle:
      "Co Wikcia zbudowało — i co możesz zbudować dzięki niemu. Prawdziwe projekty, prawdziwa automatyzacja, prawdziwe rezultaty.",
    showcase_byloveandpixels: "Love & Pixels",
    showcase_byloveandpixels_desc: "Platforma marketingowa, AI, analityki, konsultingowej i rozwoju biznesu.",
    showcase_bella: "Bella Beauty Atelier",
    showcase_bella_desc: "Premiumowa platforma rezerwacji urodowej z prawdziwym przechowywaniem wizyt i wdrożeniem na Vercel.",
    showcase_onyx: "Onyx Auto Studio",
    showcase_onyx_desc: "Pięciojęzyczny koncept detailingu samochodowego z zokalizowanymi wstępnie wyrenderowanymi trasami i silnikiem rezerwacji.",
    skills_title: "Umiejętności i możliwości",
    skills_subtitle:
      "Wikcia Studio dostarczane jest z 40+ zainstalowanymi umiejętnościami obejmującymi kreatywność, rozwój, DevOps, badania, media i automatyzację biznesową.",
    tools_title: "Narzędzia i integracje",
    tools_subtitle:
      "Natywne narzędzia CLI, lokalni dostawcy AI i połączone serwery MCP, które napędzają ekosystem Wikcia.",
    apps_title: "Połączone aplikacje",
    apps_subtitle:
      "Centrum aplikacji Wikcia — aplikacje desktopowe, CLI i internetowe, które łączą się z twoim przepływem pracy.",
    blog_title: "Nowości dla deweloperów",
    blog_subtitle:
      "Za kulisami. Notatki inżynierskie, aktualizacje wydań i dogłębne analizy platformy Wikcia.",
    faq_title: "Często zadawane pytania",
    faq_subtitle:
      "Wszystko, co musisz wiedzieć o Wikcia Studio — od instalacji po wdrożenie dla przedsiębiorstw.",
    faq_q1: "Co to jest Wikcia Studio?",
    faq_a1:
      "Wikcia Studio to własnościowa platforma kreatywna i automatyzacyjna od Love & Pixels. Łączy w sobie CLI, aplikację desktopową, 40+ umiejętności, lokalnych dostawców AI i połączone aplikacje w jednym ujednoliconym systemie.",
    contact_title: "Kontakt",
    contact_subtitle:
      "Gotowy, aby budować z Wikcią? Skontaktuj się z zespołem Love & Pixels.",
    contact_name: "Twoje imię",
    contact_email: "Adres e-mail",
    contact_message: "Twoja wiadomość",
    contact_send: "Wyślij wiadomość",
    footer_rights: "© 2026 Love & Pixels. Wikcia Studio jest oprogramowaniem własnościowym.",
    footer_made_with: "Zrobione z Wikcia Studio.",
  },
  el: {
    nav_home: "Αρχική",
    nav_about: "Σχετικά",
    nav_showcase: "Showcase",
    nav_skills: "Δεξιότητες",
    nav_tools: "Εργαλεία",
    nav_apps: "Συνδεδεμένες Εφαρμογές",
    nav_blog: "Νέα Ανάπτυξης",
    nav_faq: "Συχνές Ερωτήσεις",
    nav_contact: "Επικοινωνία",
    nav_login: "Σύνδεση",
    hero_title: "Wikcia Studio",
    hero_tagline: "Φανταστείτε το. Κάντο πραγματικό.",
    hero_subtitle:
      "Η ιδιοκτηrytικό πλατφόρμα δημιουργίας και 자동화를 από Love & Pixels. Εμπειρίες 3D, αρχιτεκτονικά AI agente, αυτοματοποίηση ροών εργασίας και διαδραστικά ψηφιακά προϊόντα — μεταφυllaμμένα για αποστολή.",
    hero_cta_primary: "Έναρξη",
    hero_cta_secondary: "Προβολή showcase",
    about_title: "Γιατί το Wikcia",
    about_problem_title: "Το Πρόβλημα",
    about_problem:
      "Οι δημιουργικές ομάδες χαλάνε χρόνο με δεκάδες αποσυνδεδεμένα εργαλεία. Οι σχεδιαστές δεν μπορούν να eksporterούν κώδικα. Οι προγραμματιστές περιμένουν στοιχεία. Τα αρχιτεκτονικά AI agente ζουν σε διαρύπανση. Τίποτα δεν μιλάει με τίποτα. Τα έργα κολλάνε.",
    about_solution_title: "Η Λύση",
    about_solution:
      "Το Wikcia Studio ενώνει σχεδίαση, αυτοματοποίηση και AI σε μία πλατφόρμα. Από την 명령ovou γραμμή μέχρι την εφαρμογή Desktop, κάθε εργαλείο μιλάει την ίδια γλώσσα. Δημιουργήστε μία φορά, αναλύσε παντού.",
    about_story_title: "Η Ιστορία Μας",
    about_story:
      "Το Love & Pixels φτιάξε το Wikcia μετά από χρόνια μάχης με κατατεμημένα δημιουργικά στεγaña. Πρέπει να είχες μια πλατφόρμα που θα μπορούσε να δημιουργήσει εικόνες, να επεξεργάζεται βίντεο, να εκτελεί αυτόνομα αρχιτεκτονικά AI agente, να διαχειρίζεται πελάτες και να αναλύει ιστοσελίδες — όλα από μία εντολή. Το Wikcia είναι αυτή η πλατφόρμα.",
    showcase_title: "Showcase",
    showcase_subtitle:
      "Τι έχει χτίσει το Wikcia — και τι μπορείτε να χτίσετε εσείς με αυτό. Πραγματικά έργα, πραγματική αυτοματοποίηση, πραγματικά αποτελέσματα.",
    showcase_byloveandpixels: "Love & Pixels",
    showcase_byloveandpixels_desc: "Πλατφόρμα μαρκετινγκ, AI, ανάλυσης, συμβουλευτικής και ανάπτυξης επιχειρημάτων.",
    showcase_bella: "Bella Beauty Atelier",
    showcase_bella_desc: "Πремаτιν πλατφόρμα κρατήσεων με πραγματική αποθήκευση ραντεβού και ανάπτυξη στο Vercel.",
    showcase_onyx: "Onyx Auto Studio",
    showcase_onyx_desc: "Πενταγλωσική ένθεσηκίνησης αυτοκινήτων με τοπικοποιημένα προκατασκευασμένα δρομολόγια και μηχανή κρατήσεων.",
    skills_title: "Δεξιότητες & Ικανότητες",
    skills_subtitle:
      "Το Wikcia Studio επιδεικνύει 40+ εγκατεστημένες δεξιότητες που καλύπτουν δημιουργική παραγωγή, ανάπτυξη, DevOps, έρευνα, μέσα και επαγγελματική αυτοματοποίηση.",
    tools_title: "Εργαλεία & Ενσωματώσεις",
    tools_subtitle:
      "Εγγενή εργαλεία CLI, τοπικοί παρόχοι AI και συνδεδεμένοι διακομιστές MCP που ενισχύουν το οικοσύστημα Wikcia.",
    apps_title: "Συνδεδεμένες Εφαρμογές",
    apps_subtitle:
      "Το κέντρο εφαρμογών Wikcia — εφαρμογές Desktop, CLI και ιστού που συνδέονται με την ροή εργασίας σας.",
    blog_title: "Νέα Ανάπτυξης",
    blog_subtitle:
      "Πίσω από την κατασκευή. Σημειώσεις μηχανικών, ενημερώσεις εκδόσεων και βαθιές ανασκαφές στην πλατφόρμα Wikcia.",
    faq_title: "Συχνές Ερωτήσεις",
    faq_subtitle:
      "Όλα όσα πρέπει να γνωρίζετε για το Wikcia Studio — από την εγκατάσταση μέχρι την επιχειρησιακή ανάπτυξη.",
    faq_q1: "Τι είναι το Wikcia Studio;",
    faq_a1:
      "Το Wikcia Studio είναι μια ιδιοκτηrytική πλατφόρμα δημιουργίας και αυτοματοποίησης από το Love & Pixels. Συνδυάζει μια CLI, μια εφαρμογή Desktop, 40+ δεξιότητες, τοπικούς παρόχους AI και συνδεδεμένες εφαρμογές σε ένα ενωμένο σύστημα.",
    contact_title: "Επικοινωνία",
    contact_subtitle:
      "Έτοιμοι να χτίσετε με το Wikcia; Επικοινωνήστε με την ομάδα του Love & Pixels.",
    contact_name: "Το όνομά σας",
    contact_email: "Διεύθυνση email",
    contact_message: "Το μήνυμά σας",
    contact_send: "Αποστολή μηνύματος",
    footer_rights: "© 2026 Love & Pixels. Το Wikcia Studio είναι ιδιοκτηrytικό λογισμικό.",
    footer_made_with: "Φτιαγμένο με το Wikcia Studio.",
  },
};

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
