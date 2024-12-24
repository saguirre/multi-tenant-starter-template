'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

function useSegment(basePath: string) {
  const path = usePathname();
  const result = path.slice(basePath.length, path.length);
  return result ? result : '/';
}

export function AccountHeader() {
  const segment = useSegment('/account');

  // Get the current page name from the segment
  const segments = segment.split('/').filter(Boolean);
  const currentPage = segments[segments.length - 1] || 'Profile';

  const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <header className="fixed w-full z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/account">Account</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
