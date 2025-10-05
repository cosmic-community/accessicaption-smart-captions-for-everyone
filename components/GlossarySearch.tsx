'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GlossarySearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/glossary?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="card">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search glossary terms..."
          className="input-field flex-grow"
        />
        <button type="submit" className="btn-primary">
          🔍 Search
        </button>
      </div>
    </form>
  )
}