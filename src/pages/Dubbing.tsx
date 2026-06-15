import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  Mic,
  Globe,
  Sparkles,
  Check,
  Clock,
  Play,
  Download,
  FileText,
  Film,
  ChevronDown,
  Wand2,
  Volume2,
  Subtitles,
} from 'lucide-react'
import { languages, voiceStyles } from '../data'
import Waveform from '../components/Waveform'
import VideoPlaceholder from '../components/VideoPlaceholder'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const subtitleOptions = [
  { id: 'burn', name: 'Burn-in Subtitles', desc: 'Embedded in video' },
  { id: 'srt', name: 'SRT Export', desc: 'Separate subtitle file' },
  { id: 'both', name: 'Both', desc: 'Burn-in + SRT file' },
]

export default function Dubbing() {
  const [uploaded, setUploaded] = useState(false)
  const [sourceLang, setSourceLang] = useState('English')
  const [targetLang, setTargetLang] = useState('Spanish')
  const [voiceStyle, setVoiceStyle] = useState('Formal')
  const [subtitleOption, setSubtitleOption] = useState('both')
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showPreview, setShowPreview] = useState<'source' | 'dubbed'>('dubbed')
  const [dragActive, setDragActive] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState<'source' | 'target' | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleUpload = () => setUploaded(true)

  const handleGenerate = () => {
    if (!uploaded) return
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
        return prev + 1.5 + Math.random() * 2
      })
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setUploaded(true)
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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <Mic className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Dubbing Studio</h1>
        </div>
        <p className="text-text-secondary">Upload your video and auto-dub it in 30+ languages with AI-powered lip-sync.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel — Controls */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="lg:col-span-7 space-y-5"
        >
          {/* Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative bg-[#16161F] border-2 border-dashed rounded-xl p-8 transition-all ${
              dragActive ? 'border-accent-cyan bg-accent-cyan/5' : uploaded ? 'border-accent-teal/40' : 'border-white/[0.08]'
            }`}
          >
            {uploaded ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent-teal/10 flex items-center justify-center">
                  <Film className="w-6 h-6 text-accent-teal" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">marketing_video.mp4</p>
                  <p className="text-xs text-text-muted">1920 &times; 1080 &middot; 2:34 &middot; 48 MB</p>
                </div>
                <button
                  onClick={() => setUploaded(false)}
                  className="text-xs text-text-muted hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#1A1A25] flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-accent-cyan" />
                </div>
                <p className="text-sm font-medium text-text-primary mb-1">Drag & drop your video here</p>
                <p className="text-xs text-text-muted mb-3">MP4, MOV, or AVI — up to 500 MB</p>
                <button
                  onClick={handleUpload}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-text-primary hover:bg-white/10 transition-all"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {/* Language Selection */}
          <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold text-text-primary">Languages</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Source */}
              <div className="relative">
                <label className="block text-xs text-text-muted mb-1.5">Source Language</label>
                <button
                  onClick={() => setLangDropdownOpen(langDropdownOpen === 'source' ? null : 'source')}
                  className="w-full flex items-center justify-between bg-[#1A1A25] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary hover:border-accent-cyan/30 transition-all"
                >
                  <span>{sourceLang}</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${langDropdownOpen === 'source' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langDropdownOpen === 'source' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute z-10 top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-[#1A1A25] border border-white/[0.08] rounded-lg shadow-xl"
                    >
                      {languages.map((l) => (
                        <button
                          key={l}
                          onClick={() => { setSourceLang(l); setLangDropdownOpen(null) }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${sourceLang === l ? 'text-accent-cyan bg-accent-cyan/10' : 'text-text-secondary hover:bg-white/5'}`}
                        >
                          {l}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Target */}
              <div className="relative">
                <label className="block text-xs text-text-muted mb-1.5">Target Language</label>
                <button
                  onClick={() => setLangDropdownOpen(langDropdownOpen === 'target' ? null : 'target')}
                  className="w-full flex items-center justify-between bg-[#1A1A25] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-text-primary hover:border-accent-cyan/30 transition-all"
                >
                  <span>{targetLang}</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${langDropdownOpen === 'target' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langDropdownOpen === 'target' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute z-10 top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-[#1A1A25] border border-white/[0.08] rounded-lg shadow-xl"
                    >
                      {languages.map((l) => (
                        <button
                          key={l}
                          onClick={() => { setTargetLang(l); setLangDropdownOpen(null) }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${targetLang === l ? 'text-accent-cyan bg-accent-cyan/10' : 'text-text-secondary hover:bg-white/5'}`}
                        >
                          {l}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Voice Style */}
          <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold text-text-primary">Voice Style</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {voiceStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => setVoiceStyle(style)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    voiceStyle === style
                      ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
                      : 'bg-white/5 text-text-muted border border-white/[0.06] hover:bg-white/10'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Subtitle Options */}
          <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Subtitles className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold text-text-primary">Subtitle Options</h3>
            </div>
            <div className="space-y-2">
              {subtitleOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSubtitleOption(opt.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    subtitleOption === opt.id
                      ? 'border-accent-cyan/30 bg-accent-cyan/10'
                      : 'border-white/[0.06] bg-[#12121A] hover:border-white/10'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    subtitleOption === opt.id ? 'border-accent-cyan' : 'border-text-muted'
                  }`}>
                    {subtitleOption === opt.id && <div className="w-2 h-2 rounded-full bg-accent-cyan" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{opt.name}</p>
                    <p className="text-xs text-text-muted">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate */}
          <button
            onClick={handleGenerate}
            disabled={!uploaded || generating}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all ${
              !uploaded || generating
                ? 'bg-white/5 text-text-muted cursor-not-allowed'
                : 'gradient-cyan text-white hover:brightness-110 hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20'
            }`}
          >
            {generating ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                Processing... {Math.round(progress)}%
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Start Dubbing
              </>
            )}
          </button>

          {/* Progress */}
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
                    <span className="text-sm text-text-secondary">AI dubbing in progress...</span>
                  </div>
                  <span className="text-xs text-text-muted font-mono">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-[#1A1A25] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full gradient-cyan"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-text-muted">
                  <span>Transcription</span>
                  <span>Translation</span>
                  <span>Voice synthesis</span>
                  <span>Sync & render</span>
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
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Preview</h3>
              {showResult ? (
                <div>
                  {/* Language tabs */}
                  <div className="flex gap-1 mb-3 p-1 bg-[#12121A] rounded-lg">
                    <button
                      onClick={() => setShowPreview('source')}
                      className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                        showPreview === 'source' ? 'bg-[#1A1A25] text-accent-cyan' : 'text-text-muted hover:text-text-secondary'
                      }`}
                    >
                      {sourceLang}
                    </button>
                    <button
                      onClick={() => setShowPreview('dubbed')}
                      className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                        showPreview === 'dubbed' ? 'bg-[#1A1A25] text-accent-cyan' : 'text-text-muted hover:text-text-secondary'
                      }`}
                    >
                      {targetLang} (Dubbed)
                    </button>
                  </div>

                  <div className="relative rounded-xl overflow-hidden">
                    <VideoPlaceholder seed={`dubbed-${showPreview}`} width={480} height={270} label={showPreview === 'source' ? `${sourceLang} Original` : `${targetLang} Dubbed`} />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                        {showPreview === 'dubbed' && <Waveform isPlaying={true} barCount={12} className="h-4 opacity-80" />}
                        <span className="text-[10px] text-white/80">{showPreview === 'source' ? 'Original' : 'AI Dubbed'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg gradient-cyan text-white text-sm font-semibold hover:brightness-110 transition-all">
                      <Play className="w-4 h-4" />
                      Play Preview
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 text-text-primary text-sm hover:bg-white/10 transition-all">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 text-text-primary text-sm hover:bg-white/10 transition-all">
                        <FileText className="w-4 h-4" />
                        SRT File
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-[#12121A] border border-white/[0.06] flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#1A1A25] flex items-center justify-center mb-3">
                    <Film className="w-6 h-6 text-text-muted" />
                  </div>
                  <p className="text-sm text-text-muted">
                    {uploaded ? 'Ready to process' : 'Upload a video to begin'}
                  </p>
                  {generating && (
                    <div className="mt-4 flex items-center gap-2">
                      <Waveform isPlaying={true} barCount={20} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {showResult && (
              <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Dubbing Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-text-muted">Source</span><span className="text-text-primary">{sourceLang}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Target</span><span className="text-text-primary">{targetLang}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Voice Style</span><span className="text-text-primary">{voiceStyle}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Subtitles</span><span className="text-text-primary">{subtitleOptions.find(s => s.id === subtitleOption)?.name}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Duration</span><span className="text-text-primary">2:34</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Est. Cost</span><span className="text-accent-cyan font-medium">${((2 + 34/60) * (subtitleOption === 'both' ? 15 : 12)).toFixed(2)}</span></div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
