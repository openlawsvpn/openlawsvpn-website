/*
 * Google Consent Mode v2 in basic mode.
 * No Google Analytics or Google Ads request is made until the visitor opts in.
 */
(() => {
  'use strict';

  const storageKey = 'openlawsvpn-consent-v1';
  const languageStorageKey = 'openlawsvpn-language-v1';
  const consentMaxAge = 180 * 24 * 60 * 60 * 1000;
  const analyticsId = 'G-0FT1WE72MX';
  const adsId = 'AW-18373098344';
  let googleTagLoaded = false;
  let analyticsConfigured = false;
  let adsConfigured = false;
  let goatCounterLoaded = false;

  const denied = {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  };

  const copy = {
    en: {
      ariaLabel: 'Privacy choices',
      title: 'Your privacy choices',
      description: 'With your permission, we use Google Analytics, Google Ads, and GoatCounter to measure visits and campaign performance. You can change your choice at any time.',
      privacy: 'Privacy Policy',
      accept: 'Accept all',
      reject: 'Reject optional',
      manage: 'Manage choices',
      analytics: 'Analytics measurement',
      analyticsDescription: 'Understand which pages and campaigns are useful.',
      ads: 'Advertising measurement',
      adsDescription: 'Measure Google Ads campaign performance.',
      personalised: 'Personalised advertising',
      personalisedDescription: 'Allow Google to use advertising data for more relevant ads.',
      save: 'Save choices',
      settings: 'Privacy choices'
    },
    de: {
      ariaLabel: 'Datenschutzeinstellungen',
      title: 'Ihre Datenschutzeinstellungen',
      description: 'Mit Ihrer Einwilligung verwenden wir Google Analytics, Google Ads und GoatCounter, um Besuche und die Leistung von Kampagnen zu messen. Sie können Ihre Auswahl jederzeit ändern.',
      privacy: 'Datenschutzerklärung',
      accept: 'Alle akzeptieren',
      reject: 'Optionale ablehnen',
      manage: 'Auswahl verwalten',
      analytics: 'Analyse-Messung',
      analyticsDescription: 'Verstehen, welche Seiten und Kampagnen hilfreich sind.',
      ads: 'Werbe-Messung',
      adsDescription: 'Die Leistung von Google-Ads-Kampagnen messen.',
      personalised: 'Personalisierte Werbung',
      personalisedDescription: 'Google darf Werbedaten für relevantere Anzeigen verwenden.',
      save: 'Auswahl speichern',
      settings: 'Datenschutzeinstellungen'
    },
    fr: {
      ariaLabel: 'Choix de confidentialité', title: 'Vos choix de confidentialité', description: 'Avec votre autorisation, nous utilisons Google Analytics, Google Ads et GoatCounter pour mesurer les visites et les performances des campagnes. Vous pouvez modifier votre choix à tout moment.', privacy: 'Politique de confidentialité', accept: 'Tout accepter', reject: 'Refuser les options', manage: 'Gérer mes choix', analytics: 'Mesure d’audience', analyticsDescription: 'Comprendre quelles pages et campagnes sont utiles.', ads: 'Mesure publicitaire', adsDescription: 'Mesurer les performances des campagnes Google Ads.', personalised: 'Publicité personnalisée', personalisedDescription: 'Autoriser Google à utiliser les données publicitaires pour des annonces plus pertinentes.', save: 'Enregistrer mes choix', settings: 'Choix de confidentialité'
    },
    es: {
      ariaLabel: 'Opciones de privacidad', title: 'Tus opciones de privacidad', description: 'Con tu permiso, usamos Google Analytics, Google Ads y GoatCounter para medir las visitas y el rendimiento de las campañas. Puedes cambiar tu elección en cualquier momento.', privacy: 'Política de privacidad', accept: 'Aceptar todo', reject: 'Rechazar opcionales', manage: 'Gestionar opciones', analytics: 'Medición de analítica', analyticsDescription: 'Entender qué páginas y campañas resultan útiles.', ads: 'Medición publicitaria', adsDescription: 'Medir el rendimiento de las campañas de Google Ads.', personalised: 'Publicidad personalizada', personalisedDescription: 'Permitir que Google use datos publicitarios para anuncios más relevantes.', save: 'Guardar opciones', settings: 'Opciones de privacidad'
    },
    it: {
      ariaLabel: 'Scelte per la privacy', title: 'Le tue scelte per la privacy', description: 'Con il tuo consenso, utilizziamo Google Analytics, Google Ads e GoatCounter per misurare le visite e il rendimento delle campagne. Puoi modificare la scelta in qualsiasi momento.', privacy: 'Informativa sulla privacy', accept: 'Accetta tutto', reject: 'Rifiuta opzionali', manage: 'Gestisci le scelte', analytics: 'Misurazione analitica', analyticsDescription: 'Capire quali pagine e campagne sono utili.', ads: 'Misurazione pubblicitaria', adsDescription: 'Misurare il rendimento delle campagne Google Ads.', personalised: 'Pubblicità personalizzata', personalisedDescription: 'Consentire a Google di usare i dati pubblicitari per annunci più pertinenti.', save: 'Salva le scelte', settings: 'Scelte per la privacy'
    },
    'pt-BR': {
      ariaLabel: 'Escolhas de privacidade', title: 'Suas escolhas de privacidade', description: 'Com sua permissão, usamos o Google Analytics, o Google Ads e o GoatCounter para medir visitas e o desempenho das campanhas. Você pode alterar sua escolha a qualquer momento.', privacy: 'Política de Privacidade', accept: 'Aceitar tudo', reject: 'Recusar opcionais', manage: 'Gerenciar escolhas', analytics: 'Medição de análises', analyticsDescription: 'Entender quais páginas e campanhas são úteis.', ads: 'Medição de publicidade', adsDescription: 'Medir o desempenho das campanhas do Google Ads.', personalised: 'Publicidade personalizada', personalisedDescription: 'Permitir que o Google use dados de publicidade para anúncios mais relevantes.', save: 'Salvar escolhas', settings: 'Escolhas de privacidade'
    },
    pl: {
      ariaLabel: 'Ustawienia prywatności', title: 'Twoje ustawienia prywatności', description: 'Za Twoją zgodą używamy Google Analytics, Google Ads i GoatCounter do mierzenia odwiedzin i skuteczności kampanii. W każdej chwili możesz zmienić wybór.', privacy: 'Polityka prywatności', accept: 'Zaakceptuj wszystko', reject: 'Odrzuć opcjonalne', manage: 'Zarządzaj wyborem', analytics: 'Pomiar analityczny', analyticsDescription: 'Pozwala zrozumieć, które strony i kampanie są przydatne.', ads: 'Pomiar reklam', adsDescription: 'Pozwala mierzyć skuteczność kampanii Google Ads.', personalised: 'Spersonalizowane reklamy', personalisedDescription: 'Pozwala Google wykorzystywać dane reklamowe do bardziej trafnych reklam.', save: 'Zapisz wybór', settings: 'Ustawienia prywatności'
    },
    ja: {
      ariaLabel: 'プライバシーの選択', title: 'プライバシーに関する選択', description: 'ご同意いただいた場合、Google Analytics、Google Ads、GoatCounter を使用して訪問数とキャンペーンの効果を測定します。選択はいつでも変更できます。', privacy: 'プライバシーポリシー', accept: 'すべて許可', reject: '任意項目を拒否', manage: '選択を管理', analytics: '分析測定', analyticsDescription: '有用なページやキャンペーンを把握します。', ads: '広告測定', adsDescription: 'Google 広告キャンペーンの効果を測定します。', personalised: 'パーソナライズド広告', personalisedDescription: 'より関連性の高い広告のために Google が広告データを使用することを許可します。', save: '選択を保存', settings: 'プライバシーの選択'
    },
    ko: {
      ariaLabel: '개인정보 선택', title: '개인정보 선택', description: '동의하시면 Google Analytics, Google Ads 및 GoatCounter를 사용하여 방문과 캠페인 실적을 측정합니다. 언제든지 선택을 변경할 수 있습니다.', privacy: '개인정보 처리방침', accept: '모두 허용', reject: '선택 항목 거부', manage: '선택 관리', analytics: '분석 측정', analyticsDescription: '유용한 페이지와 캠페인을 파악합니다.', ads: '광고 측정', adsDescription: 'Google Ads 캠페인 실적을 측정합니다.', personalised: '개인 맞춤 광고', personalisedDescription: '더 관련성 높은 광고를 위해 Google이 광고 데이터를 사용하도록 허용합니다.', save: '선택 저장', settings: '개인정보 선택'
    }
  };

  function currentLanguage() {
    try {
      const language = localStorage.getItem(languageStorageKey);
      return Object.hasOwn(copy, language) ? language : 'en';
    } catch (_) { return 'en'; }
  }

  function readConsent() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey));
      if (value && typeof value.analytics === 'boolean' && typeof value.ads === 'boolean' && typeof value.personalization === 'boolean' && typeof value.updatedAt === 'number' && Date.now() - value.updatedAt < consentMaxAge) return value;
    } catch (_) { /* Storage may be unavailable; the banner remains available. */ }
    return null;
  }

  function writeConsent(value) {
    value.updatedAt = Date.now();
    try { localStorage.setItem(storageKey, JSON.stringify(value)); } catch (_) { /* Keep the choice for this page view. */ }
  }

  function consentSignals(value) {
    return {
      analytics_storage: value.analytics ? 'granted' : 'denied',
      ad_storage: value.ads ? 'granted' : 'denied',
      ad_user_data: value.ads ? 'granted' : 'denied',
      ad_personalization: value.ads && value.personalization ? 'granted' : 'denied'
    };
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const savedConsent = readConsent();
  window.gtag('consent', 'default', savedConsent ? consentSignals(savedConsent) : denied);

  function ensureGoogleTag(value) {
    if (!value.analytics && !value.ads) return;

    if (!googleTagLoaded) {
      googleTagLoaded = true;
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      document.head.appendChild(tag);
      window.gtag('js', new Date());
    }
    if (value.analytics && !analyticsConfigured) {
      analyticsConfigured = true;
      window.gtag('config', analyticsId);
    }
    if (value.ads && !adsConfigured) {
      adsConfigured = true;
      window.gtag('config', adsId);
    }
  }

  function ensureGoatCounter(value) {
    if (!value.analytics || goatCounterLoaded) return;
    goatCounterLoaded = true;
    const tag = document.createElement('script');
    tag.async = true;
    tag.dataset.goatcounter = 'https://vorona.goatcounter.com/count';
    tag.src = 'https://gc.zgo.at/count.js';
    document.head.appendChild(tag);
  }

  function applyConsent(value) {
    writeConsent(value);
    window.gtag('consent', 'update', consentSignals(value));
    ensureGoogleTag(value);
    ensureGoatCounter(value);
  }

  function buildControls() {
    const text = copy[currentLanguage()];
    const banner = document.createElement('section');
    banner.className = 'consent-banner';
    banner.setAttribute('aria-label', text.ariaLabel);
    banner.innerHTML = `
      <h2>${text.title}</h2>
      <p>${text.description} <a href="/privacy/">${text.privacy}</a></p>
      <div class="consent-actions">
        <button class="consent-button consent-button-primary" type="button" data-consent="accept">${text.accept}</button>
        <button class="consent-button" type="button" data-consent="reject">${text.reject}</button>
        <button class="consent-button" type="button" data-consent="manage" aria-expanded="false">${text.manage}</button>
      </div>
      <div class="consent-options" hidden>
        <label class="consent-option"><input type="checkbox" name="analytics"><span><strong>${text.analytics}</strong>${text.analyticsDescription}</span></label>
        <label class="consent-option"><input type="checkbox" name="ads"><span><strong>${text.ads}</strong>${text.adsDescription}</span></label>
        <label class="consent-option"><input type="checkbox" name="personalization"><span><strong>${text.personalised}</strong>${text.personalisedDescription}</span></label>
        <div class="consent-actions"><button class="consent-button consent-button-primary" type="button" data-consent="save">${text.save}</button></div>
      </div>`;

    const settings = document.createElement('button');
    settings.className = 'consent-settings';
    settings.type = 'button';
    settings.textContent = text.settings;
    settings.hidden = true;

    const options = banner.querySelector('.consent-options');
    const manage = banner.querySelector('[data-consent="manage"]');
    const analytics = banner.querySelector('[name="analytics"]');
    const ads = banner.querySelector('[name="ads"]');
    const personalization = banner.querySelector('[name="personalization"]');

    function open(value) {
      const choice = value || readConsent() || { analytics: false, ads: false, personalization: false };
      analytics.checked = choice.analytics;
      ads.checked = choice.ads;
      personalization.checked = choice.personalization;
      personalization.disabled = !ads.checked;
      banner.hidden = false;
      settings.hidden = true;
    }
    function close() {
      banner.hidden = true;
      settings.hidden = false;
      options.hidden = true;
      manage.setAttribute('aria-expanded', 'false');
    }
    function save(value) { applyConsent(value); close(); }

    ads.addEventListener('change', () => {
      personalization.disabled = !ads.checked;
      if (!ads.checked) personalization.checked = false;
    });
    banner.addEventListener('click', (event) => {
      const action = event.target.closest('[data-consent]')?.dataset.consent;
      if (action === 'accept') save({ analytics: true, ads: true, personalization: true });
      if (action === 'reject') save({ analytics: false, ads: false, personalization: false });
      if (action === 'manage') {
        options.hidden = !options.hidden;
        manage.setAttribute('aria-expanded', String(!options.hidden));
      }
      if (action === 'save') save({ analytics: analytics.checked, ads: ads.checked, personalization: ads.checked && personalization.checked });
    });
    settings.addEventListener('click', () => open());
    document.body.append(banner, settings);
    if (savedConsent) close(); else open();
  }

  if (savedConsent) {
    ensureGoogleTag(savedConsent);
    ensureGoatCounter(savedConsent);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildControls);
  else buildControls();
})();
