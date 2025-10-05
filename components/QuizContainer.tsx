'use client'

import { useState } from 'react'
import { QuizQuestion } from '@/types'
import QuizQuestionCard from '@/components/QuizQuestionCard'

interface QuizContainerProps {
  questions: QuizQuestion[];
}

export default function QuizContainer({ questions }: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [quizCompleted, setQuizCompleted] = useState(false)

  if (!questions || questions.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">🎓</div>
        <h3 className="text-xl font-bold mb-2">No quiz questions available</h3>
        <p className="text-gray-600">
          Quiz questions will appear here once they are added to your Cosmic bucket.
        </p>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (!currentQuestion) {
    return null
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + (currentQuestion.metadata?.points || 10))
    }

    const newAnswered = new Set(answeredQuestions)
    newAnswered.add(currentQuestionIndex)
    setAnsweredQuestions(newAnswered)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions(new Set())
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    const maxScore = questions.reduce((sum, q) => sum + (q.metadata?.points || 10), 0)
    const percentage = Math.round((score / maxScore) * 100)

    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <div className="mb-6">
          <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
          <p className="text-xl text-gray-600">
            You scored {score} out of {maxScore} points
          </p>
        </div>
        <button onClick={handleRestart} className="btn-primary">
          🔄 Restart Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium">
            Score: {score} points
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <QuizQuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        onNext={handleNext}
        isAnswered={answeredQuestions.has(currentQuestionIndex)}
      />
    </div>
  )
}