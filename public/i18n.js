/*
 * Same-path localisation for openlawsvpn.com.
 * English remains the server-rendered fallback for links used by ads and app review.
 */
(() => {
  'use strict';

  const storageKey = 'openlawsvpn-language-v1';
  const languageParameter = 'lang';
  const supported = new Set(['en', 'de', 'fr', 'es', 'it', 'pt-BR', 'pl', 'ja', 'ko']);
  const english = 'en';
  const german = 'de';
  const french = 'fr';
  const spanish = 'es';
  const italian = 'it';
  const portugueseBrazil = 'pt-BR';
  const polish = 'pl';
  const japanese = 'ja';
  const korean = 'ko';
  const normalize = value => value.replace(/\s+/g, ' ').trim();

  const languages = {
    en: { label: 'English', suggestion: null },
    de: { label: 'Deutsch', suggestion: { text: 'Diese Seite ist auch auf Deutsch verfügbar.', use: 'Deutsch verwenden', keep: 'Englisch behalten' } },
    fr: { label: 'Français', suggestion: { text: 'Cette page est aussi disponible en français.', use: 'Utiliser le français', keep: 'Garder l’anglais' } },
    es: { label: 'Español', suggestion: { text: 'Esta página también está disponible en español.', use: 'Usar español', keep: 'Mantener inglés' } },
    it: { label: 'Italiano', suggestion: { text: 'Questa pagina è disponibile anche in italiano.', use: 'Usa italiano', keep: 'Mantieni inglese' } },
    'pt-BR': { label: 'Português (Brasil)', suggestion: { text: 'Esta página também está disponível em português.', use: 'Usar português', keep: 'Manter inglês' } },
    pl: { label: 'Polski', suggestion: { text: 'Ta strona jest również dostępna po polsku.', use: 'Użyj polskiego', keep: 'Pozostań przy angielskim' } },
    ja: { label: '日本語', suggestion: { text: 'このページは日本語でもご利用いただけます。', use: '日本語を使用', keep: '英語のままにする' } },
    ko: { label: '한국어', suggestion: { text: '이 페이지는 한국어로도 제공됩니다.', use: '한국어 사용', keep: '영어 유지' } }
  };

  const browserLanguageAliases = {
    en: 'en', de: 'de', fr: 'fr', es: 'es', it: 'it', pt: 'pt-BR', pl: 'pl', ja: 'ja', ko: 'ko'
  };

  const dictionary = {
    [german]: {
      'Getting started': 'Erste Schritte',
      'Overview': 'Übersicht',
      'Client install': 'Client installieren',
      'Relay': 'Relay',
      'How it works': 'So funktioniert es',
      'Try the demo': 'Demo ausprobieren',
      'CI/CD setup': 'CI/CD-Einrichtung',
      'Apps': 'Apps',
      'iPhone & iPad ↗': 'iPhone & iPad ↗',
      'Android client ↗': 'Android-Client ↗',
      'Privacy': 'Datenschutz',
      'Terms': 'Nutzungsbedingungen',
      'Official mobile apps': 'Offizielle mobile Apps',
      'AWS Client VPN,': 'AWS Client VPN,',
      'in your pocket.': 'für unterwegs.',
      'Connect to your organisation’s AWS Client VPN from iPhone, iPad, or Android. Import your profile, sign in with SSO, and get on with your work.': 'Verbinden Sie sich vom iPhone, iPad oder Android-Gerät mit der AWS Client VPN Ihrer Organisation. Importieren Sie Ihr Profil, melden Sie sich per SSO an und arbeiten Sie weiter.',
      'Download on the': 'Laden im',
      'For iPhone & iPad': 'Für iPhone & iPad',
      'Get it on': 'Erhältlich bei',
      'For Android': 'Für Android',
      'Looking for Linux, macOS, or CI/CD?': 'Sie suchen Linux, macOS oder CI/CD?',
      'Explore all platforms': 'Alle Plattformen ansehen',
      'Simple by design': 'Einfach konzipiert',
      'From profile to protected connection.': 'Vom Profil zur geschützten Verbindung.',
      'Download the app': 'App herunterladen',
      'Choose the app for your phone or tablet.': 'Wählen Sie die App für Ihr Smartphone oder Tablet.',
      'Import your .ovpn profile': 'Ihr .ovpn-Profil importieren',
      'Use the file your organisation already provides.': 'Verwenden Sie die Datei, die Ihre Organisation bereits bereitstellt.',
      'Sign in and connect': 'Anmelden und verbinden',
      'Authenticate with your organisation’s SSO in the browser.': 'Melden Sie sich im Browser über das SSO Ihrer Organisation an.',
      'What is openlawsvpn?': 'Was ist openlawsvpn?',
      'The official AWS Client VPN desktop client supports Ubuntu Desktop, but does not provide a command-line client or desktop packages for Fedora and other Linux distributions. openlawsvpn fills that gap with a pure-Go implementation of the AWS Client VPN protocol, including the full CRV1 SAML challenge-response flow. It works with any SAML 2.0 identity provider AWS supports — Okta, Microsoft Entra ID, Google Workspace, JumpCloud, and others.': 'Der offizielle AWS Client VPN Desktop-Client unterstützt Ubuntu Desktop, bietet jedoch keinen Kommandozeilen-Client und keine Desktop-Pakete für Fedora und andere Linux-Distributionen. openlawsvpn schließt diese Lücke mit einer reinen Go-Implementierung des AWS Client VPN-Protokolls einschließlich des vollständigen CRV1-SAML-Challenge-Response-Ablaufs. Es funktioniert mit allen von AWS unterstützten SAML-2.0-Identity-Providern — Okta, Microsoft Entra ID, Google Workspace, JumpCloud und weiteren.',
      'The statically linked CLI runs on Linux and macOS across amd64, arm64, and ppc64le where supported; the GTK4 desktop app ships as a Fedora COPR RPM. No Electron, Mono, JVM, or runtime dependencies. The mobile apps provide the same AWS Client VPN and SAML/SSO workflow on iPhone, iPad, and Android.': 'Die statisch gelinkte CLI läuft auf Linux und macOS auf amd64, arm64 und ppc64le; die GTK4-Desktop-App wird als Fedora-COPR-RPM angeboten. Keine Abhängigkeit von Electron, Mono, JVM oder Laufzeitumgebungen. Die mobilen Apps bieten denselben AWS-Client-VPN- und SAML/SSO-Ablauf auf iPhone, iPad und Android.',
      'Everywhere you work': 'Überall, wo Sie arbeiten',
      'One client. Your devices.': 'Ein Client. Ihre Geräte.',
      'View install options': 'Installationsoptionen ansehen',
      'iPhone & iPad': 'iPhone & iPad',
      'Import a profile, complete SAML/SSO, and connect from iOS or iPadOS.': 'Importieren Sie ein Profil, schließen Sie SAML/SSO ab und verbinden Sie sich über iOS oder iPadOS.',
      'Android': 'Android',
      'Use your existing profile and authenticate through a secure browser tab.': 'Verwenden Sie Ihr vorhandenes Profil und authentifizieren Sie sich in einem sicheren Browser-Tab.',
      'Linux client': 'Linux-Client',
      'Static CLI binary and GTK4 GUI. Fedora COPR RPM. amd64, arm64, ppc64le.': 'Statisches CLI-Binary und GTK4-GUI. Fedora-COPR-RPM. amd64, arm64, ppc64le.',
      'macOS client': 'macOS-Client',
      'Static CLI binary for Apple Silicon and Intel. No installer needed.': 'Statisches CLI-Binary für Apple Silicon und Intel. Keine Installation nötig.',
      'Relay service': 'Relay-Dienst',
      'Headless VPN auth for CI/CD runners and servers. Human approves SAML from phone. Public demo — no account required.': 'Headless-VPN-Authentifizierung für CI/CD-Runner und Server. Eine Person bestätigt SAML über das Smartphone. Öffentliche Demo — kein Konto erforderlich.',
      'AWS Client VPN features': 'AWS Client VPN-Funktionen',
      'SAML / SSO authentication': 'SAML-/SSO-Authentifizierung',
      'Import your existing profile': 'Vorhandenes Profil importieren',
      'Privacy-first connection flow': 'Datenschutzfreundlicher Verbindungsablauf',
      'Mobile, desktop, and CI/CD': 'Mobil, Desktop und CI/CD',
      'Frequently asked questions': 'Häufige Fragen',
      'Quick start': 'Schnellstart',
      'Choose your device': 'Wählen Sie Ihr Gerät',
      'Get openlawsvpn': 'openlawsvpn herunterladen',
      'AWS Client VPN with SAML/SSO for iPhone, iPad, Android, Linux, and macOS. Start with the app you use every day.': 'AWS Client VPN mit SAML/SSO für iPhone, iPad, Android, Linux und macOS. Starten Sie mit der App, die Sie täglich nutzen.',
      'Platforms': 'Plattformen',
      'iPhone & iPad app': 'iPhone- & iPad-App',
      'Import a profile, authenticate with your organisation’s SAML/SSO provider, and connect through AWS Client VPN.': 'Importieren Sie ein Profil, authentifizieren Sie sich bei dem SAML/SSO-Anbieter Ihrer Organisation und verbinden Sie sich über AWS Client VPN.',
      'Android App': 'Android-App',
      'Pure Go VPN core via gomobile — no NDK, no JNI glue. SAML authentication in-app via Chrome Custom Tab.': 'Reiner Go-VPN-Kern über gomobile — kein NDK, kein JNI-Glue. SAML-Authentifizierung in der App über Chrome Custom Tab.',
      'Linux CLI': 'Linux-CLI',
      'GTK4 Desktop GUI': 'GTK4-Desktop-GUI',
      'macOS CLI': 'macOS-CLI',
      'Install': 'Installieren',
      'Linux binary': 'Linux-Binary',
      'Fedora / RHEL': 'Fedora / RHEL',
      'iPhone & iPad': 'iPhone & iPad',
      'From source': 'Aus dem Quellcode',
      'SAML / SSO support': 'SAML-/SSO-Unterstützung',
      'Interactive (desktop / mobile)': 'Interaktiv (Desktop / mobil)',
      'Headless (CI/CD, servers)': 'Headless (CI/CD, Server)',
      'Relay — Headless VPN auth': 'Relay — Headless-VPN-Authentifizierung',
      "AWS Client VPN requires a browser for SAML. That's fine on a laptop — impossible on a CI runner. Relay bridges the gap.": 'AWS Client VPN benötigt für SAML einen Browser. Auf einem Laptop ist das kein Problem — auf einem CI-Runner jedoch unmöglich. Relay schließt diese Lücke.',
      'Try the demo — no account required': 'Demo ausprobieren — kein Konto erforderlich',
      'How it works ↓': 'So funktioniert es ↓',
      'The problem with SAML in headless environments': 'Das Problem mit SAML in Headless-Umgebungen',
      'AWS Client VPN uses the CRV1 challenge-response protocol. Phase 1 returns a URL that must be opened in a browser — the user authenticates via their IdP and the resulting SAMLResponse completes Phase 2 to bring up the tunnel.': 'AWS Client VPN verwendet das CRV1-Challenge-Response-Protokoll. Phase 1 liefert eine URL, die in einem Browser geöffnet werden muss — der Benutzer authentifiziert sich über seinen IdP, und die daraus resultierende SAMLResponse schließt Phase 2 ab und baut den Tunnel auf.',
      'CI runners have no browser': 'CI-Runner haben keinen Browser',
      'GitHub Actions, GitLab CI, Jenkins — headless containers. No display, no way to complete the SAML flow interactively.': 'GitHub Actions, GitLab CI, Jenkins — Headless-Container. Kein Display und keine Möglichkeit, den SAML-Ablauf interaktiv abzuschließen.',
      'Storing credentials is an anti-pattern': 'Anmeldedaten zu speichern ist ein Anti-Pattern',
      'Injecting SAML tokens as CI secrets couples your pipeline to credentials that expire and rotate. Every rotation breaks builds.': 'SAML-Token als CI-Secrets einzubinden koppelt Ihre Pipeline an Anmeldedaten, die ablaufen und rotieren. Jede Rotation unterbricht Builds.',
      'Existing workarounds fail at scale': 'Bestehende Workarounds skalieren nicht',
      'Pre-generated tokens expire in minutes. Spinning up a full desktop VM just for VPN auth wastes money and adds minutes to every build.': 'Vorab erzeugte Token laufen nach Minuten ab. Eine vollständige Desktop-VM nur für die VPN-Authentifizierung zu starten, kostet Geld und verlängert jeden Build um Minuten.',
      'How Relay works': 'So funktioniert Relay',
      'The relay is a lightweight broker between the headless agent (CI runner) and the human operator (desktop or Android client). No inbound ports required. No secrets stored anywhere in the pipeline.': 'Relay ist ein schlanker Vermittler zwischen dem Headless-Agenten (CI-Runner) und dem menschlichen Operator (Desktop- oder Android-Client). Keine eingehenden Ports erforderlich. Keine Secrets werden in der Pipeline gespeichert.',
      'Agent registers': 'Agent registriert sich',
      'CI runner starts': 'Der CI-Runner startet',
      'and connects a WebSocket to the relay. No inbound port needed.': 'und verbindet einen WebSocket mit dem Relay. Kein eingehender Port erforderlich.',
      'App authenticates': 'App authentifiziert sich',
      'Developer opens the Android or desktop app, sees the agent listed as': 'Der Entwickler öffnet die Android- oder Desktop-App, sieht den Agenten als',
      ', taps Connect. The app runs Phase 1 + full SAML browser flow.': ', tippt auf Verbinden. Die App führt Phase 1 und den vollständigen SAML-Browserablauf aus.',
      'Relay delivers credentials': 'Relay liefert die Anmeldedaten',
      'App sends the completed SAMLResponse to the relay via HTTPS. Relay pushes it to the waiting agent over the WebSocket.': 'Die App sendet die fertige SAMLResponse per HTTPS an Relay. Relay überträgt sie über den WebSocket an den wartenden Agenten.',
      'Tunnel up': 'Tunnel aktiv',
      'Agent executes Phase 2, VPN is established. CI build continues. App shows the agent as': 'Der Agent führt Phase 2 aus, die VPN-Verbindung wird hergestellt. Der CI-Build wird fortgesetzt. Die App zeigt den Agenten als',
      'and can disconnect remotely at any time.': 'an und kann ihn jederzeit remote trennen.',
      'See it in action': 'In Aktion ansehen',
      'A real screencast: a GitHub Actions workflow starts the relay agent, the Android app approves the SAML flow, and the tunnel comes up — with zero credentials stored in the pipeline.': 'Ein echter Screencast: Ein GitHub-Actions-Workflow startet den Relay-Agenten, die Android-App bestätigt den SAML-Ablauf und der Tunnel wird aufgebaut — ohne gespeicherte Anmeldedaten in der Pipeline.',
      'Your browser does not support HTML5 video.': 'Ihr Browser unterstützt kein HTML5-Video.',
      'Download the screencast (MP4, 5 MB)': 'Screencast herunterladen (MP4, 5 MB)',
      'What the screencast shows': 'Was der Screencast zeigt',
      'A GitHub Actions': 'Ein GitHub-Actions-',
      'workflow is triggered manually. The runner is a headless Ubuntu container with no display.': 'Workflow wird manuell ausgelöst. Der Runner ist ein Headless-Ubuntu-Container ohne Display.',
      'The step': 'Der Schritt',
      'runs': 'führt',
      'It blocks, waiting for an operator to approve auth.': 'aus. Er wartet, bis ein Operator die Authentifizierung bestätigt.',
      "On an Android phone, the openlawsvpn app's": 'Auf einem Android-Smartphone zeigt der',
      'screen shows the runner as': 'Bildschirm der openlawsvpn-App den Runner als',
      'The operator taps': 'Der Operator tippt auf',
      'The app runs the Phase 1 SAML browser flow in Chrome Custom Tab. The user authenticates with their SSO credentials.': 'Die App führt den SAML-Browserablauf der Phase 1 in einem Chrome Custom Tab aus. Der Benutzer authentifiziert sich mit seinen SSO-Anmeldedaten.',
      'The app posts the completed SAMLResponse to the relay. Relay pushes it to the waiting agent over WebSocket.': 'Die App sendet die fertige SAMLResponse an Relay. Relay überträgt sie über WebSocket an den wartenden Agenten.',
      'The CI step exits 0 —': 'Der CI-Schritt endet mit 0 —',
      'The pipeline continues.': 'Die Pipeline wird fortgesetzt.',
      'Subsequent steps requiring access to internal services over the VPN succeed.': 'Nachfolgende Schritte, die über die VPN-Verbindung Zugriff auf interne Dienste benötigen, sind erfolgreich.',
      'On cleanup, the app shows the agent as': 'Beim Aufräumen zeigt die App den Agenten als',
      'and the operator can disconnect it remotely.': 'an und der Operator kann ihn remote trennen.',
      'Try it now — no account required': 'Jetzt ausprobieren — kein Konto erforderlich',
      'The public demo token lets you test the full relay flow immediately against the live relay backend. No registration, no credit card.': 'Mit dem öffentlichen Demo-Token können Sie den vollständigen Relay-Ablauf sofort gegen das Live-Relay-Backend testen. Keine Registrierung, keine Kreditkarte.',
      'Demo token:': 'Demo-Token:',
      'Run on any Linux host (or CI runner) with openlawsvpn-cli installed:': 'Führen Sie dies auf jedem Linux-Host (oder CI-Runner) mit installiertem openlawsvpn-cli aus:',
      'Then open the Android app → Relay tab → enter token': 'Öffnen Sie anschließend die Android-App → Tab Relay → geben Sie das Token',
      '→ tap Save & Refresh. Your agent appears in the list. Tap Connect to complete the SAML flow.': 'ein → tippen Sie auf Speichern & Aktualisieren. Ihr Agent erscheint in der Liste. Tippen Sie auf Verbinden, um den SAML-Ablauf abzuschließen.',
      'Demo limits:': 'Demo-Limits:',
      '10-minute session maximum · 5 concurrent agents · shared public namespace. For longer sessions or private organisation tokens,': 'maximal 10 Minuten pro Sitzung · 5 parallele Agenten · gemeinsamer öffentlicher Namensraum. Für längere Sitzungen oder private Organisations-Token',
      'vote for extended plans on GitHub': 'können Sie auf GitHub für erweiterte Pläne stimmen',
      'GitHub Actions example': 'GitHub-Actions-Beispiel',
      'Store your relay token as a repository secret': 'Speichern Sie Ihr Relay-Token als Repository-Secret',
      'No VPN credentials, no AWS keys, no SAML tokens in CI.': 'Keine VPN-Anmeldedaten, keine AWS-Schlüssel, keine SAML-Token in CI.',
      'Use cases': 'Anwendungsfälle',
      'Integration tests, database migrations, internal API calls — any CI step that needs your private VPC. A team member approves from their phone before the run begins.': 'Integrationstests, Datenbankmigrationen, interne API-Aufrufe — jeder CI-Schritt, der Ihre private VPC benötigt. Ein Teammitglied bestätigt die Verbindung über sein Smartphone, bevor der Lauf beginnt.',
      'Remote development VMs': 'Remote-Entwicklungs-VMs',
      "Cloud dev boxes and jump hosts behind NAT can't open a browser. Relay lets you bring up the tunnel on any remote machine with a single CLI command.": 'Cloud-Entwicklungsumgebungen und Jump-Hosts hinter NAT können keinen Browser öffnen. Relay ermöglicht es, den Tunnel auf jeder Remote-Maschine mit einem einzigen CLI-Befehl aufzubauen.',
      'Kubernetes init containers': 'Kubernetes-Init-Container',
      'Run the relay agent as a VPN init container in your pod spec. The tunnel is ready before your application container starts.': 'Führen Sie den Relay-Agenten als VPN-Init-Container in Ihrer Pod-Spezifikation aus. Der Tunnel ist bereit, bevor Ihr Anwendungs-Container startet.',
      'IoT and edge gateways': 'IoT- und Edge-Gateways',
      'Embedded Linux devices can register as relay agents. A fleet manager approves tunnels from a single mobile session, granting temporary VPN access to field devices.': 'Eingebettete Linux-Geräte können sich als Relay-Agenten registrieren. Ein Flottenmanager bestätigt Tunnel aus einer einzigen mobilen Sitzung und gewährt Außengeräten temporären VPN-Zugang.',
      'Ready to try it?': 'Bereit zum Ausprobieren?',
      'Install the client, then run with': 'Installieren Sie den Client und führen Sie anschließend',
      'to test immediately — no account required.': 'aus, um sofort zu testen — kein Konto erforderlich.',
      'Install the client': 'Client installieren',
      'Pricing': 'Preise',
      'Support': 'Support',
      'Privacy Policy': 'Datenschutzerklärung',
      'Terms of Use': 'Nutzungsbedingungen',
      'Contact': 'Kontakt'
    }
  };

  /* High-intent product and Relay copy for the additional launch languages. */
  const primaryDictionaries = {
    [french]: {
      'Getting started': 'Premiers pas', 'Overview': 'Vue d’ensemble', 'Client install': 'Installer le client', 'How it works': 'Fonctionnement', 'Try the demo': 'Essayer la démo', 'CI/CD setup': 'Configuration CI/CD', 'Apps': 'Applications', 'Privacy': 'Confidentialité', 'Terms': 'Conditions',
      'Official mobile apps': 'Applications mobiles officielles', 'AWS Client VPN,': 'AWS Client VPN,', 'in your pocket.': 'dans votre poche.',
      'Connect to your organisation’s AWS Client VPN from iPhone, iPad, or Android. Import your profile, sign in with SSO, and get on with your work.': 'Connectez-vous au VPN client AWS de votre organisation depuis un iPhone, iPad ou Android. Importez votre profil, connectez-vous avec le SSO et continuez à travailler.',
      'Download on the': 'Télécharger sur', 'For iPhone & iPad': 'Pour iPhone et iPad', 'Get it on': 'Disponible sur', 'For Android': 'Pour Android',
      'Looking for Linux, macOS, or CI/CD?': 'Vous recherchez Linux, macOS ou CI/CD ?', 'Explore all platforms': 'Voir toutes les plateformes',
      'Simple by design': 'Conçu pour être simple', 'From profile to protected connection.': 'Du profil à une connexion protégée.', 'Download the app': 'Téléchargez l’application', 'Choose the app for your phone or tablet.': 'Choisissez l’application pour votre téléphone ou tablette.', 'Import your .ovpn profile': 'Importez votre profil .ovpn', 'Use the file your organisation already provides.': 'Utilisez le fichier déjà fourni par votre organisation.', 'Sign in and connect': 'Connectez-vous', 'Authenticate with your organisation’s SSO in the browser.': 'Authentifiez-vous avec le SSO de votre organisation dans le navigateur.',
      'What is openlawsvpn?': 'Qu’est-ce qu’openlawsvpn ?', 'Everywhere you work': 'Partout où vous travaillez', 'One client. Your devices.': 'Un client. Vos appareils.', 'View install options': 'Voir les options d’installation', 'iPhone & iPad': 'iPhone et iPad', 'Android': 'Android', 'Linux client': 'Client Linux', 'macOS client': 'Client macOS', 'Relay service': 'Service Relay',
      'Choose your device': 'Choisissez votre appareil', 'Get openlawsvpn': 'Obtenir openlawsvpn', 'Platforms': 'Plateformes', 'Install': 'Installer', 'Linux binary': 'Binaire Linux', 'From source': 'Depuis les sources',
      'Relay — Headless VPN auth': 'Relay — Authentification VPN sans interface', "AWS Client VPN requires a browser for SAML. That's fine on a laptop — impossible on a CI runner. Relay bridges the gap.": 'AWS Client VPN nécessite un navigateur pour SAML. C’est simple sur un ordinateur portable, mais impossible sur un runner CI. Relay comble cette lacune.', 'Try the demo — no account required': 'Essayer la démo — aucun compte requis', 'The problem with SAML in headless environments': 'Le problème de SAML dans les environnements sans interface', 'How Relay works': 'Fonctionnement de Relay', 'See it in action': 'Voir Relay en action', 'Try it now — no account required': 'Essayez maintenant — aucun compte requis', 'GitHub Actions example': 'Exemple GitHub Actions', 'Use cases': 'Cas d’utilisation', 'Ready to try it?': 'Prêt à essayer ?', 'Install the client': 'Installer le client'
    },
    [spanish]: {
      'Getting started': 'Primeros pasos', 'Overview': 'Resumen', 'Client install': 'Instalar el cliente', 'How it works': 'Cómo funciona', 'Try the demo': 'Probar la demo', 'CI/CD setup': 'Configuración de CI/CD', 'Apps': 'Aplicaciones', 'Privacy': 'Privacidad', 'Terms': 'Términos',
      'Official mobile apps': 'Aplicaciones móviles oficiales', 'AWS Client VPN,': 'AWS Client VPN,', 'in your pocket.': 'en tu bolsillo.',
      'Connect to your organisation’s AWS Client VPN from iPhone, iPad, or Android. Import your profile, sign in with SSO, and get on with your work.': 'Conéctate a AWS Client VPN de tu organización desde iPhone, iPad o Android. Importa tu perfil, inicia sesión con SSO y sigue trabajando.',
      'Download on the': 'Descargar en', 'For iPhone & iPad': 'Para iPhone y iPad', 'Get it on': 'Disponible en', 'For Android': 'Para Android',
      'Looking for Linux, macOS, or CI/CD?': '¿Buscas Linux, macOS o CI/CD?', 'Explore all platforms': 'Explorar todas las plataformas',
      'Simple by design': 'Diseñado para ser simple', 'From profile to protected connection.': 'Del perfil a una conexión protegida.', 'Download the app': 'Descarga la aplicación', 'Choose the app for your phone or tablet.': 'Elige la aplicación para tu teléfono o tableta.', 'Import your .ovpn profile': 'Importa tu perfil .ovpn', 'Use the file your organisation already provides.': 'Usa el archivo que ya proporciona tu organización.', 'Sign in and connect': 'Inicia sesión y conéctate', 'Authenticate with your organisation’s SSO in the browser.': 'Autentícate con el SSO de tu organización en el navegador.',
      'What is openlawsvpn?': '¿Qué es openlawsvpn?', 'Everywhere you work': 'Dondequiera que trabajes', 'One client. Your devices.': 'Un cliente. Tus dispositivos.', 'View install options': 'Ver opciones de instalación', 'iPhone & iPad': 'iPhone y iPad', 'Android': 'Android', 'Linux client': 'Cliente para Linux', 'macOS client': 'Cliente para macOS', 'Relay service': 'Servicio Relay',
      'Choose your device': 'Elige tu dispositivo', 'Get openlawsvpn': 'Obtener openlawsvpn', 'Platforms': 'Plataformas', 'Install': 'Instalar', 'Linux binary': 'Binario de Linux', 'From source': 'Desde el código fuente',
      'Relay — Headless VPN auth': 'Relay — Autenticación VPN sin interfaz', "AWS Client VPN requires a browser for SAML. That's fine on a laptop — impossible on a CI runner. Relay bridges the gap.": 'AWS Client VPN requiere un navegador para SAML. En un portátil no hay problema, pero en un runner de CI es imposible. Relay salva esa distancia.', 'Try the demo — no account required': 'Probar la demo — sin cuenta', 'The problem with SAML in headless environments': 'El problema de SAML en entornos sin interfaz', 'How Relay works': 'Cómo funciona Relay', 'See it in action': 'Verlo en acción', 'Try it now — no account required': 'Pruébalo ahora — sin cuenta', 'GitHub Actions example': 'Ejemplo de GitHub Actions', 'Use cases': 'Casos de uso', 'Ready to try it?': '¿Listo para probarlo?', 'Install the client': 'Instalar el cliente'
    },
    [italian]: {
      'Getting started': 'Introduzione', 'Overview': 'Panoramica', 'Client install': 'Installa il client', 'How it works': 'Come funziona', 'Try the demo': 'Prova la demo', 'CI/CD setup': 'Configurazione CI/CD', 'Apps': 'App', 'Privacy': 'Privacy', 'Terms': 'Termini',
      'Official mobile apps': 'App mobili ufficiali', 'AWS Client VPN,': 'AWS Client VPN,', 'in your pocket.': 'in tasca.',
      'Connect to your organisation’s AWS Client VPN from iPhone, iPad, or Android. Import your profile, sign in with SSO, and get on with your work.': 'Connettiti ad AWS Client VPN della tua organizzazione da iPhone, iPad o Android. Importa il profilo, accedi con SSO e continua a lavorare.',
      'Download on the': 'Scarica su', 'For iPhone & iPad': 'Per iPhone e iPad', 'Get it on': 'Disponibile su', 'For Android': 'Per Android',
      'Looking for Linux, macOS, or CI/CD?': 'Cerchi Linux, macOS o CI/CD?', 'Explore all platforms': 'Esplora tutte le piattaforme',
      'Simple by design': 'Semplice per progettazione', 'From profile to protected connection.': 'Dal profilo alla connessione protetta.', 'Download the app': 'Scarica l’app', 'Choose the app for your phone or tablet.': 'Scegli l’app per telefono o tablet.', 'Import your .ovpn profile': 'Importa il profilo .ovpn', 'Use the file your organisation already provides.': 'Usa il file già fornito dalla tua organizzazione.', 'Sign in and connect': 'Accedi e connettiti', 'Authenticate with your organisation’s SSO in the browser.': 'Autenticati con l’SSO della tua organizzazione nel browser.',
      'What is openlawsvpn?': 'Cos’è openlawsvpn?', 'Everywhere you work': 'Ovunque lavori', 'One client. Your devices.': 'Un client. I tuoi dispositivi.', 'View install options': 'Vedi le opzioni di installazione', 'iPhone & iPad': 'iPhone e iPad', 'Android': 'Android', 'Linux client': 'Client Linux', 'macOS client': 'Client macOS', 'Relay service': 'Servizio Relay',
      'Choose your device': 'Scegli il dispositivo', 'Get openlawsvpn': 'Ottieni openlawsvpn', 'Platforms': 'Piattaforme', 'Install': 'Installa', 'Linux binary': 'Binario Linux', 'From source': 'Dal codice sorgente',
      'Relay — Headless VPN auth': 'Relay — Autenticazione VPN headless', "AWS Client VPN requires a browser for SAML. That's fine on a laptop — impossible on a CI runner. Relay bridges the gap.": 'AWS Client VPN richiede un browser per SAML. Su un portatile va bene, ma su un runner CI è impossibile. Relay colma il divario.', 'Try the demo — no account required': 'Prova la demo — senza account', 'The problem with SAML in headless environments': 'Il problema di SAML negli ambienti headless', 'How Relay works': 'Come funziona Relay', 'See it in action': 'Guardalo in azione', 'Try it now — no account required': 'Provalo ora — senza account', 'GitHub Actions example': 'Esempio GitHub Actions', 'Use cases': 'Casi d’uso', 'Ready to try it?': 'Pronto a provarlo?', 'Install the client': 'Installa il client'
    },
    [portugueseBrazil]: {
      'Getting started': 'Primeiros passos', 'Overview': 'Visão geral', 'Client install': 'Instalar o cliente', 'How it works': 'Como funciona', 'Try the demo': 'Testar a demonstração', 'CI/CD setup': 'Configuração de CI/CD', 'Apps': 'Aplicativos', 'Privacy': 'Privacidade', 'Terms': 'Termos',
      'Official mobile apps': 'Aplicativos móveis oficiais', 'AWS Client VPN,': 'AWS Client VPN,', 'in your pocket.': 'no seu bolso.',
      'Connect to your organisation’s AWS Client VPN from iPhone, iPad, or Android. Import your profile, sign in with SSO, and get on with your work.': 'Conecte-se ao AWS Client VPN da sua organização pelo iPhone, iPad ou Android. Importe o perfil, entre com SSO e continue trabalhando.',
      'Download on the': 'Baixe na', 'For iPhone & iPad': 'Para iPhone e iPad', 'Get it on': 'Disponível no', 'For Android': 'Para Android',
      'Looking for Linux, macOS, or CI/CD?': 'Procurando Linux, macOS ou CI/CD?', 'Explore all platforms': 'Ver todas as plataformas',
      'Simple by design': 'Simples por definição', 'From profile to protected connection.': 'Do perfil à conexão protegida.', 'Download the app': 'Baixe o aplicativo', 'Choose the app for your phone or tablet.': 'Escolha o aplicativo para seu celular ou tablet.', 'Import your .ovpn profile': 'Importe seu perfil .ovpn', 'Use the file your organisation already provides.': 'Use o arquivo que sua organização já fornece.', 'Sign in and connect': 'Entre e conecte-se', 'Authenticate with your organisation’s SSO in the browser.': 'Autentique-se com o SSO da sua organização no navegador.',
      'What is openlawsvpn?': 'O que é openlawsvpn?', 'Everywhere you work': 'Onde você trabalha', 'One client. Your devices.': 'Um cliente. Seus dispositivos.', 'View install options': 'Ver opções de instalação', 'iPhone & iPad': 'iPhone e iPad', 'Android': 'Android', 'Linux client': 'Cliente Linux', 'macOS client': 'Cliente macOS', 'Relay service': 'Serviço Relay',
      'Choose your device': 'Escolha seu dispositivo', 'Get openlawsvpn': 'Obter openlawsvpn', 'Platforms': 'Plataformas', 'Install': 'Instalar', 'Linux binary': 'Binário Linux', 'From source': 'Do código-fonte',
      'Relay — Headless VPN auth': 'Relay — Autenticação VPN sem interface', "AWS Client VPN requires a browser for SAML. That's fine on a laptop — impossible on a CI runner. Relay bridges the gap.": 'O AWS Client VPN exige um navegador para SAML. Em um notebook isso é simples, mas em um runner de CI é impossível. O Relay preenche essa lacuna.', 'Try the demo — no account required': 'Testar a demonstração — sem conta', 'The problem with SAML in headless environments': 'O problema do SAML em ambientes sem interface', 'How Relay works': 'Como o Relay funciona', 'See it in action': 'Veja em ação', 'Try it now — no account required': 'Teste agora — sem conta', 'GitHub Actions example': 'Exemplo de GitHub Actions', 'Use cases': 'Casos de uso', 'Ready to try it?': 'Pronto para testar?', 'Install the client': 'Instalar o cliente'
    },
    [polish]: {
      'Getting started': 'Pierwsze kroki', 'Overview': 'Przegląd', 'Client install': 'Instalacja klienta', 'How it works': 'Jak to działa', 'Try the demo': 'Wypróbuj demo', 'CI/CD setup': 'Konfiguracja CI/CD', 'Apps': 'Aplikacje', 'Privacy': 'Prywatność', 'Terms': 'Warunki',
      'Official mobile apps': 'Oficjalne aplikacje mobilne', 'AWS Client VPN,': 'AWS Client VPN,', 'in your pocket.': 'w Twojej kieszeni.',
      'Connect to your organisation’s AWS Client VPN from iPhone, iPad, or Android. Import your profile, sign in with SSO, and get on with your work.': 'Połącz się z AWS Client VPN swojej organizacji z iPhone’a, iPada lub Androida. Zaimportuj profil, zaloguj się przez SSO i pracuj dalej.',
      'Download on the': 'Pobierz z', 'For iPhone & iPad': 'Na iPhone’a i iPada', 'Get it on': 'Pobierz z', 'For Android': 'Na Androida',
      'Looking for Linux, macOS, or CI/CD?': 'Szukasz systemu Linux, macOS lub CI/CD?', 'Explore all platforms': 'Zobacz wszystkie platformy',
      'Simple by design': 'Prostota z założenia', 'From profile to protected connection.': 'Od profilu do chronionego połączenia.', 'Download the app': 'Pobierz aplikację', 'Choose the app for your phone or tablet.': 'Wybierz aplikację na telefon lub tablet.', 'Import your .ovpn profile': 'Zaimportuj profil .ovpn', 'Use the file your organisation already provides.': 'Użyj pliku, który zapewnia już Twoja organizacja.', 'Sign in and connect': 'Zaloguj się i połącz', 'Authenticate with your organisation’s SSO in the browser.': 'Uwierzytelnij się przez SSO organizacji w przeglądarce.',
      'What is openlawsvpn?': 'Czym jest openlawsvpn?', 'Everywhere you work': 'Wszędzie, gdzie pracujesz', 'One client. Your devices.': 'Jeden klient. Twoje urządzenia.', 'View install options': 'Zobacz opcje instalacji', 'iPhone & iPad': 'iPhone i iPad', 'Android': 'Android', 'Linux client': 'Klient Linux', 'macOS client': 'Klient macOS', 'Relay service': 'Usługa Relay',
      'Choose your device': 'Wybierz urządzenie', 'Get openlawsvpn': 'Pobierz openlawsvpn', 'Platforms': 'Platformy', 'Install': 'Zainstaluj', 'Linux binary': 'Binarium Linux', 'From source': 'Ze źródeł',
      'Relay — Headless VPN auth': 'Relay — Bezinterfejsowe uwierzytelnianie VPN', "AWS Client VPN requires a browser for SAML. That's fine on a laptop — impossible on a CI runner. Relay bridges the gap.": 'AWS Client VPN wymaga przeglądarki dla SAML. Na laptopie nie stanowi to problemu, ale na runnerze CI jest niemożliwe. Relay wypełnia tę lukę.', 'Try the demo — no account required': 'Wypróbuj demo — bez konta', 'The problem with SAML in headless environments': 'Problem SAML w środowiskach bez interfejsu', 'How Relay works': 'Jak działa Relay', 'See it in action': 'Zobacz w działaniu', 'Try it now — no account required': 'Wypróbuj teraz — bez konta', 'GitHub Actions example': 'Przykład GitHub Actions', 'Use cases': 'Przypadki użycia', 'Ready to try it?': 'Gotowy, aby spróbować?', 'Install the client': 'Zainstaluj klienta'
    },
    [japanese]: {
      'Getting started': 'はじめに', 'Overview': '概要', 'Client install': 'クライアントのインストール', 'How it works': '仕組み', 'Try the demo': 'デモを試す', 'CI/CD setup': 'CI/CD セットアップ', 'Apps': 'アプリ', 'Privacy': 'プライバシー', 'Terms': '利用規約',
      'Official mobile apps': '公式モバイルアプリ', 'AWS Client VPN,': 'AWS Client VPN を、', 'in your pocket.': '手のひらに。',
      'Connect to your organisation’s AWS Client VPN from iPhone, iPad, or Android. Import your profile, sign in with SSO, and get on with your work.': 'iPhone、iPad、Android から組織の AWS Client VPN に接続できます。プロファイルを読み込み、SSO でサインインして作業を続けましょう。',
      'Download on the': 'ダウンロード', 'For iPhone & iPad': 'iPhone と iPad 向け', 'Get it on': '入手先', 'For Android': 'Android 向け',
      'Looking for Linux, macOS, or CI/CD?': 'Linux、macOS、または CI/CD をお探しですか？', 'Explore all platforms': 'すべてのプラットフォームを見る',
      'Simple by design': 'シンプルな設計', 'From profile to protected connection.': 'プロファイルから保護された接続まで。', 'Download the app': 'アプリをダウンロード', 'Choose the app for your phone or tablet.': 'お使いのスマートフォンまたはタブレット用のアプリを選択します。', 'Import your .ovpn profile': '.ovpn プロファイルを読み込む', 'Use the file your organisation already provides.': '組織から提供されているファイルを使用します。', 'Sign in and connect': 'サインインして接続', 'Authenticate with your organisation’s SSO in the browser.': 'ブラウザで組織の SSO を使用して認証します。',
      'What is openlawsvpn?': 'openlawsvpn とは？', 'Everywhere you work': 'どこで働いていても', 'One client. Your devices.': '1 つのクライアント。すべてのデバイス。', 'View install options': 'インストール方法を見る', 'iPhone & iPad': 'iPhone と iPad', 'Android': 'Android', 'Linux client': 'Linux クライアント', 'macOS client': 'macOS クライアント', 'Relay service': 'Relay サービス',
      'Choose your device': 'デバイスを選択', 'Get openlawsvpn': 'openlawsvpn を入手', 'Platforms': 'プラットフォーム', 'Install': 'インストール', 'Linux binary': 'Linux バイナリ', 'From source': 'ソースから',
      'Relay — Headless VPN auth': 'Relay — ヘッドレス VPN 認証', "AWS Client VPN requires a browser for SAML. That's fine on a laptop — impossible on a CI runner. Relay bridges the gap.": 'AWS Client VPN では SAML のためにブラウザが必要です。ノート PC では問題ありませんが、CI ランナーでは実行できません。Relay がこの差を埋めます。', 'Try the demo — no account required': 'デモを試す — アカウント不要', 'The problem with SAML in headless environments': 'ヘッドレス環境における SAML の課題', 'How Relay works': 'Relay の仕組み', 'See it in action': '実際の動作を見る', 'Try it now — no account required': '今すぐ試す — アカウント不要', 'GitHub Actions example': 'GitHub Actions の例', 'Use cases': 'ユースケース', 'Ready to try it?': '試してみませんか？', 'Install the client': 'クライアントをインストール'
    },
    [korean]: {
      'Getting started': '시작하기', 'Overview': '개요', 'Client install': '클라이언트 설치', 'How it works': '작동 방식', 'Try the demo': '데모 사용해 보기', 'CI/CD setup': 'CI/CD 설정', 'Apps': '앱', 'Privacy': '개인정보 처리방침', 'Terms': '이용 약관',
      'Official mobile apps': '공식 모바일 앱', 'AWS Client VPN,': 'AWS Client VPN을', 'in your pocket.': '손안에.',
      'Connect to your organisation’s AWS Client VPN from iPhone, iPad, or Android. Import your profile, sign in with SSO, and get on with your work.': 'iPhone, iPad 또는 Android에서 조직의 AWS Client VPN에 연결하세요. 프로필을 가져오고 SSO로 로그인한 뒤 업무를 계속할 수 있습니다.',
      'Download on the': '다운로드', 'For iPhone & iPad': 'iPhone 및 iPad용', 'Get it on': '다운로드 위치', 'For Android': 'Android용',
      'Looking for Linux, macOS, or CI/CD?': 'Linux, macOS 또는 CI/CD를 찾고 계신가요?', 'Explore all platforms': '모든 플랫폼 살펴보기',
      'Simple by design': '단순한 설계', 'From profile to protected connection.': '프로필에서 보호된 연결까지.', 'Download the app': '앱 다운로드', 'Choose the app for your phone or tablet.': '휴대폰 또는 태블릿용 앱을 선택하세요.', 'Import your .ovpn profile': '.ovpn 프로필 가져오기', 'Use the file your organisation already provides.': '조직에서 이미 제공하는 파일을 사용하세요.', 'Sign in and connect': '로그인하고 연결', 'Authenticate with your organisation’s SSO in the browser.': '브라우저에서 조직의 SSO로 인증하세요.',
      'What is openlawsvpn?': 'openlawsvpn이란?', 'Everywhere you work': '어디서나 업무를', 'One client. Your devices.': '하나의 클라이언트. 모든 기기.', 'View install options': '설치 옵션 보기', 'iPhone & iPad': 'iPhone 및 iPad', 'Android': 'Android', 'Linux client': 'Linux 클라이언트', 'macOS client': 'macOS 클라이언트', 'Relay service': 'Relay 서비스',
      'Choose your device': '기기 선택', 'Get openlawsvpn': 'openlawsvpn 받기', 'Platforms': '플랫폼', 'Install': '설치', 'Linux binary': 'Linux 바이너리', 'From source': '소스에서',
      'Relay — Headless VPN auth': 'Relay — 헤드리스 VPN 인증', "AWS Client VPN requires a browser for SAML. That's fine on a laptop — impossible on a CI runner. Relay bridges the gap.": 'AWS Client VPN은 SAML에 브라우저가 필요합니다. 노트북에서는 문제가 없지만 CI 러너에서는 불가능합니다. Relay가 이 간극을 해결합니다.', 'Try the demo — no account required': '데모 사용해 보기 — 계정 불필요', 'The problem with SAML in headless environments': '헤드리스 환경에서의 SAML 문제', 'How Relay works': 'Relay 작동 방식', 'See it in action': '실제 동작 보기', 'Try it now — no account required': '지금 사용해 보기 — 계정 불필요', 'GitHub Actions example': 'GitHub Actions 예시', 'Use cases': '사용 사례', 'Ready to try it?': '사용해 볼 준비가 되셨나요?', 'Install the client': '클라이언트 설치'
    }
  };
  Object.assign(dictionary, primaryDictionaries);

  const metadata = {
    [german]: {
      '/': {
        title: 'openlawsvpn — AWS Client VPN mit SAML/SSO für iPhone, Android, Linux & macOS',
        description: 'Mit openlawsvpn verbinden Sie sich per SAML/SSO von iPhone, Android, Linux und macOS mit AWS Client VPN.'
      },
      '/client/': {
        title: 'openlawsvpn herunterladen — AWS Client VPN für iPhone, Android, Linux & macOS',
        description: 'Laden Sie openlawsvpn für iPhone und iPad, Android, Linux oder macOS herunter.'
      },
      '/relay/': {
        title: 'openlawsvpn Relay — Headless-VPN-Authentifizierung für CI/CD und Server',
        description: 'openlawsvpn Relay ermöglicht CI/CD-Runnern und Headless-Servern die Authentifizierung bei AWS Client VPN, ohne Anmeldedaten zu speichern.'
      }
    },
    [french]: {
      '/': {
        title: 'openlawsvpn — AWS Client VPN avec SAML/SSO pour iPhone, Android, Linux et macOS',
        description: 'Connectez-vous à AWS Client VPN avec SAML/SSO depuis iPhone, Android, Linux et macOS grâce à openlawsvpn.'
      },
      '/client/': {
        title: 'Télécharger openlawsvpn — AWS Client VPN pour iPhone, Android, Linux et macOS',
        description: 'Téléchargez openlawsvpn pour iPhone et iPad, Android, Linux ou macOS.'
      },
      '/relay/': {
        title: 'openlawsvpn Relay — Authentification VPN sans interface pour CI/CD et serveurs',
        description: 'openlawsvpn Relay permet aux runners CI/CD et aux serveurs sans interface de s’authentifier auprès d’AWS Client VPN sans stocker d’identifiants.'
      }
    },
    [spanish]: {
      '/': {
        title: 'openlawsvpn — AWS Client VPN con SAML/SSO para iPhone, Android, Linux y macOS',
        description: 'Conéctate a AWS Client VPN con SAML/SSO desde iPhone, Android, Linux y macOS con openlawsvpn.'
      },
      '/client/': {
        title: 'Descargar openlawsvpn — AWS Client VPN para iPhone, Android, Linux y macOS',
        description: 'Descarga openlawsvpn para iPhone y iPad, Android, Linux o macOS.'
      },
      '/relay/': {
        title: 'openlawsvpn Relay — Autenticación VPN sin interfaz para CI/CD y servidores',
        description: 'openlawsvpn Relay permite que runners de CI/CD y servidores sin interfaz se autentiquen en AWS Client VPN sin almacenar credenciales.'
      }
    },
    [italian]: {
      '/': {
        title: 'openlawsvpn — AWS Client VPN con SAML/SSO per iPhone, Android, Linux e macOS',
        description: 'Connettiti ad AWS Client VPN con SAML/SSO da iPhone, Android, Linux e macOS con openlawsvpn.'
      },
      '/client/': {
        title: 'Scarica openlawsvpn — AWS Client VPN per iPhone, Android, Linux e macOS',
        description: 'Scarica openlawsvpn per iPhone e iPad, Android, Linux o macOS.'
      },
      '/relay/': {
        title: 'openlawsvpn Relay — Autenticazione VPN senza interfaccia per CI/CD e server',
        description: 'openlawsvpn Relay permette ai runner CI/CD e ai server senza interfaccia di autenticarsi ad AWS Client VPN senza memorizzare credenziali.'
      }
    },
    [portugueseBrazil]: {
      '/': {
        title: 'openlawsvpn — AWS Client VPN com SAML/SSO para iPhone, Android, Linux e macOS',
        description: 'Conecte-se ao AWS Client VPN com SAML/SSO usando iPhone, Android, Linux e macOS com o openlawsvpn.'
      },
      '/client/': {
        title: 'Baixar openlawsvpn — AWS Client VPN para iPhone, Android, Linux e macOS',
        description: 'Baixe o openlawsvpn para iPhone e iPad, Android, Linux ou macOS.'
      },
      '/relay/': {
        title: 'openlawsvpn Relay — Autenticação VPN sem interface para CI/CD e servidores',
        description: 'O openlawsvpn Relay permite que runners de CI/CD e servidores sem interface se autentiquem no AWS Client VPN sem armazenar credenciais.'
      }
    },
    [polish]: {
      '/': {
        title: 'openlawsvpn — AWS Client VPN z SAML/SSO dla iPhone’a, Androida, Linuxa i macOS',
        description: 'Łącz się z AWS Client VPN przez SAML/SSO z iPhone’a, Androida, Linuxa i macOS dzięki openlawsvpn.'
      },
      '/client/': {
        title: 'Pobierz openlawsvpn — AWS Client VPN dla iPhone’a, Androida, Linuxa i macOS',
        description: 'Pobierz openlawsvpn na iPhone’a i iPada, Androida, Linuxa lub macOS.'
      },
      '/relay/': {
        title: 'openlawsvpn Relay — Uwierzytelnianie VPN bez interfejsu dla CI/CD i serwerów',
        description: 'openlawsvpn Relay pozwala runnerom CI/CD i serwerom bez interfejsu uwierzytelniać się w AWS Client VPN bez przechowywania danych logowania.'
      }
    },
    [japanese]: {
      '/': {
        title: 'openlawsvpn — iPhone、Android、Linux、macOS 向け SAML/SSO 対応 AWS Client VPN',
        description: 'openlawsvpn を使えば、iPhone、Android、Linux、macOS から SAML/SSO で AWS Client VPN に接続できます。'
      },
      '/client/': {
        title: 'openlawsvpn をダウンロード — iPhone、Android、Linux、macOS 向け AWS Client VPN',
        description: 'iPhone と iPad、Android、Linux、macOS 向けの openlawsvpn をダウンロードできます。'
      },
      '/relay/': {
        title: 'openlawsvpn Relay — CI/CD とサーバー向けヘッドレス VPN 認証',
        description: 'openlawsvpn Relay により、CI/CD ランナーとヘッドレスサーバーは認証情報を保存せずに AWS Client VPN へ認証できます。'
      }
    },
    [korean]: {
      '/': {
        title: 'openlawsvpn — iPhone, Android, Linux, macOS용 SAML/SSO AWS Client VPN',
        description: 'openlawsvpn으로 iPhone, Android, Linux, macOS에서 SAML/SSO를 사용해 AWS Client VPN에 연결하세요.'
      },
      '/client/': {
        title: 'openlawsvpn 다운로드 — iPhone, Android, Linux, macOS용 AWS Client VPN',
        description: 'iPhone 및 iPad, Android, Linux, macOS용 openlawsvpn을 다운로드하세요.'
      },
      '/relay/': {
        title: 'openlawsvpn Relay — CI/CD 및 서버용 헤드리스 VPN 인증',
        description: 'openlawsvpn Relay를 사용하면 CI/CD 러너와 헤드리스 서버가 자격 증명을 저장하지 않고 AWS Client VPN에 인증할 수 있습니다.'
      }
    }
  };

  function savedLanguage() {
    try {
      const value = localStorage.getItem(storageKey);
      return supported.has(value) ? value : null;
    } catch (_) {
      return null;
    }
  }

  function languageFromQuery() {
    const value = new URLSearchParams(window.location.search).get(languageParameter);
    return value && supported.has(value) ? value : null;
  }

  function saveLanguage(language) {
    try { localStorage.setItem(storageKey, language); } catch (_) { /* Functional preference; page still works without storage. */ }
  }

  function preferredLanguage() {
    const browserLanguages = navigator.languages || [navigator.language || english];
    return browserLanguages
      .map(language => browserLanguageAliases[language.toLowerCase().split('-')[0]])
      .find(language => supported.has(language)) || english;
  }

  function translateText(language) {
    const phrases = dictionary[language];
    if (!phrases) return;
    const ignored = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE']);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return ignored.has(node.parentElement?.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const value = node.nodeValue || '';
      const phrase = normalize(value);
      const translation = phrases[phrase];
      if (!translation) continue;
      const leading = value.match(/^\s*/)?.[0] || '';
      const trailing = value.match(/\s*$/)?.[0] || '';
      node.nodeValue = `${leading}${translation}${trailing}`;
    }
  }

  function updateMetadata(language) {
    const page = metadata[language]?.[location.pathname];
    if (!page) return;
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
  }

  function updateCanonicalUrl(language) {
    // Only the three translated landing pages have language-specific metadata
    // and hreflang annotations. Keep documentation and legal-page canonicals
    // stable until they have complete translations of their own.
    if (!metadata[german]?.[location.pathname]) return;

    const url = new URL(window.location.href);
    url.hash = '';
    url.search = language === english ? '' : `?${languageParameter}=${encodeURIComponent(language)}`;
    const canonicalUrl = url.toString();
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
  }

  function languageUrl(language) {
    const url = new URL(window.location.href);
    if (language === english) url.searchParams.delete(languageParameter);
    else url.searchParams.set(languageParameter, language);
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function applyLanguage(language) {
    document.documentElement.lang = language;
    if (language !== english) {
      translateText(language);
      updateMetadata(language);
    }
    updateCanonicalUrl(language);
  }

  function createSwitcher(language, showSuggestion) {
    const control = document.createElement('div');
    control.className = 'language-control';
    control.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.2 2.4 3.4 5.4 3.4 9S14.2 18.6 12 21c-2.2-2.4-3.4-5.4-3.4-9S9.8 5.4 12 3Z" stroke="currentColor" stroke-width="1.8"/></svg>
      <label class="language-label" for="site-language">Language</label>
      <select id="site-language" aria-label="Language">${Object.entries(languages).map(([code, info]) => `<option value="${code}">${info.label}</option>`).join('')}</select>`;
    const select = control.querySelector('select');
    select.value = language;
    select.addEventListener('change', () => {
      saveLanguage(select.value);
      location.assign(languageUrl(select.value));
    });
    document.body.append(control);

    if (!showSuggestion) return;
    const notice = document.createElement('aside');
    notice.className = 'language-notice';
    notice.setAttribute('aria-label', 'Language suggestion');
    const suggestion = languages[showSuggestion].suggestion;
    notice.innerHTML = `<p>${suggestion.text}</p><div class="language-notice-actions"><button type="button" data-language="${showSuggestion}">${suggestion.use}</button><button type="button" data-language="en">${suggestion.keep}</button></div>`;
    notice.addEventListener('click', event => {
      const language = event.target.closest('[data-language]')?.dataset.language;
      if (!language) return;
      saveLanguage(language);
      location.assign(languageUrl(language));
    });
    document.body.append(notice);
  }

  function init() {
    const selected = languageFromQuery() || savedLanguage() || english;
    applyLanguage(selected);
    const detected = preferredLanguage();
    createSwitcher(selected, !savedLanguage() && detected !== english ? detected : null);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
