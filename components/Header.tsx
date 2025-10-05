import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            🎧 AccessiCaption
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/captions" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Captions
            </Link>
            <Link href="/glossary" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Glossary
            </Link>
            <Link href="/quiz" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Quiz
            </Link>
            <Link href="/preferences" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Settings
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}