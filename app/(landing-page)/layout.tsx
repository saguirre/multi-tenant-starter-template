import { Footer } from '@/components/footer';
import { LandingPageHeader } from '@/components/landing-page-header';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingPageHeader
        items={[
          { title: 'Home', href: '/' },
          { title: 'Features', href: '/#features' },
          { title: 'Pricing', href: '/#pricing' },
          { title: 'Github', href: 'https://github.com/saguirre/reveal', external: true },
        ]}
      />
      <main className="flex-1">{props.children}</main>
      <Footer
        builtBy="AI Lime"
        builtByLink="https://github.com/saguirre/reveal/"
        githubLink="https://github.com/saguirre/reveal"
        twitterLink="https://twitter.com/saguirre/reveal"
        linkedinLink="linkedin.com/company/saguirre/reveal"
      />
    </div>
  );
}
