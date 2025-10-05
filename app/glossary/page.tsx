import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GlossarySearch from '@/components/GlossarySearch'
import GlossaryList from '@/components/GlossaryList'
import { getGlossaryTerms } from '@/lib/cosmic'

export default async function GlossaryPage() {
  const terms = await getGlossaryTerms()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              📚 Smart Glossary
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive glossary with visual definitions and ISL video demonstrations
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <GlossarySearch />
          </div>

          {/* Terms List */}
          <GlossaryList terms={terms} />
        </div>
      </main>

      <Footer />
    </div>
  )
}