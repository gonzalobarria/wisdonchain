import Center from "./center"
import Feed from "./feed"
import Right from "./right"

const MainSocial = () => {
  return (

    <div className="grid md:grid-cols-7 gap-x-10">
      <Feed className="md:col-span-2" />
      <Center className="md:col-span-3" />
      <Right className="md:col-span-2" />
    </div>
  )
}

export default MainSocial
