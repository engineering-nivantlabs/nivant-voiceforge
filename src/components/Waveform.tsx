import { memo } from 'react'

interface WaveformProps {
  isPlaying?: boolean
  barCount?: number
  className?: string
}

const Waveform = memo(function Waveform({ isPlaying = true, barCount = 24, className = '' }: WaveformProps) {
  return (
    <div className={`flex items-center gap-[2px] h-8 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        const height = 30 + Math.sin((i / barCount) * Math.PI * 2) * 40 + Math.random() * 30
        const delay = i * 0.05
        return (
          <div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: `${height}%`,
              background: 'linear-gradient(to top, #06B6D4, #14B8A6)',
              animation: isPlaying ? `wave 1s ease-in-out infinite alternate` : 'none',
              animationDelay: `${delay}s`,
              opacity: 0.7 + (i % 3) * 0.1,
            }}
          />
        )
      })}
    </div>
  )
})

export default Waveform
