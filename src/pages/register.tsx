import UserRegisterForm from "@/components/web/userRegisterForm"

const Register = () => {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-8 max-w-4xl mx-auto bg-background m-8 shadow-lg rounded-lg gap-y-5">
      <div className="text-center">
        <h1 className="text-2xl font-semibold underline">
          Let's Get Started with your Profile!
        </h1>
        <span className="text-sm">Texto para guiar al usuario</span>
      </div>
      <UserRegisterForm />
    </div>
  )
}

export default Register
