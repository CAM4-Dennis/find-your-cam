import { useMemo } from "react";
import { useCam4Online } from "@/hooks/useCam4";
import { useChaturbateOnline } from "@/hooks/useChaturbate";
import { useBongaCamsOnline } from "@/hooks/useBongaCams";
import { useStripchatOnline } from "@/hooks/useStripchat";
import { useJerkmateOnline } from "@/hooks/useJerkmate";
import { useFlirt4FreeOnline } from "@/hooks/useFlirt4Free";
import { useXCamsOnline } from "@/hooks/useXCams";
import type { CamModel } from "@/types/cam";

export function useTransCams(enabled = true) {
  const { data: cam4 = [], isLoading: l1 } = useCam4Online({ gender: "shemale", limit: 150 }, enabled);
  const { data: cb = [], isLoading: l2 } = useChaturbateOnline({ gender: "t", limit: 150 }, enabled);
  const { data: bonga = [], isLoading: l3 } = useBongaCamsOnline({ section: "transsexual", limit: 150 }, enabled);
  const { data: strip = [], isLoading: l4 } = useStripchatOnline({ tag: "trans", limit: 150 }, enabled);
  const { data: jm = [], isLoading: l5 } = useJerkmateOnline({ gender: "t", live: true, size: 150 }, enabled);
  const { data: f4f = [], isLoading: l6 } = useFlirt4FreeOnline({ service: "trans" }, enabled);
  const { data: xcams = [], isLoading: l7 } = useXCamsOnline({ gender: "S", limit: 50 }, enabled);

  const isLoading = enabled && (l1 || l2 || l3 || l4 || l5 || l6 || l7);

  const transCams: CamModel[] = useMemo(() => {
    if (!enabled) return [];
    const all = [...cam4, ...cb, ...bonga, ...strip, ...jm, ...f4f, ...xcams];
    const seen = new Set<string>();
    return all.filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
  }, [enabled, cam4, cb, bonga, strip, jm, f4f, xcams]);

  return { transCams, isLoading };
}
