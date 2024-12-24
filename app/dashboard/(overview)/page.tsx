'use client';

import { BentoGrid } from '@/components/ui/bento-grid';
import { BentoCard } from '@/components/ui/bento-grid';
import { ArrowRightIcon, Sparkles, Wand2, PartyPopper, Gift, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';

const templates = [
  {
    name: 'Classic Balloon Pop',
    price: '$29.99',
    description:
      'A timeless reveal with a giant black balloon filled with pink or blue confetti. Perfect for both indoor and outdoor celebrations.',
    icon: PartyPopper,
    background: <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-blue-100 opacity-50" />,
    href: '/templates/balloon-pop',
    cta: 'Customize template',
    className: 'lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-4',
  },
  {
    name: 'Smoke Show',
    price: '$39.99',
    description: 'Create a magical moment with color-changing smoke bombs for your reveal.',
    icon: Sparkles,
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 opacity-50" />,
    href: '/templates/smoke-show',
    cta: 'Customize template',
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    name: 'Digital Fireworks',
    price: '$19.99',
    description: 'A virtual fireworks display that explodes in pink or blue.',
    icon: Stars,
    background: <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-red-100 opacity-50" />,
    href: '/templates/digital-fireworks',
    cta: 'Customize template',
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    name: 'Magic Box',
    price: '$34.99',
    description: "A mysterious box that reveals your baby's gender with a magical light show.",
    icon: Gift,
    background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 opacity-50" />,
    href: '/templates/magic-box',
    cta: 'Customize template',
    className: 'lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2',
  },
  {
    name: 'Enchanted Garden',
    price: '$49.99',
    description:
      'Transform your space into a magical garden that blooms in pink or blue. Features animated butterflies and floating petals.',
    icon: Wand2,
    background: <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-sky-100 opacity-50" />,
    href: '/templates/enchanted-garden',
    cta: 'Customize template',
    className: 'lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gender Reveal Templates</h1>
            <p className="text-gray-500">Choose from our curated collection of magical reveal experiences</p>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-pink-500/30 to-blue-500/70 text-white">
            Create Custom Template
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          {templates.map((template) => (
            <BentoCard
              key={template.name}
              name={template.name}
              className={template.className}
              background={template.background}
              Icon={template.icon}
              description={`${template.price} - ${template.description}`}
              href={template.href}
              cta={template.cta}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
