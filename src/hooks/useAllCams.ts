import { useMemo } from "react";
import { useCam4Online } from "@/hooks/useCam4";
import { useChaturbateOnline } from "@/hooks/useChaturbate";
import { useBongaCamsOnline } from "@/hooks/useBongaCams";
import { useStripchatOnline } from "@/hooks/useStripchat";
import type { CamModel } from "@/types/cam";

export function useAllCams() {
  const { data: cam4Female = [], isLoading: l1 } = useCam4Online({ gender: "female", limit: 150 });
  const { data: cbFemale = [], isLoading: l2 } = useChaturbateOnline({ gender: "f", limit: 150 });
  const { data: bongaFemale = [], isLoading: l3 } = useBongaCamsOnline({ section: "straight", limit: 150 });
  const { data: stripFemale = [], isLoading: l4 } = useStripchatOnline({ tag: "girls", limit: 150 });
  const { data: coupleCams4 = [], isLoading: l5 } = useCam4Online({ gender: "couple", limit: 150 });
  const { data: coupleCamsCB = [], isLoading: l6 } = useChaturbateOnline({ gender: "c", limit: 150 });
  const { data: coupleBonga = [], isLoading: l7 } = useBongaCamsOnline({ section: "couples", limit: 150 });
  const { data: stripCouples = [], isLoading: l8 } = useStripchatOnline({ tag: "couples", limit: 150 });

  const isLoading = l1 || l2 || l3 || l4 || l5 || l6 || l7 || l8;

  const allCams = useMemo(() => {
    const all = [
      ...cam4Female, ...cbFemale, ...bongaFemale, ...stripFemale,
      ...coupleCams4, ...coupleCamsCB, ...coupleBonga, ...stripCouples,
    ];
    // Deduplicate by id
    const seen = new Set<string>();
    return all.filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
  }, [cam4Female, cbFemale, bongaFemale, stripFemale, coupleCams4, coupleCamsCB, coupleBonga, stripCouples]);

  return { allCams, isLoading };
}
