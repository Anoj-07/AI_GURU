"use client";

import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ViewQA() {
    const { courseId } = useParams();
    const [qaData, setQaData] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAnswer, setShowAnswer] = useState(true);
    const route = useRouter();

    useEffect(() => {
        GetQA();
    }, [courseId]);

    const GetQA = async () => {
        try {
            setLoading(true);
            const result = await axios.post("/api/study-type", {
                courseId: courseId,
                studyType: "Question/Answer",
            });
            setQaData(result.data.content.questions);
        } catch (err) {
            setError("Failed to fetch QA data");
        } finally {
            setLoading(false);
        }
    };

    const prevStep = () => setStepCount(prev => Math.max(0, prev - 1));
    const nextStep = () => setStepCount(prev => Math.min(qaData.length - 1, prev + 1));

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center space-y-4">
                    <div className="animate-bounce">
                        <div className="w-12 h-12 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-xl font-semibold text-gray-700">Loading Knowledge Bank...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
                    <Button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (!qaData.length) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Q/A Data Available</h2>
                    <Button
                        onClick={() => route.back()}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                        Return to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <DashboardHeader />

            <main className="mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    {/* Progress Navigation */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={stepCount === 0}
                            className="gap-1 px-4 py-2 rounded-xl border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            ← Previous
                        </Button>

                        <div className="flex flex-1 items-center gap-2">
                            {qaData.map((_, index) => (
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
                            onClick={nextStep}
                            disabled={stepCount === qaData.length - 1}
                            className="gap-1 px-4 py-2 rounded-xl border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Next →
                        </Button>
                    </div>

                    {/* QA Content */}
                    <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-inner">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-blue-100 p-3 rounded-lg text-2xl">❓</div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                {qaData[stepCount].question}
                            </h1>
                        </div>

                        <Button
                            onClick={() => setShowAnswer(!showAnswer)}
                            className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                        >
                            {showAnswer ? "Hide Answer" : "Reveal Answer"}
                        </Button>

                        <div className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
              ${showAnswer ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            <div className="prose prose-lg max-w-none border-t border-gray-200 pt-6">
                                <ReactMarkdown
                                    children={qaData[stepCount].answer}
                                    remarkPlugins={[remarkGfm]}
                                />
                            </div>
                        </div>

                        {stepCount === qaData.length - 1 && (
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
                </div>
            </main>
        </div>
    );
}

export default ViewQA;