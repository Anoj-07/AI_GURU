"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LayoutDashboard, Shield, UserCircle, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const MenuList = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        // {
        //     name: 'Upgrade',
        //     icon: Shield,
        //     path: '/dashboard/upgrade'
        // },
        // {
        //     name: 'Profile',
        //     icon: UserCircle,
        //     path: '/dashboard/profile'
        // }
    ]

    const path = usePathname();

    return (
        <div className='h-screen w-[280px] border-r bg-white/95 backdrop-blur-sm flex flex-col p-4 space-y-8'>
            {/* Logo Section */}
            <div className='flex gap-3 items-center px-2 pb-4 border-b'>
                <Image 
                    src={"/logo.svg"} 
                    alt="logo" 
                    width={48} 
                    height={48}
                    className='w-10 h-10 rounded-lg'
                />
                <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Ai Guru
                </h2>
            </div>

            {/* Main Content */}
            <div className='flex-1 flex flex-col space-y-6 mt-10 '>
                <Link href={'/create'} className='w-full'>
                    <Button className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-md transition-all cursor-pointer">
                        <Plus className='w-4 h-4 mr-2' />
                        Create New
                    </Button>
                </Link>

                {/* Menu Items */}
                <nav className='space-y-1'>
                    {MenuList.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.path}
                            className={`flex items-center p-3 space-x-3 rounded-lg transition-all duration-200
                                ${
                                    path === menu.path 
                                    ? 'bg-purple-50 text-purple-600 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <menu.icon className={`w-5 h-5 ${path === menu.path ? 'text-purple-500' : 'text-gray-400'}`} />
                            <span className='text-sm'>{menu.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Credits Section */}
            {/* <div className='p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100'>
                <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm font-medium text-gray-700'>Credits</span>
                        <span className='text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full'>
                            4/5 Left
                        </span>
                    </div>
                    <Progress 
                        value={30} 
                        className='h-2 bg-gray-200 [&>div]:bg-gradient-to-r from-blue-400 to-purple-400'
                    />
                    <Link 
                        href='/dashboard/upgrade'
                        className='inline-block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'
                    >
                        Upgrade Plan →
                    </Link>
                </div>
            </div> */}
        </div>
    )
}

export default Sidebar