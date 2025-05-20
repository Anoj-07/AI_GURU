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
            <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)]">
                <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                <h2 className="mt-4 text-lg font-medium text-gray-600">Loading Notes</h2>
            </div>
        );
    }


    return notes && (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Progress Navigation */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setStepCount(stepCount - 1)}
                            disabled={stepCount === 0}
                            className="gap-1 px-4 py-2 rounded-xl border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            ← Previous
                        </Button>

                        <div className="flex flex-1 items-center gap-2">
                            {notes?.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${index <= stepCount
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                        : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setStepCount(stepCount + 1)}
                            disabled={stepCount === notes.length - 1}
                            className="gap-1 px-4 py-2 rounded-xl border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Next →
                        </Button>
                    </div>

                    {/* Content Container */}
                    {jsonObject && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            {/* Chapter Header */}
                            <div className="mb-8 flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-xl text-2xl">
                                    {jsonObject.emoji}
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {jsonObject.chapterTitle}
                                    </h1>
                                    <p className="mt-2 text-gray-600">
                                        {jsonObject.chapterSummary}
                                    </p>
                                </div>
                            </div>

                            {/* Topics Grid */}
                            <div className="space-y-6">
                                {jsonObject.topics.map((topic, index) => (
                                    <div
                                        key={index}
                                        className="group p-6 rounded-xl border border-gray-200 hover:border-blue-200 transition-all"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center">
                                                {index + 1}
                                            </div>
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                {topic.topicTitle}
                                            </h2>
                                        </div>

                                        <div className="prose prose-gray max-w-none 
    prose-p:text-gray-600
    prose-ul:list-disc prose-ul:pl-6
    prose-ol:list-decimal prose-ol:pl-6
    prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-xl">
                                            <ReactMarkdown
                                                children={topic.content}
                                                remarkPlugins={[remarkGfm]}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {stepCount === notes.length - 1 && (
                                <div className="mt-8 flex justify-end">
                                    <Button
                                        onClick={() => route.back()}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                                    >
                                        ← Back to Dashboard
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )

}

export default ViewNotes
