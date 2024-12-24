import { FeatureGrid } from '@/components/features';
import { Hero } from '@/components/hero';
import { PricingGrid } from '@/components/pricing';
import { ReviewsSection } from '@/components/reviews';
import { TemplateOverview } from '@/components/template-overview';
import BlurFade from '@/components/ui/blur-fade';
import { stackServerApp } from '@/stack';
import { Wand2, Palette, Lock, Users, Gamepad2, Settings } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function IndexPage() {
  const project = await stackServerApp.getProject();
  const session = await stackServerApp.getUser();

  if (session) {
    const team = session.selectedTeam;
    redirect(`/dashboard/${team?.id}`);
  }

  return (
    <>
      <Hero
        capsuleText="100+ 5 Star Reviews"
        capsuleLink="https://stacktemplate.com"
        title="Build your dream Gender Reveal"
        subtitle="Built for expecting parents, by expecting parents."
        primaryCtaText="Get Started"
        primaryCtaLink={stackServerApp.urls.signUp}
        secondaryCtaText="GitHub"
        secondaryCtaLink="https://github.com/stack-auth/stack-template"
        credits={
          <>
            Crafted with ❤️ by{' '}
            <a href="https://stack-auth.com" target="_blank" rel="noreferrer" className="underline">
              AI Lime
            </a>
          </>
        }
      />
      <div id="templates" />
      <section className="container space-y-6 pb-8 md:pb-12 lg:pb-24">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <BlurFade delay={0.25} inView>
            <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold">Templates</h2>
              <p className="max-w-[100%] text-muted-foreground sm:text-lg">Check out our pre-built reveals</p>
            </div>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <TemplateOverview />
          </BlurFade>
        </div>
      </section>
      <div id="features" />
      <FeatureGrid
        title="Features"
        subtitle="Unlock powerful capabilities for your project."
        items={[
          {
            icon: <Wand2 className="h-12 w-12" />,
            title: 'Easy Builder',
            description: 'Create your perfect gender reveal experience in minutes with our drag-and-drop interface.',
          },
          {
            icon: <Palette className="h-12 w-12" />,
            title: 'Beautiful Designs',
            description: 'Choose from dozens of stunning themes and animations for your reveal moment.',
          },
          {
            icon: <Lock className="h-6 w-6" />,
            title: 'Private & Secure',
            description: 'Keep your surprise safe with password protection and controlled access.',
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: 'Share with Family',
            description: 'Invite friends and family to participate in your special moment.',
          },
          {
            icon: <Gamepad2 className="h-12 w-12" />,
            title: 'Multiple Games',
            description: 'Choose from puzzles, riddles, countdown timers, and interactive games.',
          },
          {
            icon: <Settings className="h-12 w-12" />,
            title: 'Customizable',
            description: 'Personalize every aspect of your reveal, from colors to music to special effects.',
          },
        ]}
      />

      <div id="pricing" />
      <PricingGrid
        title="Pricing"
        subtitle="Flexible plans for every team."
        items={[
          {
            title: 'Basic',
            price: 'Free',
            description: 'Perfect for simple reveals',
            features: [
              '1 reveal game or puzzle',
              'Basic themes',
              'Share with up to 20 guests',
              '24-hour access',
              'Mobile friendly',
            ],
            buttonText: 'Get Started',
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: 'Pro',
            price: '$19.99',
            description: 'For the ultimate reveal experience',
            features: [
              '5 reveal games or puzzles',
              'Premium themes & effects',
              'Unlimited guests',
              '30-day access',
              'Custom music & animations',
            ],
            buttonText: 'Upgrade to Pro',
            isPopular: true,
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: 'Party Pack',
            price: '$39.99',
            description: 'For multiple reveals or events',
            features: [
              'All games and puzzles',
              'Exclusive VIP themes',
              'Unlimited guests',
              '90-day access',
              'Priority support',
            ],
            buttonText: 'Contact Us',
            buttonHref: stackServerApp.urls.signUp,
          },
        ]}
      />
      <div id="reviews" />

      <ReviewsSection />
    </>
  );
}
