'use client'

import { useState } from 'react'
import { QuizQuestion } from '@/types'

interface QuizQuestionCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  isAnswered: boolean;
}

export default function QuizQuestionCard({ question, onAnswer, onNext, isAnswered }: QuizQuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  if (!question || !question.metadata) {
    return null
  }

  const allAnswers = [
    question.metadata.correct_answer,
    ...(question.metadata.incorrect_answers || [])
  ].sort(() => Math.random() - 0.5)

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return

    setSelectedAnswer(answer)
    const isCorrect = answer === question.metadata?.correct_answer
    onAnswer(isCorrect)
    setShowExplanation(true)
  }

  const isCorrect = selectedAnswer === question.metadata.correct_answer

  return (
    <div className="card">
      {/* Difficulty Badge */}
      {question.metadata.difficulty_level && (
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            question.metadata.difficulty_level === 'beginner' ? 'bg-green-100 text-green-800' :
            question.metadata.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {question.metadata.difficulty_level.charAt(0).toUpperCase() + question.metadata.difficulty_level.slice(1)}
          </span>
        </div>
      )}

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-bold mb-6">
        {question.metadata.question_text}
      </h3>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            disabled={isAnswered}
            className={`quiz-option ${
              selectedAnswer === answer ? 'selected' : ''
            } ${
              isAnswered && answer === question.metadata.correct_answer ? 'correct' : ''
            } ${
              isAnswered && selectedAnswer === answer && !isCorrect ? 'incorrect' : ''
            }`}
          >
            {answer}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && question.metadata.explanation && (
        <div className={`p-4 rounded-lg mb-4 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <h4 className={`font-bold mb-2 ${
            isCorrect ? 'text-green-900' : 'text-red-900'
          }`}>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </h4>
          <p className={isCorrect ? 'text-green-800' : 'text-red-800'}>
            {question.metadata.explanation}
          </p>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <button onClick={onNext} className="btn-primary w-full">
          Next Question →
        </button>
      )}
    </div>
  )
}