import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Library,
  Search,
  Play,
  Pause,
  Heart,
  Mic,
  Globe,
  User,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { voices } from '../data'
import Waveform from '../components/Waveform'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

const categories = ['All', 'Male', 'Female', 'English', 'Spanish', 'French', 'German', 'Asian', 'European']

const languageGroups: Record<string, string[]> = {
  'Asian': ['Japanese', 'Chinese', 'Korean', 'Hindi', 'Arabic', 'Indonesian', 'Malay', 'Filipino', 'Thai', 'Vietnamese'],
  'European': ['English', 'Spanish', 'French', 'German', 'Italian', 'Dutch', 'Portuguese', 'Russian', 'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Greek', 'Czech', 'Romanian', 'Hungarian', 'Croatian', 'Ukrainian', 'Hebrew', 'Turkish'],
}

export default function Voices() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [playing, setPlaying] = useState<string | null>(null)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredVoices = voices.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.language.toLowerCase().includes(search.toLowerCase()) ||
      v.style.toLowerCase().includes(search.toLowerCase()) ||
      v.accent.toLowerCase().includes(search.toLowerCase())

    if (!matchesSearch) return false

    if (category === 'All') return true
    if (category === 'Male') return v.gender === 'male'
    if (category === 'Female') return v.gender === 'female'
    if (category === 'English') return v.language === 'English'
    if (category === 'Spanish') return v.language === 'Spanish'
    if (category === 'French') return v.language === 'French'
    if (category === 'German') return v.language === 'German'
    if (category === 'Asian') return languageGroups.Asian.includes(v.language)
    if (category === 'European') return languageGroups.European.includes(v.language)
    return true
  })

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <Library className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Voice Library</h1>
        </div>
        <p className="text-text-secondary">Browse {voices.length}+ AI voices across multiple languages, accents, and styles.</p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, language, accent, or style..."
            className="w-full bg-[#16161F] border border-white/[0.06] rounded-xl pl-11 pr-10 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-text-muted hover:text-text-primary" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <SlidersHorizontal className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
                  : 'bg-white/5 text-text-muted border border-white/[0.06] hover:bg-white/10 hover:text-text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results Count */}
      <p className="text-xs text-text-muted mb-4">
        Showing {filteredVoices.length} voice{filteredVoices.length !== 1 ? 's' : ''}
      </p>

      {/* Voice Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredVoices.map((voice, i) => (
          <motion.div
            key={voice.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
          >
            <div className="bg-[#16161F] border border-white/[0.06] rounded-xl p-4 hover:border-cyan-500/15 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 group">
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${voice.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {voice.name[0]}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPlaying(playing === voice.id ? null : voice.id)}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-cyan/15 hover:border-accent-cyan/30 transition-all"
                  >
                    {playing === voice.id ? (
                      <Pause className="w-3.5 h-3.5 text-accent-cyan" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-text-secondary ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleFavorite(voice.id)}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        favorites.has(voice.id) ? 'text-red-500 fill-red-500' : 'text-text-muted'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-sm font-semibold text-text-primary mb-0.5">{voice.name}</h3>
              <div className="flex items-center gap-1.5 mb-3">
                <Globe className="w-3 h-3 text-text-muted" />
                <span className="text-xs text-text-muted">{voice.language} &middot; {voice.accent}</span>
              </div>

              {/* Waveform */}
              {playing === voice.id && (
                <div className="mb-3">
                  <Waveform isPlaying={true} barCount={20} />
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/[0.06] text-[10px] text-text-muted flex items-center gap-1">
                  <User className="w-2.5 h-2.5" />
                  {voice.gender === 'male' ? 'M' : 'F'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/[0.06] text-[10px] text-text-muted flex items-center gap-1">
                  <Mic className="w-2.5 h-2.5" />
                  {voice.style}
                </span>
                {voice.tags.slice(0, 1).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-[10px] text-accent-cyan">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredVoices.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-8 h-8 text-text-muted mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No voices match your search</p>
          <button
            onClick={() => { setSearch(''); setCategory('All') }}
            className="mt-2 text-xs text-accent-cyan hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
