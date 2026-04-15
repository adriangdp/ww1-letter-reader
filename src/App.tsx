import { useEffect, useState, useMemo, type ChangeEvent } from 'react'
import type { Letter } from './types/types'
import { FetchLetters } from './utils/parsers'
import LetterDisplay from './components/LetterDisplay.component'
import SearchComponent from './components/Search.component'


function App() {

  const [letters, setLetters] = useState<Letter[]>([]);  
  const[filterWords, setWords] = useState<string[]>([""]);
  const[filterLanguage, setLanguage] = useState("all");
  const[filterDates, setDates] = useState<string[]>([
    "1914",
    "1915",
    "1916",
    "1917",
    "1918",
    "undated"
  ]); 

  const filteredLetters = useMemo<Letter[]>(()=>{
    let results = [...letters];
    /* Filter by author/content/place/letter key -id- */
    if(filterWords.length > 0){
      results = results.filter(e=>
        filterWords.some(w=>{
          const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const regex = new RegExp(`\\b${escaped}\\b`, "i");
          return regex.test(e.content) ||
            regex.test(e.meta.letter_key) ||
            regex.test(e.meta.author) ||
            regex.test(e.meta.place); 
        })                    
      )
    }
    
    /* Filter by Language */
    if(filterLanguage !== "all"){
      results = results.filter(e => 
        e.meta.language === filterLanguage
      )
    }
    /* Filter by Year */
    results = results.filter(e =>{
      if(e.meta.year === "" && filterDates.includes("undated")){
        return e;
      }
      if(filterDates.includes(e.meta.year)){
        return e;
      }                
    })
    return results;
  },[letters, filterWords, filterLanguage, filterDates]);
  
  const handleChangeWordQuery = (e:ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value.toLowerCase();
    /*
      Split string into an array by spaces
      then remove any whitespace around the string
      then remove empty string caused by trailing comma
    */
    const strings = value.split(/\s+/)
    .filter(s=> s.length > 0);
    setWords(strings)
  }

  const handleChangeLanguage = (e:ChangeEvent<HTMLSelectElement>) =>{
    setLanguage(e.target.value)
  }

  const handleChangeDates = (e:ChangeEvent<HTMLInputElement>) =>{
    const {value, checked} = e.target;
    setDates(prev => checked ? [...prev, value] : prev.filter(i => i !== value))
  }

  useEffect(()=>{
    const fetchData = async() =>{
      const letterData:Letter[] = await FetchLetters();
      setLetters(letterData);
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
    
    <SearchComponent 
      filterDates={filterDates} 
      handleFilterWords={(e)=>handleChangeWordQuery(e)}
      handleFilterLanguage={(e)=>handleChangeLanguage(e)}
      handleFilterDates={(e)=>handleChangeDates(e)}      
    ></SearchComponent>
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
