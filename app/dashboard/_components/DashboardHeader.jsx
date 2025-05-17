import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='bg-white shadow-lg flex justify-between items-center p-6 rounded-lg'>
      <div className='flex items-center space-x-4'>
       {/* <Image/> */}
       
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  )
}

export default DashboardHeader
