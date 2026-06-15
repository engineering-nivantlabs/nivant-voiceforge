import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Video,
  PlayCircle,
  ArrowRight,
  Clock,
  Zap,
  Globe,
  Star,
  Play,
  Check,
} from 'lucide-react'
import Waveform from '../components/Waveform'
import VideoPlaceholder from '../components/VideoPlaceholder'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.08)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-cyan/[0.03] rounded-full blur-[120px]" />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              AI-Powered Video Creation
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1] mb-5">
              Create Videos{' '}
              <span className="text-gradient-cyan">Without a Camera</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
              Professional AI spokesperson videos, multi-language dubbing, and automated YouTube content — all powered by cutting-edge AI voice and video synthesis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link
                to="/spokesperson"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-cyan text-white font-semibold text-sm hover:brightness-110 transition-all hover:-translate-y-0.5"
              >
                <Video className="w-4 h-4" />
                Create Your First Video
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary font-medium text-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all"
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40">
              <VideoPlaceholder seed="hero" width={896} height={504} label="AI Studio Preview" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-white/80 font-medium">AI Generated</span>
                  </div>
                </div>
                <Waveform isPlaying={true} barCount={20} className="opacity-60" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Speed Comparison */}
      <section className="py-16 md:py-20 border-y border-white/[0.06] bg-[#0A0A0F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              What Took 4–8 Hours Now Takes <span className="text-gradient-cyan">15 Minutes</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Our AI handles scripting, recording, editing, and post-production — so you focus on strategy, not logistics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: 'Traditional', value: '4–8 hours', desc: 'Script, film, edit, export', color: 'text-text-muted' },
              { icon: Zap, label: 'With AI Studio', value: '15 minutes', desc: 'Generate, review, publish', color: 'text-accent-cyan' },
              { icon: Star, label: 'Time Saved', value: '97%', desc: 'More content, less effort', color: 'text-accent-teal' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="bg-[#16161F] border border-white/[0.06] rounded-xl p-6 text-center"
                >
                  <Icon className={`w-6 h-6 ${item.color} mx-auto mb-3`} />
                  <p className="text-sm text-text-muted mb-1">{item.label}</p>
                  <p className={`text-3xl font-extrabold ${item.color} mb-1`}>{item.value}</p>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            <p className="text-accent-cyan text-sm font-medium mb-2">Services</p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Three Ways to Create
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Choose the right tool for your content needs — from spokesperson videos to fully automated channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: 'AI Spokesperson Videos',
                description: 'Create professional video messages with lifelike AI avatars. Perfect for marketing, training, and announcements.',
                price: 'From $10/video',
                to: '/spokesperson',
                color: 'from-cyan-500 to-teal-500',
                features: ['30+ AI avatars', '50+ voices', '1080p output', 'Custom backgrounds'],
              },
              {
                icon: Globe,
                title: 'Video Localization',
                description: 'Auto-dub your videos in 30+ languages with lip-sync. Reach global audiences without re-recording.',
                price: 'From $5/minute',
                to: '/dubbing',
                color: 'from-purple-500 to-indigo-500',
                features: ['30+ languages', 'Lip-sync dubbing', 'Subtitle export', 'Voice cloning'],
              },
              {
                icon: PlayCircle,
                title: 'Faceless YouTube Channel',
                description: 'Fully automated content creation — scripts, voiceovers, visuals, and scheduling handled by AI.',
                price: '$99/month',
                to: '/youtube',
                color: 'from-amber-500 to-orange-500',
                features: ['Auto scripts', 'Daily uploads', 'Analytics', 'Monetization ready'],
              },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    to={service.to}
                    className="block h-full bg-[#16161F] border border-white/[0.06] rounded-xl p-6 hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{service.title}</h3>
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed">{service.description}</p>
                    <div className="space-y-2 mb-4">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-text-muted">
                          <Check className="w-3 h-3 text-accent-teal" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <span className="text-accent-cyan font-semibold text-sm">{service.price}</span>
                      <span className="flex items-center gap-1 text-xs text-text-muted group-hover:text-accent-cyan transition-colors">
                        Get Started <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Showcase / Reel */}
      <section className="py-16 md:py-24 bg-[#0A0A0F] border-y border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-10"
          >
            <p className="text-accent-cyan text-sm font-medium mb-2">Showcase</p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              See What&apos;s Possible
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Sample outputs from our AI studio — professional quality without a production team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { seed: 'demo1', label: 'Product Launch Announcement', dur: '0:45' },
              { seed: 'demo2', label: 'Training Module Intro', dur: '2:30' },
              { seed: 'demo3', label: 'Spanish Dubbed Ad', dur: '0:30' },
              { seed: 'demo4', label: 'YouTube Tech Review', dur: '8:15' },
              { seed: 'demo5', label: 'Company Welcome Message', dur: '1:20' },
              { seed: 'demo6', label: 'Motivational Short', dur: '0:60' },
            ].map((demo, i) => (
              <motion.div
                key={demo.seed}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="group cursor-pointer">
                  <VideoPlaceholder seed={demo.seed} width={400} height={225} label={demo.label} />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-text-secondary font-medium group-hover:text-accent-cyan transition-colors">
                      {demo.label}
                    </p>
                    <span className="text-xs text-text-muted font-mono">{demo.dur}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-10"
          >
            <p className="text-accent-cyan text-sm font-medium mb-2">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Pay per use or subscribe for unlimited access. No hidden fees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Pay Per Use', spokesperson: '$10–50', dubbing: '$5–25/min', youtube: 'N/A', cta: 'Get Started', popular: false },
              { name: 'Professional', spokesperson: '$25/video', dubbing: '$12/min', youtube: 'Included', cta: 'Start Free Trial', popular: true },
              { name: 'Enterprise', spokesperson: '$50/video', dubbing: '$25/min', youtube: 'Full Suite', cta: 'Contact Sales', popular: false },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className={`relative bg-[#16161F] border rounded-xl p-6 ${plan.popular ? 'border-accent-cyan/40' : 'border-white/[0.06]'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full gradient-cyan text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-text-primary mb-1">{plan.name}</h3>
                <div className="space-y-2 mt-4 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Spokesperson</span>
                    <span className="text-text-primary font-medium">{plan.spokesperson}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Dubbing</span>
                    <span className="text-text-primary font-medium">{plan.dubbing}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">YouTube</span>
                    <span className="text-text-primary font-medium">{plan.youtube}</span>
                  </div>
                </div>
                <Link
                  to="/pricing"
                  className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'gradient-cyan text-white hover:brightness-110'
                      : 'bg-white/5 text-text-primary hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12121A] to-[#0F172A] border border-white/[0.08] p-8 md:p-12 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-cyan/[0.05] rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                Ready to Start Creating?
              </h2>
              <p className="text-text-secondary max-w-lg mx-auto mb-6">
                Join thousands of creators, marketers, and businesses using AI Studio to produce professional video content.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/spokesperson"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-cyan text-white font-semibold text-sm hover:brightness-110 transition-all"
                >
                  <Play className="w-4 h-4" />
                  Create First Video
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary font-medium text-sm hover:bg-white/10 transition-all"
                >
                  See All Plans
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
