"use client"
import React, { useState } from 'react'

function SelectOption({ selectedStudyType }) {
    const Options = [
        { name: 'Exam', emoji: '📚' },
        { name: 'Job Interview', emoji: '💼' },
        { name: 'Practice', emoji: '🏋️' },
        { name: 'Coding Prep', emoji: '💻' },
        { name: 'Other', emoji: '✨' },
    ]

    const [selectedOption, setSelectedOption] = useState(null)

    return (
        <div className='space-y-6'>
            <h2 className='text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                What's Your Learning Goal?
            </h2>
            
            <div className='flex flex-wrap justify-center gap-4'>
                {Options.map((option, index) => (
                    <button
                        key={index}
                        className={`w-48 p-6 rounded-xl transition-all duration-300 
                            ${option.name === selectedOption 
                                ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg' 
                                : 'bg-white border border-gray-200 hover:border-blue-100 hover:shadow-md'
                            }
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        onClick={() => {
                            setSelectedOption(option.name)
                            selectedStudyType(option.name)
                        }}
                    >
                        <div className='flex flex-col items-center space-y-3'>
                            <span className='text-3xl'>{option.emoji}</span>
                            <h3 className={`text-lg font-semibold 
                                ${option.name === selectedOption 
                                    ? 'text-blue-600' 
                                    : 'text-gray-700'
                                }`}
                            >
                                {option.name}
                            </h3>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SelectOption