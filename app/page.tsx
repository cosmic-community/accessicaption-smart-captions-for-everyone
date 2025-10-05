import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FeatureCard from '@/components/FeatureCard'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🎧 AccessiCaption
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Smart, Personalized Captions for Everyone
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">
              Experience videos and live streams with intelligent captions designed specifically for deaf and hard-of-hearing users. Adaptive simplification, visual enhancements, and interactive learning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/captions" className="btn-primary bg-white text-primary hover:bg-gray-100">
                Start Captioning
              </Link>
              <Link href="/glossary" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
                Explore Glossary
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon="🎚️"
                title="Adaptive Simplification"
                description="Three levels (Easy, Medium, Verbatim) that adjust complexity in real-time based on your preference."
              />
              <FeatureCard
                icon="📚"
                title="Smart Glossary"
                description="Interactive dictionary with visual definitions and Indian Sign Language (ISL) video demonstrations."
              />
              <FeatureCard
                icon="🎭"
                title="Dynamic Formatting"
                description="Captions visually represent volume, emotion, pace, and emphasis through text styling."
              />
              <FeatureCard
                icon="👥"
                title="Speaker Identification"
                description="Color-coded text for up to 8 different speakers with persistent visual identity."
              />
              <FeatureCard
                icon="🔔"
                title="Sound Event Captions"
                description="Visual indicators for environmental sounds with contextual icons and emojis."
              />
              <FeatureCard
                icon="🎓"
                title="Interactive Quizzes"
                description="Engaging comprehension checks to test understanding of captioned content."
              />
              <FeatureCard
                icon="⚙️"
                title="Full Personalization"
                description="Extensive customization for caption appearance, speed, and UI preferences."
              />
              <FeatureCard
                icon="📱"
                title="Cross-Device"
                description="Seamless experience across desktop, tablet, and mobile devices."
              />
              <FeatureCard
                icon="♿"
                title="WCAG Compliant"
                description="Meets WCAG 2.1 Level AA standards for accessibility and usability."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Choose Your Content</h3>
                  <p className="text-gray-600">
                    Upload a video or connect to a live stream. Our system supports multiple video formats and streaming protocols.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Customize Your Experience</h3>
                  <p className="text-gray-600">
                    Set your simplification level, adjust caption appearance, and enable features like speaker colors and sound events.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Watch with Smart Captions</h3>
                  <p className="text-gray-600">
                    Experience intelligent captions that adapt to your needs, with interactive glossary terms and visual enhancements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Learn and Test</h3>
                  <p className="text-gray-600">
                    Take interactive quizzes to test comprehension and explore the glossary with ISL video demonstrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Better Captions?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who rely on AccessiCaption for accessible video content
            </p>
            <Link href="/captions" className="btn-primary bg-white text-primary hover:bg-gray-100 inline-block">
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}