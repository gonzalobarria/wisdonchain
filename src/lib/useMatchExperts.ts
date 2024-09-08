import { ExpertRecommended } from "@/components/abis/types/generalTypes"
import { create } from "zustand"

type MatchExpertState = {
  matchExperts: ExpertRecommended[]
  updateMatchExperts: (newExperts: ExpertRecommended[]) => void
}

const useMatchExpertStore = create<MatchExpertState>((set) => ({
  matchExperts: [],
  updateMatchExperts: (newExperts: ExpertRecommended[]) =>
    set(() => ({
      matchExperts: [...newExperts],
    })),
}))

export default useMatchExpertStore
