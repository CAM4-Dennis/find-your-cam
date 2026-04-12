import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem("sv_age_verified");
    if (stored === "true") setVerified(true);
    setChecking(false);
  }, []);

  const handleVerify = () => {
    localStorage.setItem("sv_age_verified", "true");
    setVerified(true);
  };

  return (
    <>
      {/* Always render children so crawlers see the full content */}
      <div aria-hidden={!verified && !checking}>{children}</div>

      {/* Non-blocking overlay — covers content visually but doesn't remove it from DOM */}
      {!verified && !checking && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Leeftijdsverificatie"
        >
          <div className="text-center max-w-md px-6 space-y-6">
            <h2 className="text-3xl font-bold font-display">
              <span className="text-primary">Start</span>Vagina
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.ageGateText}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleVerify}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                {t.ageGateConfirm}
              </button>
              <a
                href="https://www.google.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.ageGateLeave}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgeGate;
