import { CourseRecommended } from "@/components/abis/types/generalTypes"
import { create } from "zustand"

type MatchCoursesState = {
  matchCourses: CourseRecommended[]
  updateMatchCourses: (newCourses: CourseRecommended[]) => void
}

const useMatchCoursesStore = create<MatchCoursesState>((set) => ({
  matchCourses: [],
  updateMatchCourses: (newCourses: CourseRecommended[]) =>
    set(() => ({
      matchCourses: [...newCourses],
    })),
}))

export default useMatchCoursesStore
