import Link from 'next/link'
import { GlossaryTerm } from '@/types'

interface GlossaryListProps {
  terms: GlossaryTerm[];
}

export default function GlossaryList({ terms }: GlossaryListProps) {
  if (!terms || terms.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-bold mb-2">No glossary terms yet</h3>
        <p className="text-gray-600">
          Glossary terms will appear here once they are added to your Cosmic bucket.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {terms.map((term) => (
        <Link
          key={term.id}
          href={`/glossary/${term.slug}`}
          className="card hover:shadow-lg transition-all hover:border-primary"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold">{term.title}</h3>
            {term.metadata?.difficulty_level && (
              <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${
                term.metadata.difficulty_level === 'beginner' ? 'bg-green-100 text-green-800' :
                term.metadata.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {term.metadata.difficulty_level}
              </span>
            )}
          </div>

          {term.metadata?.definition && (
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {term.metadata.definition}
            </p>
          )}

          {term.metadata?.visual_aid && (
            <img
              src={`${term.metadata.visual_aid.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={term.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
              width={300}
              height={200}
            />
          )}

          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            View Details →
            {term.metadata?.isl_video && (
              <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                ISL Video
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}