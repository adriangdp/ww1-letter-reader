import { useEffect, useState, type ChangeEvent } from "react";
import type { Letter } from "../types/types";
import Checkbox from "./ui/checkbox";

const SearchComponent = (
    {
        letters,
        setFilteredLetters
    } : 
    {
        letters:Letter[],
        setFilteredLetters:React.Dispatch<React.SetStateAction<Letter[]>>
    }) =>{
    
    const[words, setWords] = useState<string[]>([""]);
    const[language, setLanguage] = useState("all");
    const[dates, setDates] = useState<string[]>([
            "1914",
            "1915",
            "1916",
            "1917",
            "1918",
            "undated"
        ]);

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
        let results = [...letters];
        /* Filter by author/content/place/letter key -id- */
        if(words.length > 0){
            results = results.filter(e=>
                words.some(w=>{
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
        if(language !== "all"){
            results = results.filter(e => 
                e.meta.language === language
            )
        }
        /* Filter by Year */
            results = results.filter(e =>{
                if(e.meta.year === "" && dates.includes("undated")){
                    return e;
                }
                if(dates.includes(e.meta.year)){
                    return e;
                }                
            })
        setFilteredLetters(results)
    
    },[letters, words,language,dates, setFilteredLetters])
   

    return(
        <div className='mt-3 flex flex-wrap gap-2 items-center'>
            <input 
                className='p-2 w-full lg:w-4/12 border max-h-10 border-rust bg-paper-light lg:h-10'
                placeholder='Search by author / text / origin / letter id'
                onChange={(e)=>handleChangeWordQuery(e)}
            ></input>
            <select className='border p-2 border-rust bg-paper-light max-h-10 lg:h-10'
                onChange={(e)=>handleChangeLanguage(e)}
            >
                <option value="all">Any language</option>
                <option value="english">English</option>
                <option value="french">Français</option>
            </select>
            <div className='my-3 w-full gap-y-1 grid grid-cols-3 grid-rows-2 md:w-fit md:my-0 md:ml-5 md:flex md-flex-wrap md:gap-6 lg:ml-2 lg:gap-4 lg:grid lg:grid-cols-3 lg:gap-y-0.5'>
                <label>
                <Checkbox checked={dates.includes("1914")} value="1914"
                    callback={(e)=>handleChangeDates(e)}
                />
                <span>1914</span>
                </label>
                <label>
                <Checkbox checked={dates.includes("1915")} value="1915"
                    callback={(e)=>handleChangeDates(e)}
                />
                <span>1915</span>
                </label>
                <label>
                <Checkbox checked={dates.includes("1916")} value="1916"
                    callback={(e)=>handleChangeDates(e)}
                />
                <span>1916</span>
                </label>
                <label>
                <Checkbox checked={dates.includes("1917")} value="1917"
                    callback={(e)=>handleChangeDates(e)}
                />
                <span>1917</span>
                </label>
                <label>
                <Checkbox checked={dates.includes("1918")} value="1918"
                    callback={(e)=>handleChangeDates(e)}
                />
                <span>1918</span>
                </label>
                <label>
                <Checkbox checked={dates.includes("undated")} value="undated"
                    callback={(e)=>handleChangeDates(e)}
                />
                <span>undated</span>
                </label>
            </div>
        </div>
    );
}

export default SearchComponent;