import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { ethers, JsonRpcSigner, BrowserProvider } from "ethers"
import { morphHolesky } from "wagmi/chains"

import Wisd from "@/components/abis/WisdOnChain.json"
import { CourseProps, ExpertProps } from "@/components/abis/types/generalTypes"
import { WisdOnChain } from "@/components/abis/types/WisdOnChain"
import useContract from "@/hooks/useContract"
import { CONTRACT_ADDRESSES } from "@/lib/constants"
import { upload, viewIPFSContent } from "@/lib/utils"

import { useAppContext } from "./appContext"
import { useRouter } from "next/router"

type WisdProviderProps = {
  children: ReactNode
}

type WisdContextType = {
  contract: ethers.Contract | null
  getUsers: () => Promise<WisdOnChain.UserStruct[] | undefined>
  addUser: (content: string, userRole: number) => Promise<void>
  addCourse: (content: CourseProps) => Promise<void>
  updateUser: (content: string) => Promise<void>
  updateCourse: (
    courseId: number,
    name: string,
    content: string,
  ) => Promise<void>
  getUser: (userId: number) => Promise<WisdOnChain.UserStruct | undefined>
  getMyUser: () => Promise<WisdOnChain.UserStruct | undefined>
  getCourse: (courseId: number) => Promise<WisdOnChain.CourseStruct | undefined>
  getCourses: () => Promise<WisdOnChain.CourseStruct[] | undefined>
  getAddress: () => Promise<string | undefined>
  getBalance: () => Promise<string | undefined>
  userChatAddress: string | undefined
  setUserChatAddress: Dispatch<SetStateAction<string | undefined>>
  isRegistered: boolean
  myData: any
}

export const WisdContext = createContext<WisdContextType | null>(null)

const WisdProvider = ({ children }: WisdProviderProps) => {
  const router = useRouter()
  const chainId = morphHolesky.id
  const { coreKitInstance, evmProvider, signer, isLoggedIn, user } =
    useAppContext()
  const [provider, setProvider] = useState<ethers.BrowserProvider>()
  const [userChatAddress, setUserChatAddress] = useState<string | undefined>()
  const [myData, setMyData] = useState()
  const [isRegistered, setIsRegistered] = useState(false)

  const { contract, address } = useContract({
    contractAddress: CONTRACT_ADDRESSES[chainId],
    ABI: Wisd.abi,
  })

  useEffect(() => {
    if (!evmProvider) return

    const ethersProvider = new ethers.BrowserProvider(evmProvider)
    setProvider(ethersProvider)
  }, [evmProvider])

  const checkUserData = async (): Promise<
    WisdOnChain.UserStruct | undefined
  > => {
    const userTmp = await getMyUser()
    console.log("cheking user", userTmp)

    if (userTmp != undefined && userTmp?.id !== 0) {
      const userData = await viewIPFSContent(userTmp.content)
      setMyData(userData)
      setIsRegistered(true)
      // router.push("/")
    }

    return userTmp
  }

  useEffect(() => {
    const checkUser = async () => {
      if (!contract) return

      if (myData) return

      const userTmp = await checkUserData()

      if (!isLoggedIn) return

      if (userTmp == undefined || userTmp?.id === 0) router.push("/register")
    }

    if (!coreKitInstance || !contract) return
    if (!isLoggedIn) router.push("/")

    checkUser()
  }, [isLoggedIn, user, contract, coreKitInstance])

  const addUser = async (content: string, userRole: number): Promise<void> => {
    if (!contract) return

    try {
      await fetch("/api/initialFund", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: address }),
      })
    } catch (error) {
      console.log("error??? :>> ", error)
    }

    try {
      const tx = await contract.addUser(content, userRole)
      await tx.wait()
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const addCourse = async (course: CourseProps): Promise<void> => {
    if (!contract) return

    try {
      const myData = await contract.getMyUser()
      const cont = (await viewIPFSContent(myData.content)) as ExpertProps
      console.log("cont :>> ", cont)
      const myCourses = cont.courses as CourseProps[]
      myCourses.push(course)
      const newData = {
        ...cont,
        myCourses,
      }
      console.log("newData :>> ", newData)
      // const cid = await upload(JSON.stringify({ ...newData }))

      // const tx = await contract.updateUser(cid)
      // await tx.wait()
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const updateUser = async (content: string): Promise<void> => {
    if (!contract) return

    try {
      // const myData = await contract.getMyUser()
      // const cont = (await viewIPFSContent(myData.content)) as ConsumerProps
      // console.log("cont :>> ", cont)
      // console.log("myData :>> ", myData.id)
      // const newData = {
      //   id: myData.id.toString(),
      //   ...cont,
      //   ...preferences,
      // }
      // console.log("newData :>> ", newData)
      // const cid = await upload(JSON.stringify({ ...newData }))

      const tx = await contract.updateUser(content)
      await tx.wait()
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const updateCourse = async (
    courseId: number,
    name: string,
    content: string,
  ): Promise<void> => {
    if (!contract) return

    try {
      const tx = await contract.updateCourse(courseId, name, content)
      await tx.wait()
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const getUsers = async (): Promise<WisdOnChain.UserStruct[] | undefined> => {
    if (!contract) return

    return await contract.getUsers()
  }

  const getUser = async (
    userId: number,
  ): Promise<WisdOnChain.UserStruct | undefined> => {
    if (!contract) return

    try {
      const user = await contract.getUser(userId)
      if (!user) return

      user.content = viewIPFSContent(user.content)

      return user
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const getMyUser = async (): Promise<WisdOnChain.UserStruct | undefined> => {
    if (!contract) return

    try {
      const user = await contract.getMyUser()
      if (!user) return

      return user
    } catch (error) {
      // console.log("error :>> ", error)
    }

    return
  }

  const getCourse = async (
    courseId: number,
  ): Promise<WisdOnChain.CourseStruct | undefined> => {
    if (!contract) return

    try {
      const course = await contract.getCourse(courseId)
      if (!course) return

      course.content = viewIPFSContent(course.content)

      return course
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const getCourses = async (): Promise<
    WisdOnChain.CourseStruct[] | undefined
  > => {
    if (!contract) return

    try {
      const courses = await contract.getCourses()
      return courses
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const getAddress = async (): Promise<string | undefined> => {
    if (!coreKitInstance) return

    try {
      const address = await signer?.getAddress()
      console.log("address :>> ", address)
      return address ?? ""
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const getBalance = async (): Promise<string | undefined> => {
    if (!coreKitInstance || !provider) return

    try {
      const address = await signer?.getAddress()

      if (!address) return

      const balance = ethers.formatEther(
        await provider.getBalance(address), // Balance is in wei
      )

      return balance
    } catch (error) {}
  }

  return (
    <WisdContext.Provider
      value={{
        addUser,
        addCourse,
        contract,
        getCourse,
        getCourses,
        getMyUser,
        getUser,
        getUsers,
        updateUser,
        updateCourse,
        getAddress,
        getBalance,
        userChatAddress,
        setUserChatAddress,
        isRegistered,
        myData,
      }}
    >
      {children}
    </WisdContext.Provider>
  )
}

export default WisdProvider
export const useWisdContext = () => useContext(WisdContext) as WisdContextType
