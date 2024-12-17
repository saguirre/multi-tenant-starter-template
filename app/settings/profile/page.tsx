import { ProfilePageClient } from '@/components/profile-page-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Settings',
  description: 'Manage your profile settings',
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}
