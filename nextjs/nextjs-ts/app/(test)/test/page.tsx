"use client"

import Link from "next/link"

export default function Page() {
  return <main>
    <h1 className="text-3xl font-bold underline">Hello, News page!</h1>
    <Link href="/test/nextjs-is-a-great-framework">
      NextJS Is A Great Framework
    </Link>
  </main>
}