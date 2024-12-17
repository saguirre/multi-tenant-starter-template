'use client';

import * as React from 'react';
import { Mail, User, Settings, Building2 } from 'lucide-react';
import { useUser } from '@stackframe/stack';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

export function SettingsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser({ or: 'redirect' });
  const teams = user.useTeams();
  const pathname = usePathname();

  const accountItems = [
    {
      name: 'Profile',
      url: '/settings/profile',
      icon: User,
    },
    {
      name: 'Email & Auth',
      url: '/settings/auth',
      icon: Mail,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account Settings</SidebarGroupLabel>
          <SidebarMenu>
            {accountItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <Link href={item.url} passHref legacyBehavior>
                  <SidebarMenuButton tooltip={item.name}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Teams</SidebarGroupLabel>
          <SidebarMenu>
            {teams.map((team) => (
              <SidebarMenuItem key={team.id}>
                <Link href={`/dashboard/${team.id}`} passHref legacyBehavior>
                  <SidebarMenuButton tooltip={team.displayName}>
                    <Building2 />
                    <span>{team.displayName}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
