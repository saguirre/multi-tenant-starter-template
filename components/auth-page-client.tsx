'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@stackframe/stack';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AuthPageClient() {
  const user = useUser({ or: 'redirect' });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Emails & Auth</h2>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Emails</CardTitle>
                <CardDescription>Manage your email addresses</CardDescription>
              </div>
              <Button variant="outline">Add an email</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex bg-secondary px-4 rounded-lg items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  {user.primaryEmail}
                  <Badge variant="default">Primary</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Set a password for your account</CardDescription>
          </CardHeader>
          <CardContent>
            {user.hasPassword ? (
              <Button variant="outline">Change password</Button>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">To set a password, please add a sign-in email.</span>
                <Button variant="outline">Set password</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OTP sign-in</CardTitle>
            <CardDescription>Enable sign-in via magic link or OTP sent to your sign-in emails.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                To enable OTP sign-in, please add a verified sign-in email.
              </span>
              <Button variant="outline">Enable OTP</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
