"use client"

import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ViewNotes = () => {

    const { courseId } = useParams();
    const [notes, setNotes] = useState();
    const [stepCount, setStepCount] = useState(0);
    const route = useRouter();
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        GetNotes();
    }, [])

    const GetNotes = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: "notes"
        })
        console.log(result?.data);
        setNotes(result?.data);
    }

    // if (loading)
    //     return <div className="text-center text-blue-500">Loading notes...</div>;
    // if (error) return <div className="text-center text-red-500">{error}</div>;

    let jsonObject = null;
    try {
        if (!notes || !notes[stepCount] || !notes[stepCount].notes) {
            throw new Error("Invalid notes data");
        }
        const jsonString = notes[stepCount].notes;
        console.log(jsonString);
        jsonObject = JSON.parse(jsonString);
        console.log("Content", jsonObject);
    } catch (err) {
        // console.error("Error parsing JSON:", err.message);
        return (
            <div >
                <DashboardHeader />
               <div className='flex flex-col items-center justify-center h-screen mt-3'>
                <h2>End of Notes</h2>
                <Button onClick={()=> route.back()} >Go Back</Button>
               </div>
            </div>
        );
    }


    return notes && (
        <div>
            <DashboardHeader />
            <div className='mx-10 md:mx-36 lg:px-60 mt-10'>

                <div className='flex gap-5 items-center'>
                    {stepCount != 0 && <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount - 1)}>Previous</Button>}
                    {notes?.map((item, index) => (
                        <div key={index} className={`w-full h-2 rounded-full
                    ${index < stepCount ? 'bg-blue-500' : 'bg-gray-300'}
                    `}>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount + 1)}>Next</Button>
                </div>

                {/* Render Content */}
                {jsonObject && (
                    <div className='mt-3'>
                        <div className="flex text-2xl font-bold mb-3">
                            <span className="pr-3">{jsonObject.emoji}</span>
                            {jsonObject.chapterTitle}
                        </div>
                        <p className="text-gray-700 mb-5">{jsonObject.chapterSummary}</p>

                        {jsonObject.topics.map((topic, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-100 rounded-lg shadow-md mb-4"
                            >
                                <h1 className="text-lg font-bold mb-2">{topic?.topicTitle}</h1>
                                {/* Render Markdown Content */}
                                <ReactMarkdown
                                    children={topic?.content}
                                    remarkPlugins={[remarkGfm]}
                                />
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </div>
    )
}

export default ViewNotes
