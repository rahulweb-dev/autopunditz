'use client'

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const done = searchParams.get("done")

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-3">You've been unsubscribed</h1>
          <p className="text-gray-500 mb-6">
            You won't receive newsletter emails from AutoPunditz anymore.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Back to AutoPunditz
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-3">Unsubscribe</h1>
        <p className="text-gray-500 mb-6">
          Click the unsubscribe link in your email to stop receiving AutoPunditz
          newsletters.
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          Back to AutoPunditz
        </Link>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeContent />
    </Suspense>
  )
}
