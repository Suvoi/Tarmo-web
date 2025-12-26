import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Lexend } from 'next/font/google'
import Link from "next/link"
import Image from 'next/image'

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400'],
})

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <div className='flex aspect-square items-center justify-center rounded-lg'>
                  <Image src='/tarmo.png' alt='' width='34' height='34' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className={`text-3xl font-bold ${lexend.className}`}>TARMO</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}