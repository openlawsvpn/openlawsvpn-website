/*
 * Google Consent Mode v2 in basic mode.
 * No Google Analytics or Google Ads request is made until the visitor opts in.
 */
(() => {
  'use strict';

  const storageKey = 'openlawsvpn-consent-v1';
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
    const banner = document.createElement('section');
    banner.className = 'consent-banner';
    banner.setAttribute('aria-label', 'Privacy choices');
    banner.innerHTML = `
      <h2>Your privacy choices</h2>
      <p>With your permission, we use Google Analytics, Google Ads, and GoatCounter to measure visits and campaign performance. You can change your choice at any time. <a href="/privacy/">Privacy Policy</a></p>
      <div class="consent-actions">
        <button class="consent-button consent-button-primary" type="button" data-consent="accept">Accept all</button>
        <button class="consent-button" type="button" data-consent="reject">Reject optional</button>
        <button class="consent-button" type="button" data-consent="manage" aria-expanded="false">Manage choices</button>
      </div>
      <div class="consent-options" hidden>
        <label class="consent-option"><input type="checkbox" name="analytics"><span><strong>Analytics measurement</strong>Understand which pages and campaigns are useful.</span></label>
        <label class="consent-option"><input type="checkbox" name="ads"><span><strong>Advertising measurement</strong>Measure Google Ads campaign performance.</span></label>
        <label class="consent-option"><input type="checkbox" name="personalization"><span><strong>Personalised advertising</strong>Allow Google to use advertising data for more relevant ads.</span></label>
        <div class="consent-actions"><button class="consent-button consent-button-primary" type="button" data-consent="save">Save choices</button></div>
      </div>`;

    const settings = document.createElement('button');
    settings.className = 'consent-settings';
    settings.type = 'button';
    settings.textContent = 'Privacy choices';
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
