import { SignIn } from '@stackframe/stack';

export default function SignInPage() {
  return (
    <SignIn
      fullPage={true}
      automaticRedirect={true}
      extraInfo={
        <>
          When signing in, you agree to our <a href="/terms">Terms of Service</a>
        </>
      }
    />
  );
}
