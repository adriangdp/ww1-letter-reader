import { useEffect, useState } from 'react'
import type { Letter } from './types/types'
import { FetchLetters } from './utils/parsers'
import LetterDisplay from './components/LetterDisplay.component'
import './App.css'
import SearchComponent from './components/search.component'


function App() {

  const [letters, setLetters] = useState<Letter[]>([]);
  const [filteredLetters, setFilteredLetters] = useState<Letter[]>([]);

  useEffect(()=>{
    const fetchData = async() =>{
      const letterData:Letter[] = await FetchLetters();
      setLetters(letterData);
      setFilteredLetters(letterData);
    }

    fetchData();
    
  },[])

  return (
   <>
   <div className='z-30 sticky top-0 left-0 mb-5 p-2 min-h-20 max-w-screen bg-paper-dark border-b-2 border-b-rust xl:py-8 xl:px-20'>
    <img className='size-40 absolute top-5 left-5 opacity-15 -z-10' 
        aria-hidden="true" src="/web-icon-512.png" alt="Web icon"
      />
    <h1 className='header-xl mb-0 relative'>Letters from the trenches</h1>
    <span className='subtitle'>A brief collection of transcribed letters from the Great War (1914-1918)</span>
    
    <SearchComponent letters={letters} setFilteredLetters={setFilteredLetters}></SearchComponent>
    <span className='block my-0 md:my-1'>Showing <strong className='text-candelight'>{filteredLetters.length}</strong> of 60 letters</span>
   </div>
    {
      letters &&
      <LetterDisplay letters={filteredLetters}></LetterDisplay>
    }
   </>    
  )
}

export default App
