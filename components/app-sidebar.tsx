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
import { NotebookText } from "lucide-react"

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400'],
})

const data = {
  navMain: [
    {
      title: 'Recipes',
      url: '/recipes',
      icon: NotebookText,
    },
  ],
}

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
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className='font-medium'>
                      <Icon className='size-5' /> {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}