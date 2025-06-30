'use client'
import Footer from '@/components/footer/footer'
import Hero from '@/components/home/hero'
import FancyMultiSelect from '@/components/home/tx'
import React from 'react'


export default function home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <Hero/>
      <Footer/>
    </>
  )
}
