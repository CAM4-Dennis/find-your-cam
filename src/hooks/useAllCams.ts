import { useMemo } from "react";
import { useCam4Online } from "@/hooks/useCam4";
import { useChaturbateOnline } from "@/hooks/useChaturbate";
import { useBongaCamsOnline } from "@/hooks/useBongaCams";
import { useStripchatOnline } from "@/hooks/useStripchat";
import { useXCamsOnline } from "@/hooks/useXCams";
import { useJerkmateOnline } from "@/hooks/useJerkmate";
import { useFlirt4FreeOnline } from "@/hooks/useFlirt4Free";
import type { CamModel } from "@/types/cam";

export function useAllCams() {
  const { data: cam4Female = [], isLoading: l1 } = useCam4Online({ gender: "female", limit: 150 });
  const { data: cbFemale = [], isLoading: l2 } = useChaturbateOnline({ gender: "f", limit: 150 });
  const { data: bongaFemale = [], isLoading: l3 } = useBongaCamsOnline({ section: "straight", limit: 150 });
  const { data: stripFemale = [], isLoading: l4 } = useStripchatOnline({ tag: "girls", limit: 150 });
  const { data: xcamsFemale = [], isLoading: l9 } = useXCamsOnline({ gender: "F", limit: 50 });
  const { data: coupleCams4 = [], isLoading: l5 } = useCam4Online({ gender: "couple", limit: 150 });
  const { data: coupleCamsCB = [], isLoading: l6 } = useChaturbateOnline({ gender: "c", limit: 150 });
  const { data: coupleBonga = [], isLoading: l7 } = useBongaCamsOnline({ section: "couples", limit: 150 });
  const { data: stripCouples = [], isLoading: l8 } = useStripchatOnline({ tag: "couples", limit: 150 });
  const { data: jerkmateFemale = [], isLoading: l10 } = useJerkmateOnline({ gender: "f", live: true, size: 150 });
  const { data: jerkmateCouples = [], isLoading: l11 } = useJerkmateOnline({ gender: "c", live: true, size: 150 });
  const { data: f4fFemale = [], isLoading: l12 } = useFlirt4FreeOnline({ service: "girls" });
  const { data: f4fTrans = [], isLoading: l13 } = useFlirt4FreeOnline({ service: "trans" });

  const isLoading = l1 || l2 || l3 || l4 || l5 || l6 || l7 || l8 || l9 || l10 || l11 || l12 || l13;

  const allCams = useMemo(() => {
    const all = [
      ...cam4Female, ...cbFemale, ...bongaFemale, ...stripFemale, ...xcamsFemale,
      ...coupleCams4, ...coupleCamsCB, ...coupleBonga, ...stripCouples,
      ...jerkmateFemale, ...jerkmateCouples,
      ...f4fFemale, ...f4fTrans,
    ];
    // Deduplicate by id
    const seen = new Set<string>();
    return all.filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
  }, [cam4Female, cbFemale, bongaFemale, stripFemale, xcamsFemale, coupleCams4, coupleCamsCB, coupleBonga, stripCouples, jerkmateFemale, jerkmateCouples, f4fFemale, f4fTrans]);

  return { allCams, isLoading };
}
