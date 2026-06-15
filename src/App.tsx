import { HashRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Spokesperson = lazy(() => import('./pages/Spokesperson'))
const Dubbing = lazy(() => import('./pages/Dubbing'))
const YouTube = lazy(() => import('./pages/YouTube'))
const Voices = lazy(() => import('./pages/Voices'))
const Pricing = lazy(() => import('./pages/Pricing'))

function App() {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spokesperson" element={<Spokesperson />} />
            <Route path="/dubbing" element={<Dubbing />} />
            <Route path="/youtube" element={<YouTube />} />
            <Route path="/voices" element={<Voices />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-[60dvh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-text-muted">Loading...</p>
      </div>
    </div>
  )
}

export default App
