// app/glossary/[slug]/page.tsx
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ISLVideoPlayer from '@/components/ISLVideoPlayer'
import { getGlossaryTermBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'

async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)

  if (!term) {
    notFound()
  }

  const islVideo = term.metadata?.isl_video
  const relatedTerms = term.metadata?.related_terms || []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/glossary"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
          >
            ← Back to Glossary
          </Link>

          {/* Term Card */}
          <div className="card">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {term.title}
            </h1>

            {/* Difficulty Badge */}
            {term.metadata?.difficulty_level && (
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  term.metadata.difficulty_level === 'beginner' ? 'bg-green-100 text-green-800' :
                  term.metadata.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {term.metadata.difficulty_level.charAt(0).toUpperCase() + term.metadata.difficulty_level.slice(1)}
                </span>
              </div>
            )}

            {/* Pronunciation */}
            {term.metadata?.pronunciation && (
              <p className="text-lg text-gray-600 mb-4">
                <span className="font-medium">Pronunciation:</span> {term.metadata.pronunciation}
              </p>
            )}

            {/* Definition */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Definition</h2>
              <p className="text-lg text-gray-700">
                {term.metadata?.definition}
              </p>
            </div>

            {/* Example Sentence */}
            {term.metadata?.example_sentence && (
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h2 className="text-lg font-bold mb-2 text-blue-900">Example</h2>
                <p className="text-gray-700 italic">
                  "{term.metadata.example_sentence}"
                </p>
              </div>
            )}

            {/* Synonyms */}
            {term.metadata?.synonyms && term.metadata.synonyms.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Synonyms</h2>
                <div className="flex flex-wrap gap-2">
                  {term.metadata.synonyms.map((synonym, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Aid */}
            {term.metadata?.visual_aid && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Visual Aid</h2>
                <img 
                  src={`${term.metadata.visual_aid.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={`Visual aid for ${term.title}`}
                  className="w-full max-w-2xl rounded-lg shadow-md"
                  width={400}
                  height={300}
                />
              </div>
            )}

            {/* ISL Video */}
            {islVideo && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">ISL Video Demonstration</h2>
                <ISLVideoPlayer video={islVideo} />
              </div>
            )}

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3">Related Terms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedTerms.map((relatedTerm) => (
                    <Link
                      key={relatedTerm.id}
                      href={`/glossary/${relatedTerm.slug}`}
                      className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all"
                    >
                      <h3 className="font-bold text-lg">{relatedTerm.title}</h3>
                      {relatedTerm.metadata?.definition && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {relatedTerm.metadata.definition}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default GlossaryTermPage