import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PreferencesForm from '@/components/PreferencesForm'
import { getUserPreferences } from '@/lib/cosmic'

export default async function PreferencesPage() {
  const preferences = await getUserPreferences()
  const currentPreference = preferences[0] || null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              ⚙️ User Preferences
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Customize your caption experience to match your needs
            </p>
          </div>

          <PreferencesForm currentPreference={currentPreference} />
        </div>
      </main>

      <Footer />
    </div>
  )
}