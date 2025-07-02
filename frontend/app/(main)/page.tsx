'use client'
import FAQ from '@/components/faq/faq'
import Footer from '@/components/footer/footer'
import Hero from '@/components/home/hero'
import Instructors from '@/components/instructors/instructors'
import React from 'react'


export default function home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <Hero/>
      <Instructors/>
      <FAQ/>
      <Footer/>
    </>
  )
}
