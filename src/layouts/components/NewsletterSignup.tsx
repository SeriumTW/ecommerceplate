"use client";

import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulazione invio (da sostituire con vera API)
    setTimeout(() => {
      setMessage("Grazie! Controlla la tua email per il codice sconto.");
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 via-primary-muted/20 to-light/30 dark:from-darkmode-primary/10 dark:via-darkmode-primary-muted/20 dark:to-darkmode-light/10">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge incentivo */}
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-warning text-white text-sm font-bold shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Sconto Esclusivo
          </div>

          <h2 className="mb-4">Unisciti alla Famiglia LoveBirdsLand</h2>
          <p className="text-lg md:text-xl text-text dark:text-darkmode-text mb-8 max-w-2xl mx-auto leading-relaxed">
            Ricevi <strong>10% di sconto</strong> sul tuo primo ordine, consigli
            per il benessere del tuo animale e offerte esclusive direttamente
            nella tua casella email.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua email"
                required
                disabled={isSubmitting}
                className="flex-1 px-5 py-4 rounded-2xl border-2 border-border dark:border-darkmode-border bg-white dark:bg-darkmode-body text-text dark:text-darkmode-text placeholder:text-text/50 dark:placeholder:text-darkmode-text/50 focus:outline-none focus:border-primary dark:focus:border-darkmode-primary transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-lg px-8 font-semibold whitespace-nowrap disabled:opacity-50"
                style={{
                  backgroundColor: "#FF7A59",
                  color: "#FFFFFF",
                  borderColor: "#FF7A59",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#FF6342";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF7A59";
                }}
              >
                {isSubmitting ? "Invio..." : "Ottieni lo Sconto"}
              </button>
            </div>
          </form>

          {/* Message */}
          {message && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-success/10 text-success text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {message}
            </div>
          )}

          {/* Privacy note */}
          <p className="text-xs text-text/70 dark:text-darkmode-text/70 mt-4">
            Rispettiamo la tua privacy. Puoi disiscriverti in qualsiasi momento.
          </p>

          {/* Social proof mini */}
          <div className="flex items-center justify-center gap-2 mt-8 text-sm text-text dark:text-darkmode-text">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary-muted dark:bg-darkmode-primary-muted border-2 border-white dark:border-darkmode-body"
                />
              ))}
            </div>
            <span className="font-medium">
              Oltre 2.000 iscritti alla newsletter
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
