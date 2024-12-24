import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <SignUp />
    </div>
  );
}
