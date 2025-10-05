import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">AccessiCaption</h3>
            <p className="text-gray-600 text-sm">
              Smart, personalized captions designed for deaf and hard-of-hearing users.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/captions" className="text-gray-600 hover:text-primary transition-colors">
                  Live Captions
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-gray-600 hover:text-primary transition-colors">
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-gray-600 hover:text-primary transition-colors">
                  Interactive Quiz
                </Link>
              </li>
              <li>
                <Link href="/preferences" className="text-gray-600 hover:text-primary transition-colors">
                  Preferences
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Accessibility</h3>
            <p className="text-gray-600 text-sm">
              This application meets WCAG 2.1 Level AA standards for accessibility.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-gray-600">
          <p>&copy; {currentYear} AccessiCaption. Built with Cosmic.</p>
        </div>
      </div>
    </footer>
  )
}