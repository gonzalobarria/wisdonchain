import { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertDialogWisd } from "@/components/web/general/alertDialogWisd"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"
import User from "./user"
import { useAppContext } from "@/components/web3/context/appContext"

const params = ["profile", "security"]

const AdvancedSecurity = () => {
  const { isMFAEnabled, enableMFA, isLoggedIn } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showWarning, setShowWarning] = useState(false)
  const [mfaEnabled, setMFAEnabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [factorKey, setFactorKey] = useState("")

  const validateMFAGeneration = async () => {
    const fk = await enableMFA()

    setFactorKey(fk!)
    setMFAEnabled(true)
  }

  useEffect(() => {
    const asyncFunc = async () => {
      if (!isLoggedIn) return

      const isEnabled = await isMFAEnabled()

      setMFAEnabled(isEnabled)
      setIsLoaded(true)
    }

    asyncFunc()
  }, [isLoggedIn, isMFAEnabled])

  const [isProfile, setIsProfile] = useState(false)
  const [isSecurity, setIsSecurity] = useState(false)

  useEffect(() => {
    if (
      searchParams.get("section") == undefined ||
      !params.includes(searchParams.get("section") ?? "")
    ) {
      router.push("/")
      return
    }
    const section = searchParams.get("section") as string
    setIsProfile(section === "profile")
    setIsSecurity(section === "security")
  }, [searchParams, router])

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 mb-16">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link
            href={isProfile ? "#" : "/app/settings?section=profile"}
            className={cn(isProfile && "font-semibold text-primary")}
          >
            Profile
          </Link>
          <Link
            href={isSecurity ? "#" : "/app/settings?section=security"}
            className={cn(isSecurity && "font-semibold text-primary")}
          >
            Security
          </Link>
        </nav>
        <div className="grid gap-6">
          {isSecurity && (
            <Card>
              <CardHeader>
                <CardTitle>Enable Two-Factor Authentication</CardTitle>
                <CardDescription>
                  This is an advanced feature to get access to your account. You
                  will need to access login always with this generated Factor
                  Key
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mfaEnabled ? (
                  <div className="flex flex-col justify-between gap-y-4">
                    <h3 className="font-semibold text-xl text-center">
                      Two-Fact Authentication Enabled
                    </h3>
                    {factorKey && (
                      <>
                        <h3 className=" text-lg text-center">
                          Save this Factor Key to login in a safe place
                        </h3>
                        <span className="text-center font-bold">
                          This will not be showed later
                        </span>
                        <span className="text-center">
                          {
                            "e615628a51c6b9702e2f9f3d7d576c5fcd084289df65d2722a82f8eb8250b7f5"
                          }
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <h2>
                    necesitamos un texto enseñandoles qué es y para qué se usa
                  </h2>
                )}
              </CardContent>
              {!mfaEnabled && (
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => setShowWarning(true)}>
                    Generate Factor Key Authentication
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}
          {isProfile && <User />}
        </div>
      </div>
      <AlertDialogWisd
        title="Are your sure you want to enable 2-Factor Athentication"
        description="It's also for your own safe"
        onContinue={validateMFAGeneration}
        open={showWarning}
        setOpen={setShowWarning}
      />
    </div>
  )
}

export default AdvancedSecurity
