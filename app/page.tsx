"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DivideSquare } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function DemoCreateAccount() {

  const {data, status} = useSession()
  const router = useRouter()

  useEffect(()=>{
    if(status == "authenticated"){
      router.push("/vendors")
    }
  },[status])

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen w-full">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

if(status=="unauthenticated"){
  return (
    <div className="grid grid-cols-2">
        <div className="h-full w-full bg-zinc-900 flex justify-center items-center">
              <p className=" text-lg text-white p-5">
              &rdquo;Manage the vendors with EASE and SIMPLE that you have never seen!&rdquo;
              </p>
        </div>
        <div className="flex justify-center items-center h-screen">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Get In</CardTitle>
              <CardDescription>
                Signin or Signup with Google Account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Button variant="outline" onClick={()=>signIn("google")}>
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
            </CardContent>
           </Card>
        </div>
    </div>
  )
}
}
