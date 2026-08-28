import { useMemo } from "react";
import { useCam4Online } from "@/hooks/useCam4";
import { useChaturbateOnline } from "@/hooks/useChaturbate";
import { useBongaCamsOnline } from "@/hooks/useBongaCams";
import { useStripchatOnline } from "@/hooks/useStripchat";
import { useJerkmateOnline } from "@/hooks/useJerkmate";
import { useFlirt4FreeOnline } from "@/hooks/useFlirt4Free";
import { useXCamsOnline } from "@/hooks/useXCams";
import type { CamModel } from "@/types/cam";

export function useMaleCams(enabled = true) {
  const { data: cam4 = [], isLoading: l1 } = useCam4Online({ gender: "male", limit: 150 }, enabled);
  const { data: cb = [], isLoading: l2 } = useChaturbateOnline({ gender: "m", limit: 150 }, enabled);
  const { data: bonga = [], isLoading: l3 } = useBongaCamsOnline({ section: "gay", limit: 150 }, enabled);
  const { data: strip = [], isLoading: l4 } = useStripchatOnline({ tag: "men", limit: 150 }, enabled);
  const { data: jm = [], isLoading: l5 } = useJerkmateOnline({ gender: "m", live: true, size: 150 }, enabled);
  const { data: f4f = [], isLoading: l6 } = useFlirt4FreeOnline({ service: "guys" }, enabled);
  const { data: xcams = [], isLoading: l7 } = useXCamsOnline({ gender: "M", limit: 50 }, enabled);

  const isLoading = enabled && (l1 || l2 || l3 || l4 || l5 || l6 || l7);

  const maleCams: CamModel[] = useMemo(() => {
    if (!enabled) return [];
    const all = [...cam4, ...cb, ...bonga, ...strip, ...jm, ...f4f, ...xcams];
    const seen = new Set<string>();
    return all.filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
  }, [enabled, cam4, cb, bonga, strip, jm, f4f, xcams]);

  return { maleCams, isLoading };
}
