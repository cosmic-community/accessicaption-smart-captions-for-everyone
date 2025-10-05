import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaptionPlayer from '@/components/CaptionPlayer'
import CaptionControls from '@/components/CaptionControls'

export default function CaptionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Live Captions
          </h1>
          
          <div className="space-y-6">
            {/* Caption Player */}
            <div className="card">
              <CaptionPlayer />
            </div>

            {/* Caption Controls */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Caption Settings</h2>
              <CaptionControls />
            </div>

            {/* Instructions */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-xl font-bold mb-3 text-blue-900">💡 How to Use</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Upload a video file or paste a live stream URL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Adjust caption settings using the controls below</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>Click on highlighted words to see definitions in the glossary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>Watch for sound event indicators (🔔, 🎵, 👏) in the captions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}