// Shared routing + SEO metadata for Magic Decisions.
// Used by App.tsx (client-side titles), entry-server.tsx and
// scripts/prerender.mjs (static HTML generation).

export type Tool =
  | 'home' | 'oracle' | 'spin' | 'coin' | 'picker' | 'activity' | 'dinner'
  | 'rps' | 'names' | 'username' | 'outfit' | 'maximizer' | 'bias' | 'buyit'
  | 'chores' | 'd20' | 'sortinghat' | 'keepit' | 'farewell' | 'monster' | 'screentime' | 'blog' | 'blogpost' | 'privacy'
  | 'terms' | 'about' | 'contact';

export const pathToTool: Record<string, Tool> = {
  'yes-no-oracle': 'oracle',
  'spin-the-wheel': 'spin',
  'coin-flip': 'coin',
  'random-picker': 'picker',
  'random-activity-picker': 'activity',
  'what-to-eat-randomizer': 'dinner',
  'rock-paper-scissors': 'rps',
  'random-name-generator': 'names',
  'random-username-generator': 'username',
  'what-to-wear-randomizer': 'outfit',
  'magic-chores-list': 'chores',
  'screen-time-swap': 'screentime',
  'decision-maximizer': 'maximizer',
  'cognitive-bias-checker': 'bias',
  'should-i-buy-it-calculator': 'buyit',
  'about-us': 'about',
  'privacy-policy': 'privacy',
  'terms-of-service': 'terms',
  'd20-roller': 'd20',
  'keep-or-toss': 'sortinghat',
  'should-i-keep-it': 'keepit',
  'toy-farewell': 'farewell',
  'clutter-monster': 'monster',
  'blog': 'blog',
  'contact': 'contact',
};

export const toolToPath: Record<Tool, string> = {
  oracle: 'yes-no-oracle',
  spin: 'spin-the-wheel',
  coin: 'coin-flip',
  picker: 'random-picker',
  activity: 'random-activity-picker',
  dinner: 'what-to-eat-randomizer',
  rps: 'rock-paper-scissors',
  names: 'random-name-generator',
  username: 'random-username-generator',
  outfit: 'what-to-wear-randomizer',
  chores: 'magic-chores-list',
  screentime: 'screen-time-swap',
  maximizer: 'decision-maximizer',
  bias: 'cognitive-bias-checker',
  buyit: 'should-i-buy-it-calculator',
  about: 'about-us',
  privacy: 'privacy-policy',
  terms: 'terms-of-service',
  d20: 'd20-roller',
  sortinghat: 'keep-or-toss',
  keepit: 'should-i-keep-it',
  farewell: 'toy-farewell',
  monster: 'clutter-monster',
  home: '',
  contact: 'contact',
  blog: 'blog',
  blogpost: 'blog',
};

export interface RouteMeta {
  title: string;
  description: string;
}

