"use client"
import React, { useState } from 'react'
import SelectOption from './_components/selectOption';
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Create() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const generateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);
    try {
      await axios.post('/api/generate-course-outline', {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress
      });
      router.replace('/dashboard');
      toast.success("Course generation started!", {
        description: "Your materials will be ready soon. We'll notify you when completed."
      });
    } catch (error) {
      toast.error("Generation failed", {
        description: "Please check your inputs and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Craft Your Learning Path
          </h2>
          <p className="text-gray-500 text-lg">
            Build personalized study materials in just a few steps
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {[0, 1].map((index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                step === index ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {step === 0 ? (
            <SelectOption selectedStudyType={(value) => handleUserInput('courseType', value)} />
          ) : (
            <TopicInput 
              SetTopic={(value) => handleUserInput('topic', value)}
              setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}
            />
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          {step !== 0 && (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="group px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">←</span>
              Previous Step
            </Button>
          )}
          
          {step === 0 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-md transition-all"
            >
              Continue →
            </Button>
          ) : (
            <Button
              onClick={generateCourseOutline}
              disabled={loading}
              className="ml-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-md transition-all disabled:opacity-75"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              {loading ? 'Generating...' : 'Create Learning Plan'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Create;