import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { useLanguage } from "@/i18n/LanguageContext";
import { Helmet } from "react-helmet-async";
import { OG_LOCALES } from "@/i18n/translations";

const contactSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Required"),
  message: z.string().min(10, "Min 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@startvagina.nl", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _subject: data.subject,
          message: data.message,
          _template: "table",
        }),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.contactTitle} — StartVagina</title>
        <meta name="description" content={t.contactMetaDesc} />
        <meta property="og:title" content={`${t.contactTitle} — StartVagina`} />
        <meta property="og:description" content={t.contactMetaDesc} />
        <meta property="og:locale" content={OG_LOCALES[lang]} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AgeGate />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-2xl py-10 px-4">
          <h1 className="text-3xl font-bold font-display text-foreground mb-2">
            {t.contactTitle}
          </h1>
          <p className="text-muted-foreground mb-8">{t.contactIntro}</p>

          {status === "success" ? (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-6 text-center">
              <p className="text-lg font-semibold text-green-400 mb-1">✓ {t.contactSuccessTitle}</p>
              <p className="text-muted-foreground text-sm">{t.contactSuccessText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  {t.contactName} *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={t.contactNamePlaceholder}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{t.contactRequired}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  {t.contactEmail} *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={t.contactEmailPlaceholder}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{t.contactInvalidEmail}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                  {t.contactSubject} *
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject")}
                  className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={t.contactSubjectPlaceholder}
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{t.contactRequired}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  {t.contactMessage} *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register("message")}
                  className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                  placeholder={t.contactMessagePlaceholder}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{t.contactMinChars}</p>}
              </div>

              {status === "error" && (
                <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3">
                  <p className="text-sm text-red-400">{t.contactError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? t.contactSending : t.contactSend}
              </button>
            </form>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
