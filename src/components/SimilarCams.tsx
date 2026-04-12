import { useMemo } from "react";
import type { CamModel } from "@/types/cam";
import CamCard from "@/components/CamCard";
import { useCam4Online } from "@/hooks/useCam4";
import { useChaturbateOnline } from "@/hooks/useChaturbate";
import { useBongaCamsOnline } from "@/hooks/useBongaCams";
import { useStripchatOnline } from "@/hooks/useStripchat";
import { useLanguage } from "@/i18n/LanguageContext";

interface SimilarCamsProps {
  currentModel: CamModel;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SimilarCams = ({ currentModel }: SimilarCamsProps) => {
  const { data: cam4 = [] } = useCam4Online({ gender: "female", limit: 50 });
  const { data: cb = [] } = useChaturbateOnline({ gender: "f", limit: 50 });
  const { data: bonga = [] } = useBongaCamsOnline({ section: "straight", limit: 50 });
  const { data: strip = [] } = useStripchatOnline({ tag: "girls", limit: 50 });

  const similar = useMemo(() => {
    const all = [...cam4, ...cb, ...bonga, ...strip].filter(
      (m) => m.id !== currentModel.id
    );

    // Score each model by similarity
    const scored = all.map((m) => {
      let score = 0;
      if (m.country === currentModel.country) score += 3;
      if (m.age && currentModel.age && Math.abs(m.age - currentModel.age) <= 5) score += 2;
      const sharedTags = m.tags.filter((t) => currentModel.tags.includes(t)).length;
      score += sharedTags;
      if (m.platform === currentModel.platform) score += 1;
      return { model: m, score };
    });

    scored.sort((a, b) => b.score - a.score);

    // Take top 30, then shuffle for variety
    return shuffleArray(scored.slice(0, 30).map((s) => s.model)).slice(0, 12);
  }, [cam4, cb, bonga, strip, currentModel]);

  if (similar.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="section-title">Vergelijkbare Webcams</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {similar.map((m) => (
          <CamCard key={m.id} model={m} />
        ))}
      </div>
    </section>
  );
};

export default SimilarCams;
