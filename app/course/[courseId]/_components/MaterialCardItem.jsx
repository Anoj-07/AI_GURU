import axios from "axios";
import { useState } from "react";

import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "sonner";

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);
  const [contentGenerated, setContentGenerated] = useState(false);

  // Determine current type content dynamically
  const getCurrentTypeContent = () => {
    try {
      if (item.type === "notes") {
        return studyTypeContent?.notes?.length ?? null;
      } else if (item.type === "flashcard") {
        return studyTypeContent?.flashcard?.[0]?.content?.length ?? null;
      } else if (item.type === "quiz") {
        return studyTypeContent?.quiz?.length ?? null;
      } else if (item.type === "qa") {
        return studyTypeContent?.qa?.length ?? null;
      }
    } catch (error) {
      console.error(`Error getting content for type ${item.type}:`, error);
      return null;
    }
  };

  const isContentGenerated =
    contentGenerated ||
    (getCurrentTypeContent() !== null && getCurrentTypeContent() > 0);

  // Function to generate chapters string
  const getChapters = () => {
    if (!course?.courseLayout?.chapters) return ""; // Handle empty or undefined course layout
    return course.courseLayout.chapters
      .map((chapter) => chapter.chapterTitle)
      .join(", "); // Return as a comma-separated string
  };

  // Polling function to check if content is generated
  const pollForContent = async (pollInterval = 2000, maxRetries = 15) => {
    let retries = 0;
    while (retries < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval)); // Wait for pollInterval
      const updatedContent = getCurrentTypeContent();
      if (updatedContent !== null && updatedContent > 0) {
        setContentGenerated(true);
        refreshData(true); // Refresh the parent data
        break;
      }
      retries++;
    }
    setLoading(false); // Stop loading regardless of the polling outcome
    toast.success("Content generated successfully!");
  };

  // Generate content for the material type
  const GenerateContent = async (e) => {
    e.preventDefault();

    // Get chapters for the course
    const chapters = getChapters();
    console.log("Chapters:", chapters);

    try {
      toast('Generating content...');
      setLoading(true); // Set loading state to true
      await axios.post("/api/study-type-content", {
        courseId: course?.courseId,
        type: item.name,
        chapter: chapters, // Send chapters as part of the payload
      });

      
      pollForContent(); // Start polling for content
    } catch (error) {
      console.error("Error generating content:", error);
    }


  };

 return (
    <Link href={'/course/'+course?.courseId+item.path}>
      <div
        className={`group relative border border-gray-200 rounded-xl bg-white p-6 transition-all duration-300 
          ${!isContentGenerated ? 'grayscale hover:grayscale-0' : 'hover:shadow-lg hover:-translate-y-1'}
          ${loading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow-sm
          ${isContentGenerated 
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
            : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'}`}
        >
          {isContentGenerated ? "Ready" : "Pending"}
        </div>

        {/* Icon Container */}
        <div className="w-full flex justify-center mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <img 
              src={item.icon} 
              alt={item.name} 
              className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h2>
          <p className="text-sm text-gray-600 min-h-[3.5rem]">{item.desc}</p>
          
          {/* Action Button */}
          <div className="mt-6">
            {!isContentGenerated ? (
              <button
                className={`w-full py-2 rounded-lg font-medium transition-all
                  ${loading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-sm hover:shadow-md'}
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2`}
                onClick={GenerateContent}
                disabled={loading}
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin mx-auto" />
                ) : "Generate Now"}
              </button>
            ) : (
              <button className="w-full py-2 rounded-lg font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 hover:text-blue-700 border border-blue-100 hover:border-blue-200 transition-colors">
                View Content →
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );

}

export default MaterialCardItem;