import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <SignIn />
    </div>
  );
}
