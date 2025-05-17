"use client"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';


function Course() {

  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const route = useRouter();

  useEffect(() => {
    GetCourse();
  }, [])

  const GetCourse = async () => {
    const result = await axios.get(`/api/courses?courseId=${courseId}`);
    console.log(result.data);
    setCourse(result.data.course);
    console.log("data :", course);
  }


  return (
    <div>
      <DashboardHeader/>
      <div className='mx-10 md:mx-36 lg:px-60 mt-10'>

        <Button className="mb-3" onClick = {()=>route.back()}>Go to Dashboard Page</Button>
        {/* //course Intro */}
        <CourseIntroCard course={course} />

        {/* Study material Options */}
        <StudyMaterialSection courseId={courseId} course={course} />

        {/* chapter list */}
        <ChapterList course={course}/>
      </div>


    </div>
  )
}

export default Course
