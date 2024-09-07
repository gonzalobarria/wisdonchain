import { CourseProps } from "@/components/abis/types/generalTypes"
import CouseRegisterForm from "@/components/web/courseRegisterForm"
import { useWisdContext } from "@/components/web3/context/wisdContext"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Couse = () => {
  const router = useRouter()
  const { addCourse, getCourses, contract } = useWisdContext()

  useEffect(() => {
    const asyncFunc = async () => {
      if (!contract) return

      const cc = await getCourses()
      cc?.map((c) => console.log(c.id))
    }
    asyncFunc()
  }, [contract])

  const saveData = async (course: CourseProps) => {
    await addCourse(course)
    router.push("/")
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 max-w-4xl mx-auto bg-background m-8 shadow-lg rounded-lg gap-y-5">
      <h1 className="text-2xl font-semibold">New Course</h1>
      <CouseRegisterForm save={saveData} />
    </div>
  )
}

export default Couse
