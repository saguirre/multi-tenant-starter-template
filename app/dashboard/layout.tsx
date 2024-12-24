'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useParams, usePathname } from 'next/navigation';

function useSegment(basePath: string) {
  const path = usePathname();
  const result = path.slice(basePath.length, path.length);
  return result ? result : '/';
}

export default function Layout(props: { children: React.ReactNode }) {
  const params = useParams<{ teamId: string }>();
  const segment = useSegment(`/dashboard/${params.teamId}`);

  // Get the current page name from the segment
  const segments = segment.split('/').filter(Boolean);
  const currentPage = segments[segments.length - 1] || 'Overview'; // Default to 'Overview' if no segment

  const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={`/dashboard`}>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{props.children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
