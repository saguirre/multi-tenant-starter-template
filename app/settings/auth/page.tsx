import { AuthPageClient } from '@/components/auth-page-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email & Authentication',
  description: 'Manage your email and authentication settings',
};

export default function AuthPage() {
  return <AuthPageClient />;
}
