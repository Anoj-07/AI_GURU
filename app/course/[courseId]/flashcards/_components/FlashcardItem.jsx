import React from 'react'
import ReactCardFlip from 'react-card-flip'

function FlashcardItem({ isFlipped, handleClick, flashCard }) {
  return (
    <div className='flex justify-center items-center'>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="p-7 bg-blue-500 text-white flex shadow-lg items-center justify-center rounded-lg cursor-pointer h-[250px] w-[250px] md:h-[400px] md:w-[350px]" onClick={handleClick}>
          <h2>{flashCard?.front}</h2>
        </div>
        <div className="p-7 text-blue-500 bg-white shadow-lg flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[250px] md:h-[400px] md:w-[350px]" onClick={handleClick}>
         <h2>{flashCard?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default FlashcardItem
