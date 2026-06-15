// AI Avatars for Spokesperson Studio
export const avatars = [
  { id: 'alex', name: 'Alex', gender: 'male', style: 'Professional', language: 'English', accent: 'American', initials: 'AL', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'sarah', name: 'Sarah', gender: 'female', style: 'Friendly', language: 'English', accent: 'American', initials: 'SA', gradient: 'from-pink-500 to-rose-400' },
  { id: 'james', name: 'James', gender: 'male', style: 'Authoritative', language: 'English', accent: 'British', initials: 'JM', gradient: 'from-indigo-500 to-purple-500' },
  { id: 'maria', name: 'Maria', gender: 'female', style: 'Warm', language: 'English', accent: 'Spanish', initials: 'MR', gradient: 'from-amber-500 to-orange-400' },
  { id: 'david', name: 'David', gender: 'male', style: 'Casual', language: 'English', accent: 'Australian', initials: 'DV', gradient: 'from-emerald-500 to-teal-500' },
  { id: 'emma', name: 'Emma', gender: 'female', style: 'Energetic', language: 'English', accent: 'British', initials: 'EM', gradient: 'from-violet-500 to-purple-500' },
  { id: 'kenji', name: 'Kenji', gender: 'male', style: 'Calm', language: 'Japanese', accent: 'Tokyo', initials: 'KJ', gradient: 'from-red-500 to-pink-500' },
  { id: 'sofia', name: 'Sofia', gender: 'female', style: 'Professional', language: 'Spanish', accent: 'Castilian', initials: 'SF', gradient: 'from-cyan-500 to-blue-500' },
]

// Voice Library
export const voices = [
  { id: 'v1', name: 'Ethan', language: 'English', accent: 'American', gender: 'male', style: 'Professional', tags: ['business', 'corporate'], color: 'from-blue-500 to-indigo-500' },
  { id: 'v2', name: 'Olivia', language: 'English', accent: 'American', gender: 'female', style: 'Friendly', tags: ['marketing', 'social'], color: 'from-pink-500 to-rose-400' },
  { id: 'v3', name: 'Arthur', language: 'English', accent: 'British', gender: 'male', style: 'Authoritative', tags: ['documentary', 'news'], color: 'from-indigo-500 to-purple-500' },
  { id: 'v4', name: 'Isabella', language: 'English', accent: 'British', gender: 'female', style: 'Elegant', tags: ['luxury', 'fashion'], color: 'from-violet-500 to-purple-500' },
  { id: 'v5', name: 'Carlos', language: 'Spanish', accent: 'Mexican', gender: 'male', style: 'Warm', tags: ['education', 'storytelling'], color: 'from-amber-500 to-orange-400' },
  { id: 'v6', name: 'Elena', language: 'Spanish', accent: 'Castilian', gender: 'female', style: 'Professional', tags: ['business', 'corporate'], color: 'from-cyan-500 to-teal-500' },
  { id: 'v7', name: 'Hans', language: 'German', accent: 'Standard', gender: 'male', style: 'Precise', tags: ['technical', 'engineering'], color: 'from-gray-500 to-slate-400' },
  { id: 'v8', name: 'Sophie', language: 'French', accent: 'Parisian', gender: 'female', style: 'Elegant', tags: ['luxury', 'lifestyle'], color: 'from-rose-400 to-pink-500' },
  { id: 'v9', name: 'Yuki', language: 'Japanese', accent: 'Tokyo', gender: 'female', style: 'Gentle', tags: ['meditation', 'wellness'], color: 'from-red-400 to-pink-400' },
  { id: 'v10', name: 'Wei', language: 'Chinese', accent: 'Mandarin', gender: 'male', style: 'Professional', tags: ['business', 'finance'], color: 'from-emerald-500 to-green-400' },
  { id: 'v11', name: 'Marco', language: 'Italian', accent: 'Standard', gender: 'male', style: 'Passionate', tags: ['food', 'travel'], color: 'from-green-500 to-emerald-400' },
  { id: 'v12', name: 'Aisha', language: 'Arabic', accent: 'Egyptian', gender: 'female', style: 'Warm', tags: ['education', 'storytelling'], color: 'from-amber-400 to-yellow-500' },
  { id: 'v13', name: 'Raj', language: 'Hindi', accent: 'Standard', gender: 'male', style: 'Friendly', tags: ['entertainment', 'social'], color: 'from-orange-500 to-red-400' },
  { id: 'v14', name: 'Lena', language: 'Russian', accent: 'Standard', gender: 'female', style: 'Dramatic', tags: ['documentary', 'trailers'], color: 'from-blue-400 to-indigo-400' },
  { id: 'v15', name: 'Johan', language: 'Dutch', accent: 'Standard', gender: 'male', style: 'Calm', tags: ['meditation', 'education'], color: 'from-teal-400 to-cyan-400' },
  { id: 'v16', name: 'Mia', language: 'Korean', accent: 'Seoul', gender: 'female', style: 'Youthful', tags: ['social', 'gaming'], color: 'from-purple-400 to-indigo-400' },
]

// Languages for Dubbing
export const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch',
  'Chinese (Mandarin)', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian',
  'Turkish', 'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish',
  'Greek', 'Czech', 'Romanian', 'Hungarian', 'Thai', 'Vietnamese',
  'Indonesian', 'Malay', 'Filipino', 'Hebrew', 'Ukrainian', 'Croatian',
]

// Voice Styles
export const voiceStyles = ['Formal', 'Casual', 'Energetic', 'Calm', 'Authoritative', 'Friendly']

// YouTube Niches
export const youtubeNiches = [
  { id: 'tech', name: 'Tech Reviews', description: 'Gadgets, software, and tech news', icon: 'Monitor' },
  { id: 'finance', name: 'Personal Finance', description: 'Investing, budgeting, and wealth', icon: 'TrendingUp' },
  { id: 'health', name: 'Health & Wellness', description: 'Fitness, nutrition, and mental health', icon: 'Heart' },
  { id: 'motivation', name: 'Motivation', description: 'Self-improvement and inspiration', icon: 'Zap' },
  { id: 'education', name: 'Education', description: 'Science, history, and how-tos', icon: 'BookOpen' },
  { id: 'entertainment', name: 'Entertainment', description: 'Movies, music, and pop culture', icon: 'Star' },
]

// Pricing Plans
export const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for individuals exploring AI video',
    monthlyPrice: 29,
    yearlyPrice: 24,
    payPerUse: true,
    spokespersonPrice: '$10/video',
    dubbingPrice: '$5/min',
    features: [
      '5 videos/month',
      '720p output',
      '10 languages',
      'Basic avatars',
      'Standard voices',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'For creators and small businesses',
    monthlyPrice: 99,
    yearlyPrice: 79,
    payPerUse: false,
    spokespersonPrice: '$25/video',
    dubbingPrice: '$12/min',
    features: [
      '25 videos/month',
      '1080p output',
      '30+ languages',
      'All avatars',
      'Premium voices',
      'Priority support',
      'YouTube automation',
      'Analytics dashboard',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For teams and agencies at scale',
    monthlyPrice: 299,
    yearlyPrice: 249,
    payPerUse: false,
    spokespersonPrice: '$50/video',
    dubbingPrice: '$25/min',
    features: [
      'Unlimited videos',
      '4K output',
      'All languages + custom',
      'Custom avatars',
      'Voice cloning',
      'Dedicated support',
      'API access',
      'White-label option',
      'Team collaboration',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]
