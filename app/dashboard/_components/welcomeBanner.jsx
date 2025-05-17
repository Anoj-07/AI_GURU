"use client"
import { useUser } from '@clerk/nextjs'
// import Image from 'next/image'
import React from 'react'

const WelcomeBanner = () => {

    const {user} = useUser();
  return (
    <div className='p-5 bg-black text-white rounded-lg'>
      {/* <Image src={logo.svg}/> */}
      <div>
        <h2 className='font-bold text-5xl'>Hello, {user?.fullName}</h2>
        <p className='font-bold text-3xl'>welcome Back,</p>
      </div>
      <p className='mt-5'>Its time to get back and start learning</p>
    </div>
  )
}

export default WelcomeBanner
