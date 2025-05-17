"use client"

import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashcardItem from './_components/flashcardItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"




function Flashcards() {

    const [flashCards, setFlashCards] = useState([]);
    const { courseId } = useParams();
    const [isFlipped, setIsFlipped] = useState(false);
    const [api, setApi] = useState([])
    const route = useRouter();

    useEffect(() => {
        GetFlashCards()
    }, [])

    useEffect(() => {
        if (!api || typeof api.on !== 'function') {
            console.warn("API is not properly initialized");
            return;
        }
        api.on("select", () => {
            setIsFlipped(false);
        });
    }, [api]);

    const GetFlashCards = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'Flashcard'
        })
        setFlashCards(result.data)
        // console.log( "flashCard", result.data)
    }

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div>
            <DashboardHeader />
            <div className="mx-10 md:mx-36 lg:px-60 mt-10">
                <h1 className='font-bold text-2xl font-serif'>Flashcards</h1>
                <p>FlashCards: The Ultimate Toll to Lock in Concepts!</p>

                <div className=' mt-10'>
                    <Carousel setApi={setApi}>
                        <CarouselContent>
                            {flashCards?.content && flashCards?.content?.map((flashcard, index) => (
                                <CarouselItem key={index} className='flex justify-center items-center'>
                                    <FlashcardItem handleClick={handleClick} isFlipped={isFlipped}
                                        flashCard={flashcard} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {flashCards?.content?.length && api?.selectedScrollSnap() === flashCards.content.length - 1 && (
                    <div className="flex justify-center mt-6">
                        <button 
                            onClick={()=> route.back()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Back to Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Flashcards
