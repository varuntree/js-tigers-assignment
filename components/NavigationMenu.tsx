"use client"
import Link from "next/link"
import { ModeToggle } from "./ui/ModeToggle"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function NavigationMenuNav(){
  const router = useRouter()
  const path = usePathname()
    return (
      <div className="flex flex-row justify-between border-b items-center p-5">
        <div>
        <Link href={"/vendors"}>
          <div className="dark:text-zinc-100 text-zinc-950 text-2xl font-semibold">VENDOR MANAGEMENT - JS TIGERS</div>
        </Link>
        </div>
        <div className="flex flex-row items-center gap-5">
          <Button onClick={()=>{signOut(); router.push("/")}} > Logout </Button>
         {path=="/vendors" &&  <Button asChild>
              <Link href="/newvendor">Add Vendor</Link>
          </Button>}
          <ModeToggle></ModeToggle>
        </div>
      </div>
    )
}
