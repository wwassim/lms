"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacher = pathname?.startsWith("/teacher")
    const isPlayer = pathname?.includes("/chapter")
  return (
    <div className="flex gap-x-2 ml-auto">
        {isTeacher || isPlayer ?(
            <Link href="/"><Button size="sm" variant="ghost">Exit</Button></Link>
        ):(
            <Link href="/teacher/courses"><Button size="sm" variant="ghost">Teacher Mode</Button></Link>
        )}
        <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default NavbarRoutes