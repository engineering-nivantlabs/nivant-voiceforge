import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Check,
  Zap,
  Building2,
  User,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from 'lucide-react'
import { pricingPlans } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const faqs = [
  {
    q: 'What is the credits system?',
    a: 'Credits are our unified currency. 1 credit = $1. Different actions cost different amounts of credits based on complexity and compute required.',
  },
  {
    q: 'Can I switch between plans?',
    a: 'Yes, you can upgrade or downgrade at any time. Prorated credits will be applied to your account.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Professional and Enterprise plans include a 7-day free trial with full access to all features.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.',
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          Simple, Transparent Pricing
        </h1>
        <p className="text-text-secondary max-w-lg mx-auto">
          Choose between pay-per-use flexibility or unlimited subscription plans. No hidden fees, cancel anytime.
        </p>
      </motion.div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-3 mb-10"
      >
        <span className={`text-sm ${billing === 'monthly' ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
          Monthly
        </span>
        <button
          onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
          className="relative w-14 h-7 rounded-full bg-[#1A1A25] border border-white/[0.08] transition-colors"
        >
          <motion.div
            className="absolute top-0.5 w-6 h-6 rounded-full gradient-cyan"
            animate={{ left: billing === 'yearly' ? '26px' : '2px' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={`text-sm ${billing === 'yearly' ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
          Yearly
        </span>
        <span className="text-[10px] text-accent-teal bg-accent-teal/10 px-2 py-0.5 rounded-full font-medium">
          Save 20%
        </span>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        {pricingPlans.map((plan, i) => {
          const price = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
          return (
            <motion.div
              key={plan.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              className={`relative bg-[#16161F] border rounded-xl p-6 flex flex-col ${
                plan.popular ? 'border-accent-cyan/40 shadow-lg shadow-cyan-500/5' : 'border-white/[0.06]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full gradient-cyan text-white text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                plan.name === 'Starter' ? 'bg-blue-500/10' :
                plan.name === 'Professional' ? 'bg-accent-cyan/10' :
                'bg-purple-500/10'
              }`}>
                {plan.name === 'Starter' ? <User className="w-5 h-5 text-blue-400" /> :
                 plan.name === 'Professional' ? <Zap className="w-5 h-5 text-accent-cyan" /> :
                 <Building2 className="w-5 h-5 text-purple-400" />}
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-1">{plan.name}</h3>
              <p className="text-xs text-text-muted mb-4">{plan.description}</p>

              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-text-primary">${price}</span>
                  <span className="text-sm text-text-muted">/month</span>
                </div>
                {billing === 'yearly' && (
                  <p className="text-xs text-accent-teal mt-0.5">Billed annually (${price * 12}/year)</p>
                )}
              </div>

              {/* Per-use prices */}
              <div className="bg-[#12121A] border border-white/[0.06] rounded-lg p-3 mb-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-text-muted">Spokesperson</span>
                  <span className="text-text-primary font-medium">{plan.spokespersonPrice}</span>
                </div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-text-muted">Dubbing</span>
                  <span className="text-text-primary font-medium">{plan.dubbingPrice}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">YouTube</span>
                  <span className="text-text-primary font-medium">{plan.name === 'Starter' ? 'N/A' : plan.name === 'Professional' ? 'Included' : 'Full Suite'}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-accent-teal/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-accent-teal" />
                    </div>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                  plan.popular
                    ? 'gradient-cyan text-white hover:brightness-110 hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 border border-white/10 text-text-primary hover:bg-white/10'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Credits Explanation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="max-w-2xl mx-auto mb-16"
      >
        <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-accent-cyan" />
            <h3 className="text-sm font-semibold text-text-primary">Credits System</h3>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Our credits system gives you maximum flexibility. 1 credit = $1. Use credits for any service — spokesperson videos, dubbing, or YouTube automation.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { action: '1-min spokesperson', cost: '10 credits' },
              { action: '1-min dubbing', cost: '5–25 credits' },
              { action: 'YouTube video', cost: '15 credits' },
              { action: 'Voice preview', cost: 'Free' },
            ].map((item) => (
              <div key={item.action} className="bg-[#12121A] border border-white/[0.06] rounded-lg p-3 text-center">
                <p className="text-xs text-text-muted mb-1">{item.action}</p>
                <p className="text-sm font-semibold text-accent-cyan">{item.cost}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="max-w-2xl mx-auto"
      >
        <h3 className="text-lg font-bold text-text-primary text-center mb-6">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#16161F] border border-white/[0.06] rounded-xl p-4">
              <p className="text-sm font-medium text-text-primary mb-1">{faq.q}</p>
              <p className="text-sm text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
