"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WelcomeBanner = () => {
    const { user } = useUser();

    return (
        <div className='p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl relative overflow-hidden'>
            {/* Decorative background elements */}
            <div className='absolute -right-8 -top-8 w-32 h-32 bg-purple-400/20 rounded-full blur-xl'></div>
            <div className='absolute -left-8 -bottom-8 w-40 h-40 bg-blue-400/20 rounded-full blur-xl'></div>
            
            <div className='flex flex-col md:flex-row items-center justify-between relative z-10'>
                {/* Text Content */}
                <div className='space-y-4 text-white'>
                    <div className='space-y-2'>
                        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
                            Welcome Back, {user?.fullName} 👋
                        </h2>
                        <p className='text-xl md:text-2xl font-medium text-white/90'>
                            Ready to continue your learning journey?
                        </p>
                    </div>
                    <p className='text-lg text-white/80 max-w-2xl'>
                        Let's unlock new skills and achieve your goals together!
                    </p>
                </div>

                {/* Profile Image */}
                {user?.imageUrl && (
                    <div className='mt-6 md:mt-0 relative group'>
                        <div className='w-24 h-24 md:w-32 md:h-32 relative rounded-full border-4 border-white/20 group-hover:border-white/40 transition-all overflow-hidden'>
                            <Image
                                src={user.imageUrl}
                                alt='Profile'
                                layout='fill'
                                objectFit='cover'
                                className='group-hover:scale-105 transition-transform duration-300'
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WelcomeBanner