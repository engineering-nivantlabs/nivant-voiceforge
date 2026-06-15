import { useRef, useEffect, memo } from 'react'
import { Play } from 'lucide-react'

interface VideoPlaceholderProps {
  seed?: string
  label?: string
  width?: number
  height?: number
  showPlay?: boolean
  className?: string
}

const VideoPlaceholder = memo(function VideoPlaceholder({
  seed = 'default',
  label,
  width = 640,
  height = 360,
  showPlay = true,
  className = '',
}: VideoPlaceholderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width * 2
    canvas.height = height * 2
    ctx.scale(2, 2)

    // Pseudo-random from seed
    let hash = 0
    for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0
    const rng = () => {
      hash = ((hash * 16807) | 0 % 2147483647)
      return (hash & 0x7fffffff) / 0x7fffffff
    }

    // Background gradient
    const hue1 = 200 + rng() * 40
    const hue2 = 160 + rng() * 40
    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, `hsl(${hue1}, 40%, 12%)`)
    grad.addColorStop(0.5, `hsl(${hue2}, 35%, 8%)`)
    grad.addColorStop(1, `hsl(${hue1 + 20}, 30%, 10%)`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // Abstract shapes
    for (let i = 0; i < 8; i++) {
      const x = rng() * width
      const y = rng() * height
      const r = 50 + rng() * 200
      const circleGrad = ctx.createRadialGradient(x, y, 0, x, y, r)
      circleGrad.addColorStop(0, `hsla(${180 + rng() * 40}, 60%, 50%, 0.08)`)
      circleGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = circleGrad
      ctx.fillRect(0, 0, width, height)
    }

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.03)'
    ctx.lineWidth = 1
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Waveform pattern
    const waveY = height / 2
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    for (let x = 0; x < width; x++) {
      const y = waveY + Math.sin(x * 0.02 + rng() * 10) * 30 + Math.sin(x * 0.05) * 15
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Second waveform
    ctx.strokeStyle = 'rgba(20, 184, 166, 0.15)'
    ctx.beginPath()
    for (let x = 0; x < width; x++) {
      const y = waveY + Math.sin(x * 0.03 + rng() * 5) * 20 + Math.cos(x * 0.07) * 10
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Label
    if (label) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '500 12px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(label, width / 2, height - 16)
    }
  }, [seed, label, width, height])

  return (
    <div className={`relative rounded-xl overflow-hidden bg-[#12121A] ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width, height }}
        className="w-full h-auto"
      />
      {showPlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all hover:scale-110">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>
      )}
    </div>
  )
})

export default VideoPlaceholder
