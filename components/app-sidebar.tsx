'use client';

import * as React from 'react';
import { Home, Settings2, Users, ShoppingBag, BarChart4, BadgePercent } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { useUser } from '@stackframe/stack';
import { useParams } from 'next/navigation';
import { NavProjects } from './nav-projects';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams<{ teamId: string }>();
  const user = useUser({ or: 'redirect' });
  const team = user.useTeam(params.teamId);

  const navItems = {
    navMain: [
      {
        title: 'Overview',
        url: `/dashboard/${team?.id}`,
        icon: Home,
        isActive: true,
      },
      {
        title: 'Reveals',
        url: `/dashboard/${team?.id}/reveals`,
        icon: ShoppingBag,
      },
      {
        title: 'People',
        url: `/dashboard/${team?.id}/people`,
        icon: Users,
      },
      {
        title: 'Stats',
        url: `/dashboard/${team?.id}/stats`,
        icon: BarChart4,
      },
    ],
    projects: [
      {
        name: 'Discounts',
        url: `/dashboard/${team?.id}/discounts`,
        icon: BadgePercent,
      },
      {
        name: 'Settings',
        url: `/settings/profile`,
        icon: Settings2,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
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