// Strategy (per brand/SEO plan): home + about lead with the
// family/kids positioning; individual tool pages stay broad
// for search intent.
export const routeMeta: Record<string, RouteMeta> = {
  'clutter-monster': {
    title: 'Clutter Monster Battle \u2014 Gamified Cleanup Timer for Kids | Magic Decisions',
    description:
      'Turn a 10-minute cleanup into an epic battle. Pick a clutter monster, start the timer, land power strikes, and defeat the mess \u2014 free gamified cleaning timer for kids, no signup.',
  },

  'toy-farewell': {
    title: 'Toy Farewell Ceremony \u2014 Funny Goodbye Speeches for Outgrown Toys | Magic Decisions',
    description:
      'Help kids let go of outgrown toys with a funny, sweet farewell speech and a printable Certificate of Honorable Service. Free ceremony generator \u2014 no signup.',
  },

  'should-i-keep-it': {
    title: 'Should I Keep It? Free Declutter Decision Wheel | Magic Decisions',
    description:
      'On the fence about keeping something? Spin the free Should-I-Keep-It wheel: donate, maybe box, keep, sell, toss, or photo-and-release. A fast, fair way to declutter \u2014 no signup.',
  },

  'keep-or-toss': {
    title: 'Keep or Toss? Free Declutter Sorting Hat for Kids | Magic Decisions',
    description:
      'Can\u2019t decide what to keep, toss, or donate? The Magic Sorting Hat asks kids 3 quick questions per item and makes the call \u2014 a fun, shame-free way to declutter toys together. Free, no signup.',
  },

  '': {
    title: 'Magic Decisions | Fun Decision-Making Tools for Kids & Families',
    description:
      'Free decision-making tools for kids, parents, and families. Spin wheels, coin flips, dice rollers, and playful prompts that make everyday choices easier, fairer, and more fun. No signup required.',
  },
  'yes-no-oracle': {
    title: 'Yes or No Oracle – Free Online Decision Maker | Magic Decisions',
    description:
      'Ask the oracle any yes-or-no question and get an instant answer. A fun, free way to make quick decisions — no signup required.',
  },
  'spin-the-wheel': {
    title: 'Spin the Wheel – Free Random Decision Wheel | Magic Decisions',
    description:
      'Add your options and spin the wheel to decide. A free, fair random picker for family choices, games, giveaways, and everyday decisions.',
  },
  'coin-flip': {
    title: 'Coin Flip Online – Free Heads or Tails Flipper | Magic Decisions',
    description:
      'Flip a virtual coin and settle it fast. Free online heads-or-tails coin toss for quick, fair decisions.',
  },
  'random-picker': {
    title: 'Random Picker – Choose from Your List Instantly | Magic Decisions',
    description:
      'Paste your options and let the random picker choose for you. Fair, fast, and free — great for names, prizes, and everyday choices.',
  },
  'random-activity-picker': {
    title: 'Random Activity Picker for Kids & Families | Magic Decisions',
    description:
      'Bored? Spin up a random activity idea for kids, families, or friends. A free tool for rainy days, game nights, and “I don’t know what to do” moments.',
  },
  'what-to-eat-randomizer': {
    title: 'What Should We Eat? Dinner Decider & Food Randomizer | Magic Decisions',
    description:
      'Can’t decide what to eat? Let the dinner decider pick for you. A free food randomizer that ends the “I don’t know, what do you want?” loop.',
  },
  'rock-paper-scissors': {
    title: 'Rock Paper Scissors Online – Play & Decide | Magic Decisions',
    description:
      'Play rock paper scissors online to settle choices the classic way. Free, instant, and fair.',
  },
  'random-name-generator': {
    title: 'Random Name Picker – Fair Name Drawing Tool | Magic Decisions',
    description:
      'Draw a name at random from your list. Perfect for picking who goes first, classroom turns, gift exchanges, and giveaways.',
  },
  'random-username-generator': {
    title: 'Random Username Generator – Fun & Safe Ideas | Magic Decisions',
    description:
      'Generate fun, kid-friendly username ideas instantly. Free random username generator with playful themes.',
  },
  'what-to-wear-randomizer': {
    title: 'What Should I Wear? Outfit Idea Generator | Magic Decisions',
    description:
      'Stuck in front of the closet? Get a random outfit idea in seconds with this free what-to-wear randomizer.',
  },
  'magic-chores-list': {
    title: 'Magic Chores – Fun Random Chore Picker for Kids | Magic Decisions',
    description:
      'Turn chores into a game. The magic chore picker assigns tasks randomly and fairly, so kids argue less and help more.',
  },
  'screen-time-swap': {
    title: 'Screen Time Swap – Trade Screens for Activities | Magic Decisions',
    description:
      'A playful tool that swaps screen time for real-world activities. Help kids balance devices with movement, creativity, and family time.',
  },
  'decision-maximizer': {
    title: 'Decision Style Quiz – Maximizer or Satisficer? | Magic Decisions',
    description:
      'Do you overthink choices or decide fast and move on? Take the free decision style quiz and learn how you (and your kids) decide.',
  },
  'cognitive-bias-checker': {
    title: 'Cognitive Bias Test – Check Your Decision Biases | Magic Decisions',
    description:
      'A quick, free test that reveals the common thinking traps that sneak into everyday decisions — and how to spot them.',
  },
  'should-i-buy-it-calculator': {
    title: 'Should I Buy It? Purchase Decision Calculator | Magic Decisions',
    description:
      'Not sure about a purchase? This free calculator walks you through cost-per-use, waiting rules, and gut checks before you buy.',
  },
  'd20-roller': {
    title: 'D20 Dice Roller Online – Roll a 20-Sided Die | Magic Decisions',
    description:
      'Roll a virtual D20 for games, decisions, or fun. A free online 20-sided dice roller — tap to roll, no signup needed.',
  },
  'blog': {
    title: 'Decision-Making Blog for Parents & Kids | Magic Decisions',
    description:
      'Practical, playful articles on decision fatigue, overthinking, and helping kids build confidence through small everyday choices.',
  },
  'about-us': {
    title: 'About Magic Decisions: Fun Decision-Making Tools for Kids and Families',
    description:
      'Magic Decisions was built by a single mom and her 10-year-old daughter to make everyday choices easier, fairer, and more fun with free decision-making tools for kids, parents, and families.',
  },
  'contact': {
    title: 'Contact Magic Decisions',
    description:
      'Questions, ideas, or feedback about our free decision-making tools? Get in touch with the Magic Decisions family.',
  },
  'privacy-policy': {
    title: 'Privacy Policy | Magic Decisions',
    description:
      'How Magic Decisions handles your information. Our tools are designed to be low-friction, with no required sign-ups.',
  },
  'terms-of-service': {
    title: 'Terms of Service | Magic Decisions',
    description:
      'The terms for using Magic Decisions’ free decision-making tools, designed for fun, low-stakes everyday choices.',
  },
};

export function metaForPath(path: string): RouteMeta {
  const clean = path.replace(/^\/|\/$/g, '');
  if (routeMeta[clean]) return routeMeta[clean];
  if (clean.startsWith('blog/')) return routeMeta['blog'];
  return routeMeta[''];
}
