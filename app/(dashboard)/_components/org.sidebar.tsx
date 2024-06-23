"use client";

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { LayoutDashboard, Star } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

type Props = {}

const OrgSidebar = (props: Props) => {
  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'>
        <Link href="/">
          <div className="flex items-center gap-x-2">
            <Image
              src={`/logo.svg`}
              alt="logo"
              height={60}
              width={60}
            />

            <span className={cn(
              "font-semibold text-2xl",
              font.className
            )}>Board</span>
          </div>
        </Link>

        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                background: "#FFF"
              }
            }
          }}
        />

        <div className="space-y-1 w-full">
          <OrgButton href={"/"} label={"Team Boards"} Icon={LayoutDashboard} />
          <OrgButton
            label={"Favoraite Boards"}
            Icon={Star}
            querySlug={"favoraites"}
            href={{
              pathname: "/",
              query: { favoraites: true }
            }}
          />
        </div>
    </div>
  )
}

export default OrgSidebar

type buttonProps = {
  label: string
  Icon: typeof LayoutDashboard,
  href: object | string
  querySlug?: string
}

const OrgButton = ({label, Icon, href, querySlug}: buttonProps) => {
  const searchParams = useSearchParams()
  const isMatch = querySlug ? searchParams.get(querySlug) : "";

  return(
    <Button className='w-full justify-start px-2' asChild size={"lg"} variant={isMatch ? "secondary" : "ghost"}>
        <Link href={href}>
          <Icon className='h-4 w-4 mr-2' />
          {label}
        </Link>
      </Button>
  )
}