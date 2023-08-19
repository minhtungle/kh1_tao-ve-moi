import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-image-crop/dist/ReactCrop.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Unicorn Ultra',
  description: 'The Legend Fire',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./logo.jpeg" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
