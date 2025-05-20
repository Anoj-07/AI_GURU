"use client"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    try {
      const result = await axios.get(`/api/courses?courseId=${courseId}`);
      setCourse(result.data.course);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <DashboardHeader />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            onClick={() => router.back()}
            variant="ghost"
            className="group px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Button>
        </div>

        <div className="space-y-8">
          {/* Course Intro */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <CourseIntroCard course={course} />
          </div>

          {/* Study Materials */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <StudyMaterialSection courseId={courseId} course={course} />
          </div>

          {/* Chapters */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <ChapterList course={course} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Course;