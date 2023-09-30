import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LanCache Web',
  description: 'Display LanCache data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
