import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const COOKIE_NAME = 'nf_lang';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 400;
const SUPPORTED_LOCALES = new Set(['en', 'it']);

function normalizeLocale(locale) {
  const normalizedLocale = locale?.toLowerCase().split('-')[0];
  return SUPPORTED_LOCALES.has(normalizedLocale) ? normalizedLocale : null;
}

function getCookieLocale() {
  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${COOKIE_NAME}=`));
  return normalizeLocale(cookie?.slice(COOKIE_NAME.length + 1));
}

function setLocaleCookie(locale) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function getSelectedLocale(link) {
  if (link.classList.contains('mobile-locale-toggle')) {
    return normalizeLocale(link.dataset.locale);
  }

  const dropdown = link.closest('.dropdown__menu');
  const localeTrigger = dropdown?.parentElement?.querySelector(
    '.native-locale-dropdown',
  );

  return localeTrigger ? normalizeLocale(link.getAttribute('lang')) : null;
}

function handleLocaleClick(event) {
  const link = event.target.closest?.('a');
  if (!link) return;

  const locale = getSelectedLocale(link);
  if (locale) {
    setLocaleCookie(locale);
  }
}

if (ExecutionEnvironment.canUseDOM) {
  const locale = getCookieLocale();
  if (locale) {
    setLocaleCookie(locale);
  }

  document.addEventListener('click', handleLocaleClick, true);
}
