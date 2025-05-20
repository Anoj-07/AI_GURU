import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BrainCircuit, AlertTriangle, Scale } from 'lucide-react'

const TopicInput = ({ SetTopic, setDifficultyLevel }) => {
    return (
        <div className='space-y-6 w-full'>
            <div className='space-y-2'>
                <h2 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    Enter Your Study Focus
                </h2>
                <Textarea 
                    placeholder='Paste content or describe your topic...'
                    className="min-h-[150px] text-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 placeholder:text-gray-400"
                    onChange={(event) => SetTopic(event.target.value)}
                />
            </div>

            <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                    <BrainCircuit className='w-5 h-5 text-purple-600' />
                    <h2 className='text-lg font-semibold text-gray-800'>Knowledge Level</h2>
                </div>
                
                <Select onValueChange={(value) => setDifficultyLevel(value)}>
                    <SelectTrigger className="w-full h-12 text-base hover:bg-gray-50 focus:ring-2 focus:ring-blue-200">
                        <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-lg border border-gray-200">
                        <SelectItem 
                            value="easy" 
                            className="text-base hover:bg-blue-50 data-[state=checked]:bg-blue-50"
                        >
                            <div className="flex items-center gap-2">
                                <Scale className="w-4 h-4 text-green-500" />
                                <span>Beginner</span>
                            </div>
                        </SelectItem>
                        <SelectItem 
                            value="moderate" 
                            className="text-base hover:bg-blue-50 data-[state=checked]:bg-blue-50"
                        >
                            <div className="flex items-center gap-2">
                                <BrainCircuit className="w-4 h-4 text-yellow-500" />
                                <span>Intermediate</span>
                            </div>
                        </SelectItem>
                        <SelectItem 
                            value="hard" 
                            className="text-base hover:bg-blue-50 data-[state=checked]:bg-blue-50"
                        >
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <span>Advanced</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default TopicInput