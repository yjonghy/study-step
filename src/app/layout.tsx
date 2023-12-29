"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Loader } from '@react-three/drei'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={"h-screen "}>
      {children}
      </body>
    </html>
  )
}
