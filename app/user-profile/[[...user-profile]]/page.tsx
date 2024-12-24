import { UserProfile } from '@clerk/nextjs';

export default function UserProfilePage() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <UserProfile path="/user-profile" />
    </div>
  );
}
