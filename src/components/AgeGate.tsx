import { useState, useEffect } from "react";

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sv_age_verified");
    if (stored === "true") setVerified(true);
  }, []);

  const handleVerify = () => {
    localStorage.setItem("sv_age_verified", "true");
    setVerified(true);
  };

  if (verified) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6 space-y-6">
        <h1 className="text-3xl font-bold font-display">
          <span className="text-primary">Start</span>Vagina
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Deze website bevat expliciete inhoud die alleen bedoeld is voor volwassenen (18+). 
          Door verder te gaan bevestig je dat je 18 jaar of ouder bent.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleVerify}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Ik ben 18 jaar of ouder — Doorgaan
          </button>
          <a
            href="https://www.google.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ik ben jonger dan 18 — Verlaat de site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
