import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PlayCircle,
  Monitor,
  TrendingUp,
  Heart,
  Zap,
  BookOpen,
  Star,
  Play,
  Calendar,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  ThumbsUp,
  Clock,
  Check,
  Sparkles,
  Wand2,
  Layout,
  ArrowUpRight,
} from 'lucide-react'
import { youtubeNiches } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const nicheIcons: Record<string, React.ElementType> = {
  Monitor, TrendingUp, Heart, Zap, BookOpen, Star,
}

const mockAnalytics = {
  views: '124.5K',
  viewsChange: '+23%',
  subscribers: '8.2K',
  subsChange: '+12%',
  revenue: '$1,847',
  revenueChange: '+45%',
  watchTime: '18.3K',
  watchChange: '+8%',
}

const recentVideos = [
  { title: '5 AI Tools That Will Change Your Workflow', views: '12.4K', likes: '890', published: '2 days ago', status: 'published' },
  { title: 'How to Build Passive Income in 2025', views: '8.7K', likes: '654', published: '5 days ago', status: 'published' },
  { title: 'The Future of Remote Work', views: '—', likes: '—', published: 'Draft', status: 'draft' },
  { title: 'Top 10 Productivity Hacks', views: '—', likes: '—', published: 'Scheduled', status: 'scheduled' },
]

const scheduleDays = [
  { day: 'Mon', videos: 1 },
  { day: 'Tue', videos: 0 },
  { day: 'Wed', videos: 1 },
  { day: 'Thu', videos: 1 },
  { day: 'Fri', videos: 0 },
  { day: 'Sat', videos: 1 },
  { day: 'Sun', videos: 0 },
]

const titleSuggestions = [
  '10 Secrets the Tech Industry Doesn\'t Want You to Know',
  'How I Built a $10K/Month Side Hustle with Zero Coding',
  'The Ultimate Guide to AI-Powered Productivity in 2025',
]

