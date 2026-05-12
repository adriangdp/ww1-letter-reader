import { type Letter } from "../types/types";

export const filterLetters = (
    letters:Letter[],
    filterWords:string[],
    filterLanguage:string,
    filterDates:string[]
) =>{
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
  }