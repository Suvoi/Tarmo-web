'use client';

import * as React from 'react';
import { BookText } from 'lucide-react';
import { Lexend } from 'next/font/google';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400'],
});

const data = {
  navMain: [
    {
      title: 'Recipes',
      url: '/recipes',
      icon: BookText,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar variant='sidebar' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <div className='flex aspect-square size-9 items-center justify-center rounded-lg'>
                  <img src='/tarmo.png' alt='' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className={`text-3xl font-bold ${lexend.className}`}>
                    TARMO
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {data.navMain.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.url);
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.url} className='font-medium'>
                      <Icon className='size-5' /> {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
