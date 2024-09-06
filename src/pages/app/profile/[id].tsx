import { useRouter } from "next/router"

const Profile = () => {
  const router = useRouter()
  return <p>Post: {router.query.id}</p>

  // return <></>
}

export default Profile
