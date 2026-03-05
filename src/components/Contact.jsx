import { useState } from 'react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SectionShell from './SectionShell';
import {
  isContactEndpointConfigured,
  submitContactForm,
  validateContactForm
} from '../lib/contact';

const initialFormValues = {
  name: '',
  email: '',
  message: '',
  website: ''
};

function Contact() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const endpointConfigured = isContactEndpointConfigured();

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }));
    }

    if (status.type !== 'idle') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formValues.website.trim()) {
      return;
    }

    const nextErrors = validateContactForm(formValues);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    if (!endpointConfigured) {
      setStatus({
        type: 'error',
        message: 'Contact form is not configured. Add VITE_CONTACT_ENDPOINT in your .env file.'
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await submitContactForm(formValues);
      setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' });
      setFormValues(initialFormValues);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to send the message right now. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell id="contact">
      <SectionHeading title="Contact" subtitle="Get In Touch" />
      <div className="grid gap-[var(--space-md)] lg:grid-cols-2">
        <Reveal>
          <div className="surface-card h-full p-7 sm:p-10">
            <p className="text-zinc-300 sm:text-lg">
              Reach out for collaborations, product ideas, or developer opportunities.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="https://github.com/Abhis-web"
                target="_blank"
                rel="noreferrer"
                className="block w-fit text-sm text-zinc-300 hover:text-white sm:text-base"
              >
                GitHub: github.com/Abhis-web
              </a>
              <a
                href="https://www.linkedin.com/in/abhisek-pattanaik/"
                target="_blank"
                rel="noreferrer"
                className="block w-fit text-sm text-zinc-300 hover:text-white sm:text-base"
              >
                LinkedIn: linkedin.com/in/abhisek-pattanaik
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="surface-card p-7 sm:p-10" onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <label className="hidden" aria-hidden="true">
                <span>Website</span>
                <input
                  type="text"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formValues.website}
                  onChange={onFieldChange}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-400">Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formValues.name}
                  onChange={onFieldChange}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  className="w-full rounded-2xl border border-zinc-700 bg-black/60 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                />
                {errors.name ? <span className="mt-2 block text-xs text-red-300">{errors.name}</span> : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-400">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formValues.email}
                  onChange={onFieldChange}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className="w-full rounded-2xl border border-zinc-700 bg-black/60 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                />
                {errors.email ? <span className="mt-2 block text-xs text-red-300">{errors.email}</span> : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-400">Message</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project"
                  value={formValues.message}
                  onChange={onFieldChange}
                  aria-invalid={Boolean(errors.message)}
                  className="w-full rounded-2xl border border-zinc-700 bg-black/60 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-400"
                />
                {errors.message ? (
                  <span className="mt-2 block text-xs text-red-300">{errors.message}</span>
                ) : null}
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 rounded-full border border-white bg-white px-7 py-3.5 text-sm font-medium text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {status.type === 'success' ? (
              <p className="mt-4 text-sm text-zinc-200">{status.message}</p>
            ) : null}
            {status.type === 'error' ? (
              <p className="mt-4 text-sm text-red-300">{status.message}</p>
            ) : null}
            {!endpointConfigured && import.meta.env.DEV ? (
              <p className="mt-4 text-xs text-zinc-500">
                Add <code>VITE_CONTACT_ENDPOINT</code> in <code>.env</code> to activate submission.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </SectionShell>
  );
}

export default Contact;
