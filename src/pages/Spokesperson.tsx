import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Video,
  Play,
  Download,
  Share2,
  Check,
  ChevronDown,
  Palette,
  Type,
  Mic,
  User,
  Wand2,
  Clock,
  Sparkles,
} from 'lucide-react'
import { avatars } from '../data'
import Waveform from '../components/Waveform'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const voiceOptions = [
  'Ethan — Professional', 'Olivia — Friendly', 'Arthur — Authoritative',
  'Isabella — Elegant', 'Carlos — Warm', 'Elena — Professional',
]

const backgroundOptions = [
  { id: 'gradient', name: 'Cyan Gradient', color: 'from-cyan-900/60 to-teal-900/60' },
  { id: 'solid', name: 'Dark Navy', color: 'bg-[#0F172A]' },
  { id: 'office', name: 'Office Blur', color: 'bg-[#1A1A2E]' },
  { id: 'abstract', name: 'Abstract', color: 'from-purple-900/40 to-cyan-900/40' },
  { id: 'minimal', name: 'Minimal White', color: 'bg-[#1E293B]' },
]

export default function Spokesperson() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id)
  const [script, setScript] = useState('')
  const [voice, setVoice] = useState(voiceOptions[0])
  const [background, setBackground] = useState(backgroundOptions[0].id)
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const avatar = avatars.find((a) => a.id === selectedAvatar) || avatars[0]
  const bgOption = backgroundOptions.find((b) => b.id === background) || backgroundOptions[0]

  const handleGenerate = () => {
    if (!script.trim()) return
    setGenerating(true)
    setProgress(0)
    setShowResult(false)

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (progressRef.current) clearInterval(progressRef.current)
          setGenerating(false)
          setShowResult(true)
          return 100
        }
        return prev + 2 + Math.random() * 3
      })
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [])

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <Video className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Spokesperson Studio</h1>
        </div>
        <p className="text-text-secondary">Select an avatar, write your script, and generate a professional video in minutes.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel — Controls */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="lg:col-span-7 space-y-6"
        >
          {/* Avatar Selector */}
          <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold text-text-primary">Choose Avatar</h3>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
              {avatars.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAvatar(a.id)}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                    selectedAvatar === a.id
                      ? 'border-accent-cyan/50 bg-accent-cyan/10'
                      : 'border-white/[0.06] bg-[#12121A] hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${a.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {a.initials}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-text-primary">{a.name}</p>
                    <p className="text-[10px] text-text-muted">{a.style}</p>
                  </div>
                  {selectedAvatar === a.id && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-accent-cyan flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Script Input */}
          <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold text-text-primary">Script</h3>
              <span className="ml-auto text-xs text-text-muted">{script.length} chars</span>
            </div>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Enter your script here... Our AI will bring it to life with natural speech and expressions."
              rows={5}
              className="w-full bg-[#1A1A25] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10 resize-none transition-all"
            />
          </div>

          {/* Voice & Background */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Voice Selector */}
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Mic className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold text-text-primary">Voice</h3>
              </div>
              <div className="relative">
                <button
                  onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)}
                  className="w-full flex items-center justify-between bg-[#1A1A25] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary hover:border-accent-cyan/30 transition-all"
                >
                  <span>{voice}</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${voiceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {voiceDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute z-10 top-full left-0 right-0 mt-1 bg-[#1A1A25] border border-white/[0.08] rounded-lg overflow-hidden shadow-xl"
                    >
                      {voiceOptions.map((v) => (
                        <button
                          key={v}
                          onClick={() => { setVoice(v); setVoiceDropdownOpen(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            voice === v ? 'text-accent-cyan bg-accent-cyan/10' : 'text-text-secondary hover:bg-white/5'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Background Selector */}
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold text-text-primary">Background</h3>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {backgroundOptions.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg.id)}
                    className={`relative h-10 rounded-lg bg-gradient-to-br ${bg.color} border-2 transition-all ${
                      background === bg.id ? 'border-accent-cyan' : 'border-transparent hover:border-white/20'
                    }`}
                    title={bg.name}
                  />
                ))}
              </div>
              <p className="text-xs text-text-muted mt-2">{bgOption.name}</p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!script.trim() || generating}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all ${
              !script.trim() || generating
                ? 'bg-white/5 text-text-muted cursor-not-allowed'
                : 'gradient-cyan text-white hover:brightness-110 hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20'
            }`}
          >
            {generating ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                Generating... {Math.round(progress)}%
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Video
              </>
            )}
          </button>

          {/* Progress Bar */}
          <AnimatePresence>
            {generating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-cyan animate-pulse" />
                    <span className="text-sm text-text-secondary">AI is working...</span>
                  </div>
                  <span className="text-xs text-text-muted font-mono">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-[#1A1A25] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full gradient-cyan"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-text-muted">
                  <span>Script analysis</span>
                  <span>Voice synthesis</span>
                  <span>Video rendering</span>
                  <span>Finalize</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Panel — Preview */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="lg:col-span-5"
        >
          <div className="sticky top-24 space-y-4">
            {/* Preview */}
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Preview</h3>
              <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${bgOption.color} aspect-video flex items-center justify-center`}>
                <AnimatePresence mode="wait">
                  {showResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Play className="w-8 h-8 text-accent-cyan ml-1" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-text-primary">Video Ready!</p>
                        <p className="text-xs text-text-muted">Click to preview</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="avatar"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatar.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-2xl`}>
                        {avatar.initials}
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-text-primary">{avatar.name}</p>
                        <p className="text-xs text-text-muted">{avatar.style} &middot; {avatar.accent} {avatar.language}</p>
                      </div>
                      {generating && (
                        <div className="flex items-center gap-2 mt-2">
                          <Waveform isPlaying={true} barCount={16} />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5 space-y-3"
                >
                  <h3 className="text-sm font-semibold text-text-primary mb-2">Actions</h3>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg gradient-cyan text-white text-sm font-semibold hover:brightness-110 transition-all">
                    <Play className="w-4 h-4" />
                    Play Preview
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 text-text-primary text-sm hover:bg-white/10 transition-all">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={() => {
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 text-text-primary text-sm hover:bg-white/10 transition-all"
                    >
                      {copied ? <Check className="w-4 h-4 text-accent-teal" /> : <Share2 className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Share'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avatar Info */}
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Avatar Details</h3>
              <div className="space-y-2">
                {[
                  { label: 'Name', value: avatar.name },
                  { label: 'Style', value: avatar.style },
                  { label: 'Language', value: avatar.language },
                  { label: 'Accent', value: avatar.accent },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{item.label}</span>
                    <span className="text-text-primary">{item.value}</span>
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
