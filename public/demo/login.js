const DEMO_TOKEN = 'PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIElEPSJvcGVubGF3c3Zwbi1kZW1vIj48L3NhbWxwOlJlc3BvbnNlPg==';
const DEMO_USER = 'reviewer';
const DEMO_PASS = 'Demo2026!';
const ACS_URL = 'http://127.0.0.1:35001/';
const COOKIE_KEY = 'demo_auth';
const COOKIE_TTL = 30;

const form = document.getElementById('loginForm');
const userInput = document.getElementById('username');
const passInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const statusEl = document.getElementById('status');
const errUser = document.getElementById('err-user');
const errPass = document.getElementById('err-pass');

function setCookie() {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + COOKIE_TTL);
  document.cookie = `${COOKIE_KEY}=1; expires=${expiration.toUTCString()}; path=/; SameSite=Lax`;
}

function hasCookie() {
  return document.cookie.split(';').some((cookie) => cookie.trim().startsWith(`${COOKIE_KEY}=`));
}

// Deliver the SAMLResponse to the app's local ACS server (127.0.0.1:35001) via
// a form-POST navigation. This works in iOS ASWebAuthenticationSession and
// Android Chrome Custom Tabs, where mixed-content fetches to loopback do not.
function sendToken() {
  const formElement = document.createElement('form');
  formElement.method = 'POST';
  formElement.action = ACS_URL;

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'SAMLResponse';
  input.value = DEMO_TOKEN;
  formElement.appendChild(input);
  document.body.appendChild(formElement);
  formElement.submit();
}

if (hasCookie()) {
  form.style.display = 'none';
  document.querySelector('.hint-box').style.display = 'none';
  statusEl.className = 'status ok';
  statusEl.textContent = '✓ Reconnecting…';
  sendToken();
} else {
  userInput.value = '';
  passInput.value = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  [userInput, passInput].forEach((input) => input.classList.remove('error'));
  [errUser, errPass].forEach((element) => (element.style.display = 'none'));
  statusEl.className = 'status';
  statusEl.textContent = '';

  const user = userInput.value.trim();
  const pass = passInput.value;
  let valid = true;

  if (user !== DEMO_USER) {
    userInput.classList.add('error');
    errUser.style.display = 'block';
    valid = false;
  }
  if (pass !== DEMO_PASS) {
    passInput.classList.add('error');
    errPass.style.display = 'block';
    valid = false;
  }
  if (!valid) return;

  submitBtn.disabled = true;
  statusEl.className = 'status ok';
  statusEl.textContent = '✓ Credentials accepted — returning to app…';

  setCookie();
  sendToken();
});
