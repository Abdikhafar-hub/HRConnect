import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HR Sourcing',
  description: 'Created with HR Sourcing',
  generator: 'HR Sourcing',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
