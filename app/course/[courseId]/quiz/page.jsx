"use client";

import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function GamifiedQuiz() {
  const { courseId } = useParams();
  const [stepCount, setStepCount] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const route = useRouter();

  useEffect(() => {
    GetQuiz();
  }, []);

  useEffect(() => {
    if (timer > 0 && selectedOption === null && !quizCompleted) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && !quizCompleted) {
      handleTimeout();
    }
  }, [timer, selectedOption, quizCompleted]);

  const GetQuiz = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Quiz",
      });
      setQuizData(result.data);
      setSelectedOptions(
        Array(result.data.content.questions.length).fill(null)
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    const correctAnswer = quizData.content.questions[stepCount].answer;
    const isAnswerCorrect = option === correctAnswer;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prev) => prev + 10);
    }

    // Save selected option
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[stepCount] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleTimeout = () => {
    setSelectedOption(null);
    setIsCorrect(false);

    // Save timeout state as null
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[stepCount] = null;
    setSelectedOptions(updatedSelectedOptions);
  };

  const resetSelection = () => {
    setTimer(15);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const previousStep = () => {
    if (stepCount > 0) {
      setStepCount((prev) => prev - 1);
      resetSelection();
      // Restore the previously selected option for the question
      const prevOption = selectedOptions[stepCount - 1];
      setSelectedOption(prevOption);
      setIsCorrect(
        prevOption === quizData.content.questions[stepCount - 1].answer
      );
    }
  };

  const nextStep = () => {
    if (quizData && quizData.content.questions.length > stepCount + 1) {
      setStepCount((prev) => prev + 1);
      resetSelection();
      // Restore the previously selected option for the question
      const nextOption = selectedOptions[stepCount + 1];
      setSelectedOption(nextOption);
      setIsCorrect(
        nextOption === quizData.content.questions[stepCount + 1].answer
      );
    } else {
      setQuizCompleted(true); // Mark quiz as completed
    }
  };

  const restartQuiz = () => {
    setStepCount(0);
    setScore(0);
    setSelectedOptions(Array(quizData.content.questions.length).fill(null));
    setQuizCompleted(false);
    resetSelection();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="text-center space-y-4">
          <div className="animate-bounce">
            <div className="w-12 h-12 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-xl font-semibold text-blue-300">Preparing Your Quiz...</p>
        </div>
      </div>
    );
  }

  if (!quizData?.content?.questions?.length) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
          <p className="text-xl font-semibold text-rose-400">No Quiz Data Available 🧐</p>
          <Button
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            onClick={() => route.back()}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="bg-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm animate-fade-in text-center max-w-md">
          <div className="mb-6 animate-pulse">
            <span className="text-6xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Quiz Completed!
          </h1>
          <p className="text-lg mb-2">
            You scored <span className="text-2xl font-bold text-green-400">{score}</span>
            <span className="text-gray-400">/{quizData.content.questions.length * 10}</span>
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              onClick={restartQuiz}
            >
              Restart Quiz
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-300 hover:bg-gray-700/50"
              onClick={() => route.back()}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { questions, quizTitle } = quizData.content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <DashboardHeader />

      <main className="mx-4 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 py-8">
        <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-sm p-6 md:p-8">
          {/* Quiz Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {quizTitle}
          </h1>

          {/* Quiz Status Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center gap-4">
              <div className="bg-gray-700/30 px-4 py-2 rounded-xl">
                <span className="text-blue-400 font-semibold">Question</span>
                <span className="text-white ml-2">
                  {stepCount + 1}<span className="text-gray-400">/{questions.length}</span>
                </span>
              </div>
              <div className="bg-gray-700/30 px-4 py-2 rounded-xl">
                <span className="text-green-400 font-semibold">Score</span>
                <span className="text-white ml-2">{score}</span>
              </div>
            </div>

            {/* Timer */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-blue-400"
                  strokeWidth="8"
                  strokeDasharray={`${(timer / 15) * 251} 251`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-400">
                {timer}s
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gray-900/30 rounded-xl p-6 mb-8 shadow-lg">
            <p className="text-xl md:text-2xl text-center font-medium text-gray-100 leading-relaxed">
              {questions[stepCount].question}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {questions[stepCount].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null || timer === 0}
                className={`p-4 rounded-xl text-left transition-all transform
                  ${selectedOption === option
                    ? isCorrect
                      ? 'bg-green-600/30 border-2 border-green-400 scale-105'
                      : 'bg-red-600/30 border-2 border-red-400 scale-105'
                    : 'bg-gray-700/30 hover:bg-gray-700/50 hover:scale-[1.02]'
                  }
                  ${!selectedOption && timer > 0 ? 'hover:shadow-lg' : ''}
                  ${selectedOption !== option && timer === 0 ? 'opacity-50' : ''}
                  flex items-center gap-4`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center 
                  ${selectedOption === option
                    ? isCorrect
                      ? 'bg-green-400 text-white'
                      : 'bg-red-400 text-white'
                    : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-100 text-lg">{option}</span>
                {selectedOption === option && (
                  <span className="ml-auto text-2xl">
                    {isCorrect ? '✅' : '❌'}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <Button
              onClick={previousStep}
              disabled={stepCount === 0}
              className={`px-6 py-3 rounded-xl font-semibold transition-all
                ${stepCount === 0
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600/30 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300'
                }`}
            >
              ← Previous
            </Button>

            <Button
              onClick={nextStep}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transform hover:scale-105 transition-all shadow-md hover:shadow-lg flex items-center"
            >
              {stepCount === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );


}

export default GamifiedQuiz;



