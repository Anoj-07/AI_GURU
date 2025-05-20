import React from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Loader, RefreshCcw } from 'lucide-react'
import Link from 'next/link'


const CourseCardItem = ({ course }) => {
    return (
        <div className='border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 bg-white group'>
            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <div className='p-3 bg-blue-50 rounded-lg transition-transform duration-300 group-hover:scale-105'>
                        <Image
                            src={'/knowledge.png'}
                            alt='course'
                            width={64}
                            height={64}
                            className='w-16 h-16 object-contain'
                        />
                    </div>
                    <span className='text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium'>
                        {new Date().toLocaleDateString()}
                    </span>
                </div>

                <div>
                    <h2 className='text-xl font-semibold text-gray-800 tracking-tight'>
                        {course.courseLayout.courseTitle}
                    </h2>
                    <p className='text-sm text-gray-500 mt-2 line-clamp-4 leading-relaxed'>
                        {course.courseLayout.courseSummary}
                    </p>
                </div>

                <div className='space-y-2'>
                    <div className='flex justify-between text-xs font-medium text-gray-600'>
                        <span>Progress</span>
                        <span>0%</span>
                    </div>
                    <Progress
                        value={0}
                        className='h-2 bg-gray-100 [&>div]:bg-blue-500'
                    />
                </div>

                <div className='flex justify-end'>
                    {course?.status === 'Generating' ? (
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium'>
                            <Loader className='w-4 h-4 animate-spin' />
                            Generating Content
                        </div>
                    ) : (
                        <Link href={'/course/' + course?.courseId}>
                            <Button
                                className='bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm transition-all cursor-pointer'
                                size="sm"
                            >
                                View Course
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseCardItem
