const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ?? '';

export function isContactEndpointConfigured() {
  return CONTACT_ENDPOINT.length > 0;
}

export function validateContactForm(values) {
  const errors = {};
  const name = values.name?.trim() ?? '';
  const email = values.email?.trim() ?? '';
  const message = values.message?.trim() ?? '';

  if (!name) {
    errors.name = 'Name is required.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

export async function submitContactForm(values) {
  if (!isContactEndpointConfigured()) {
    throw new Error('Contact form is not configured yet.');
  }

  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim()
  };

  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  let responseBody = null;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    const apiError =
      responseBody?.errors?.[0]?.message ||
      responseBody?.error ||
      responseBody?.message ||
      'Failed to send message. Please try again.';
    throw new Error(apiError);
  }

  return responseBody;
}
