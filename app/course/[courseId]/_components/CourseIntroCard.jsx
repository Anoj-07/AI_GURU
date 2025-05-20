import React from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

function CourseIntroCard({ course }) {
  return (
    <div className='group grid md:grid-cols-2 gap-6 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <div className='relative h-48 w-full overflow-hidden rounded-2xl bg-white p-4'>
        <div className='flex h-full items-center justify-center'>
          <div className='relative h-32 w-32'>
            <Image 
              src={course?.courseLayout?.emoji || '/knowledge.png'} 
              alt='course'
              fill
              className='object-contain'
            />
          </div>
        </div>
        {course?.status === 'Generating' && (
          <div className='absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-xs font-medium text-purple-600 shadow-sm'>
            Generating...
          </div>
        )}
      </div>

      <div className='flex flex-col justify-between'>
        <div>
          <h2 className='text-3xl font-bold text-gray-800 mb-3'>
            {course?.courseLayout?.courseTitle}
          </h2>
          <p className='text-gray-600 text-lg leading-relaxed'>
            {course?.courseLayout?.courseSummary}
          </p>
        </div>

        <div className='mt-6 space-y-4'>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm font-medium text-gray-600'>
              <span>Course Progress</span>
              <span>0%</span>
            </div>
            <Progress 
              value={0} 
              className='h-2.5 bg-gray-200 [&>div]:bg-gradient-to-r from-blue-400 to-purple-400'
            />
          </div>

          <div className='flex items-center gap-2 text-blue-500'>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
            </svg>
            <span className='font-medium'>
              {course?.courseLayout?.chapters?.length || 0} Chapters
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseIntroCard