import { SignUp } from '@stackframe/stack';

export default function SignUpPage() {
  return (
    <SignUp
      fullPage={true}
      automaticRedirect={true}
      extraInfo={
        <>
          When signing up, you agree to our <a href="/terms">Terms</a>
        </>
      }
    />
  );
}
