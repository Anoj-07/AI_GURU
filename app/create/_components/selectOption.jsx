"use client"
import { index } from 'drizzle-orm/gel-core'
import React, { useState } from 'react'

function SelectOption({selectedStudyType}) {

    const Options = [
        {
            name: 'Exam',
        },
        {
            name: 'Job Interview',
        },
        {
            name: 'Practice',
        },
        {
            name: 'Coding Prep',
        },
        {
            name: 'other',
        },

    ]

    const [selectedOption, setSelectedOption] = useState();
    return (
        <div >
            <h2 className='text-center mb-2 text-lg'>For which you want to create your Personal study material</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>

                {Options.map((option, index) => (
                    <div key={index} className={`p-4 flex flex-col justify-center border rounded-lg hover:border-primary cursor-pointer ${option?.name == selectedOption && 'border-primary'}`}
                        onClick={() => {setSelectedOption(option.name); selectedStudyType(option.name)}}
                    >
                        <h2 className='font-bold'
                            key={index}>{option.name}</h2>
                    </div>
                ))

                }

            </div>
        </div>
    )
}

export default SelectOption
