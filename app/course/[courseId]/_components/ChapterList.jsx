import React from 'react'

const ChapterList = ({ course }) => {
    const CHAPTERS = course?.courseLayout?.chapters

    return (
        <div className='mt-5'>
            <h2 className='font-medium text-xl'>Chapters</h2>

            <div>
                {CHAPTERS?.map((chapter, index) => (
                    <div className='flex gap-5 items-center p-4 border shadow-md rounded-lg cursor-pointer' key={index}>
                        <h2 className='text-2xl'>{chapter?.emoji}</h2>
                        <div>
                            <h2 className='font-medium'>{chapter?.chapterTitle}</h2>
                            <p className='text-gray-500 text-sm'>{chapter?.chapterSummary}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ChapterList
