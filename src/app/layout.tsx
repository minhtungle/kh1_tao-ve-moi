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
        <link rel="apple-touch-icon" sizes="180x180" href="./favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="./favicon_io/favicon-16x16.png" />
        {/* <link rel="manifest" href="./favicon_io/site.webmanifest" /> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
