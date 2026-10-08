/**
 * Envio del formulario de contacto a Web3Forms con mejora progresiva:
 * sin JavaScript el <form> hace POST normal y Web3Forms redirige a /gracias;
 * con JavaScript se envia por fetch y el estado se anuncia en una region aria-live.
 */

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const REQUEST_TIMEOUT_MS = 10_000;

export type SubmitStatus = 'sending' | 'success' | 'error';

interface Web3FormsResponse {
  readonly success: boolean;
  readonly message?: string;
  readonly body?: { readonly message?: string };
}

export interface SubmitResult {
  readonly ok: boolean;
  readonly httpStatus: number;
}

const STATUS_MESSAGES: Record<SubmitStatus, string> = {
  sending: 'Enviando tu mensaje...',
  success: 'Gracias, recibí tu mensaje. Te respondo pronto.',
  error: 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme directo al correo.',
};

const RATE_LIMIT_MESSAGE = 'Se enviaron demasiados mensajes seguidos. Espera un momento e inténtalo de nuevo.';

export async function submitContactForm(form: HTMLFormElement): Promise<SubmitResult> {
  const payload = Object.fromEntries(new FormData(form));
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = (await response.json()) as Web3FormsResponse;
    return { ok: response.ok && data.success, httpStatus: response.status };
  } catch {
    return { ok: false, httpStatus: 0 };
  } finally {
    window.clearTimeout(timer);
  }
}

function messageFor(status: SubmitStatus, httpStatus: number): string {
  return status === 'error' && httpStatus === 429 ? RATE_LIMIT_MESSAGE : STATUS_MESSAGES[status];
}

function renderStatus(form: HTMLFormElement, status: SubmitStatus, httpStatus = 0): void {
  const region = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (region) {
    region.textContent = messageFor(status, httpStatus);
    region.dataset.state = status;
  }
  if (button) button.disabled = status === 'sending';
}

export function enhanceContactForm(form: HTMLFormElement): void {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    renderStatus(form, 'sending');
    const result = await submitContactForm(form);
    renderStatus(form, result.ok ? 'success' : 'error', result.httpStatus);
    if (result.ok) form.reset();
  });
}
