import { Link } from 'react-router-dom'
import { Video, Globe, MessageCircle, Mail } from 'lucide-react'

const footerLinks = [
  {
    title: 'Products',
    links: [
      { to: '/spokesperson', label: 'AI Spokesperson' },
      { to: '/dubbing', label: 'Video Dubbing' },
      { to: '/youtube', label: 'YouTube Automation' },
      { to: '/voices', label: 'Voice Library' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/pricing', label: 'Pricing' },
      { to: '/', label: 'About' },
      { to: '/', label: 'Blog' },
      { to: '/', label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/', label: 'Documentation' },
      { to: '/', label: 'API Reference' },
      { to: '/', label: 'Changelog' },
      { to: '/', label: 'Status' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-cyan flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-text-primary">AI Studio</span>
            </Link>
            <p className="text-sm text-text-muted mb-4 max-w-[240px]">
              Create professional videos with AI-powered spokespersons, dubbing, and voice technology.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-text-primary mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-muted hover:text-accent-cyan transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; 2025 AI Video & Voice Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
