import Header from '@/components/Header'
import Footer from '@/components/Footer'
import QuizContainer from '@/components/QuizContainer'
import { getQuizQuestions } from '@/lib/cosmic'

export default async function QuizPage() {
  const questions = await getQuizQuestions()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              🎓 Interactive Quiz
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Test your understanding with interactive comprehension questions
            </p>
          </div>

          <QuizContainer questions={questions} />
        </div>
      </main>

      <Footer />
    </div>
  )
}