import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { PricingGrid } from "@/components/pricing";
import { stackServerApp } from "@/stack";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { 
  Wand2, 
  Palette, 
  Lock, 
  Users, 
  Gamepad2, 
  Settings 
} from "lucide-react";

export default async function IndexPage() {
  const project = await stackServerApp.getProject();
  if (!project.config.clientTeamCreationEnabled) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center">
        <div className="max-w-xl gap-4">
          <p className="font-bold text-xl">Setup Required</p>
          <p className="">
            {
              "To start using this project, please enable client-side team creation in the Stack Auth dashboard (Project > Team Settings). This message will disappear once the feature is enabled."
            }
          </p>
        </div>
      </div>
    );
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
            Crafted with ❤️ by{" "}
            <a
              href="https://stack-auth.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              AI Lime
            </a>
          </>
        }
      />

      <div id="features" />
      <FeatureGrid
        title="Features"
        subtitle="Unlock powerful capabilities for your project."
        items={[
          {
            icon: <Wand2 className="h-12 w-12" />,
            title: "Easy Builder",
            description: "Create your perfect gender reveal experience in minutes with our drag-and-drop interface.",
          },
          {
            icon: <Palette className="h-12 w-12" />,
            title: "Beautiful Designs",
            description: "Choose from dozens of stunning themes and animations for your reveal moment.",
          },
          {
            icon: <Lock className="h-6 w-6" />,
            title: "Private & Secure",
            description: "Keep your surprise safe with password protection and controlled access.",
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Share with Family",
            description: "Invite friends and family to participate in your special moment.",
          },
          {
            icon: <Gamepad2 className="h-12 w-12" />,
            title: "Multiple Games",
            description: "Choose from puzzles, riddles, countdown timers, and interactive games.",
          },
          {
            icon: <Settings className="h-12 w-12" />,
            title: "Customizable",
            description: "Personalize every aspect of your reveal, from colors to music to special effects.",
          },
        ]}
      />

      <div id="pricing" />
      <PricingGrid
        title="Pricing"
        subtitle="Flexible plans for every team."
        items={[
          {
            title: "Basic",
            price: "Free",
            description: "Perfect for simple reveals",
            features: [
              "1 reveal game or puzzle",
              "Basic themes",
              "Share with up to 20 guests",
              "24-hour access",
              "Mobile friendly",
            ],
            buttonText: "Get Started",
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: "Pro",
            price: "$19.99",
            description: "For the ultimate reveal experience",
            features: [
              "5 reveal games or puzzles",
              "Premium themes & effects",
              "Unlimited guests",
              "30-day access",
              "Custom music & animations",
            ],
            buttonText: "Upgrade to Pro",
            isPopular: true,
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: "Party Pack",
            price: "$39.99",
            description: "For multiple reveals or events",
            features: [
              "All games and puzzles",
              "Exclusive VIP themes",
              "Unlimited guests",
              "90-day access",
              "Priority support",
            ],
            buttonText: "Contact Us",
            buttonHref: stackServerApp.urls.signUp,
          },
        ]}
      />
    </>
  );
}