export default function YouTube() {
  const [selectedNiche, setSelectedNiche] = useState('tech')
  const [generating, setGenerating] = useState(false)
  const [scriptGenerated, setScriptGenerated] = useState(false)
  const niche = youtubeNiches.find((n) => n.id === selectedNiche) || youtubeNiches[0]

  const handleGenerateScript = () => {
    setGenerating(true)
    setScriptGenerated(false)
    setTimeout(() => {
      setGenerating(false)
      setScriptGenerated(true)
    }, 2500)
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <PlayCircle className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">YouTube Automation</h1>
        </div>
        <p className="text-text-secondary">Fully automated faceless YouTube channel management — scripts, voiceovers, and scheduling.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="lg:col-span-7 space-y-5"
        >
          {/* Niche Selector */}
          <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold text-text-primary">Select Niche</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {youtubeNiches.map((n) => {
                const Icon = nicheIcons[n.icon] || Star
                return (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNiche(n.id)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      selectedNiche === n.id
                        ? 'border-accent-cyan/40 bg-accent-cyan/10'
                        : 'border-white/[0.06] bg-[#12121A] hover:border-white/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${selectedNiche === n.id ? 'text-accent-cyan' : 'text-text-muted'}`} />
                    <div>
                      <p className={`text-xs font-medium ${selectedNiche === n.id ? 'text-accent-cyan' : 'text-text-primary'}`}>{n.name}</p>
                      <p className="text-[10px] text-text-muted leading-tight mt-0.5">{n.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Script Generator */}
          <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold text-text-primary">Script Generator</h3>
              </div>
              <span className="text-xs text-text-muted bg-white/5 px-2 py-0.5 rounded-full">{niche.name}</span>
            </div>

            {!scriptGenerated ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-[#1A1A25] flex items-center justify-center mx-auto mb-3">
                  <Wand2 className="w-5 h-5 text-accent-cyan" />
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Generate a complete script for your next {niche.name.toLowerCase()} video
                </p>
                <button
                  onClick={handleGenerateScript}
                  disabled={generating}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    generating
                      ? 'bg-white/5 text-text-muted cursor-not-allowed'
                      : 'gradient-cyan text-white hover:brightness-110'
                  }`}
                >
                  {generating ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      Generate Script
                    </>
                  )}
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="bg-[#12121A] border border-white/[0.06] rounded-lg p-4">
                  <p className="text-xs font-medium text-text-muted mb-2">Generated Script</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Welcome back to the channel! Today we&apos;re diving deep into {niche.name.toLowerCase()} — specifically, the top strategies that are working right now in 2025. Whether you&apos;re just getting started or looking to scale, these insights will give you a serious edge. Let&apos;s jump right in!
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mt-3">
                    First, let&apos;s talk about the biggest shift we&apos;ve seen this year. The landscape has completely changed, and what worked even six months ago might not work today. Here are the five key trends you need to know about...
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg gradient-cyan text-white text-xs font-semibold hover:brightness-110 transition-all">
                    Use This Script
                  </button>
                  <button onClick={handleGenerateScript} className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-text-primary text-xs hover:bg-white/10 transition-all">
                    Regenerate
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Title & Thumbnail Suggestions */}
          {scriptGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5 space-y-4"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold text-text-primary">Title Suggestions</h3>
              </div>
              {titleSuggestions.map((title, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#12121A] border border-white/[0.06]">
                  <p className="text-sm text-text-secondary flex-1">{title}</p>
                  <button className="text-xs text-accent-cyan hover:underline flex-shrink-0">Use</button>
                </div>
              ))}
            </motion.div>
          )}

          {/* Upload Schedule */}
          <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold text-text-primary">Upload Schedule</h3>
              </div>
              <span className="text-xs text-accent-cyan font-medium">4 videos/week</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {scheduleDays.map((d) => (
                <div key={d.day} className="text-center">
                  <p className="text-[10px] text-text-muted mb-1.5">{d.day}</p>
                  <div className={`h-8 rounded-lg flex items-center justify-center ${
                    d.videos > 0 ? 'bg-accent-cyan/15 border border-accent-cyan/20' : 'bg-[#12121A] border border-white/[0.04]'
                  }`}>
                    {d.videos > 0 && <Play className="w-3 h-3 text-accent-cyan" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Panel — Analytics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="lg:col-span-5"
        >
          <div className="sticky top-24 space-y-4">
            {/* Analytics Cards */}
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-accent-cyan" />
                  <h3 className="text-sm font-semibold text-text-primary">Analytics</h3>
                </div>
                <span className="text-[10px] text-text-muted">Last 30 days</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Views', value: mockAnalytics.views, change: mockAnalytics.viewsChange, icon: Eye, color: 'text-blue-400' },
                  { label: 'Subscribers', value: mockAnalytics.subscribers, change: mockAnalytics.subsChange, icon: Users, color: 'text-accent-cyan' },
                  { label: 'Revenue', value: mockAnalytics.revenue, change: mockAnalytics.revenueChange, icon: DollarSign, color: 'text-accent-teal' },
                  { label: 'Watch Time', value: mockAnalytics.watchTime, change: mockAnalytics.watchChange, icon: Clock, color: 'text-purple-400' },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="bg-[#12121A] border border-white/[0.06] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                        <span className="text-[10px] text-text-muted">{stat.label}</span>
                      </div>
                      <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                      <span className="text-[10px] text-accent-teal font-medium">{stat.change}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mini Chart */}
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">Views Trend</h3>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent-teal" />
              </div>
              <div className="flex items-end gap-1 h-24">
                {[35, 42, 38, 55, 48, 62, 58, 70, 65, 78, 72, 85, 80, 92, 88].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm bg-gradient-to-t from-cyan-500/30 to-cyan-500/80"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[9px] text-text-muted">
                <span>Day 1</span>
                <span>Day 15</span>
                <span>Day 30</span>
              </div>
            </div>

            {/* Content Pipeline */}
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4 text-accent-cyan" />
                  <h3 className="text-sm font-semibold text-text-primary">Content Pipeline</h3>
                </div>
              </div>
              <div className="space-y-2">
                {recentVideos.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#12121A] border border-white/[0.04]">
                    <div className="w-8 h-8 rounded-lg bg-[#1A1A25] flex items-center justify-center flex-shrink-0">
                      {v.status === 'published' ? (
                        <Play className="w-3.5 h-3.5 text-accent-cyan" />
                      ) : v.status === 'draft' ? (
                        <span className="text-[10px] text-text-muted">DR</span>
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-accent-amber" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text-primary truncate">{v.title}</p>
                      <p className="text-[10px] text-text-muted">{v.published}</p>
                    </div>
                    {v.views !== '—' && (
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] text-text-secondary">{v.views}</p>
                        <div className="flex items-center gap-0.5 text-[10px] text-text-muted">
                          <ThumbsUp className="w-2.5 h-2.5" />
                          {v.likes}
                        </div>
                      </div>
                    )}
                    {v.status === 'published' && (
                      <Check className="w-3 h-3 text-accent-teal flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
