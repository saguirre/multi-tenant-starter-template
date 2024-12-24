'use client';

import * as React from 'react';
import { Home, Settings2, Users, ShoppingBag, BarChart4, BadgePercent } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { NavProjects } from './nav-projects';
import { useUser } from '@clerk/nextjs';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const navItems = {
    navMain: [
      {
        title: 'Overview',
        url: `/dashboard/${user?.id}`,
        icon: Home,
        isActive: true,
      },
      {
        title: 'Reveals',
        url: `/dashboard/${user?.id}/reveals`,
        icon: ShoppingBag,
      },
      {
        title: 'People',
        url: `/dashboard/${user?.id}/people`,
        icon: Users,
      },
      {
        title: 'Stats',
        url: `/dashboard/${user?.id}/stats`,
        icon: BarChart4,
      },
    ],
    projects: [
      {
        name: 'Discounts',
        url: `/dashboard/${user?.id}/discounts`,
        icon: BadgePercent,
      },
      {
        name: 'Settings',
        url: `/user-profile`,
        icon: Settings2,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems.navMain} />
        <NavProjects projects={navItems.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
