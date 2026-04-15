import { useState, useEffect } from "react";
import { getSupportedLanguages } from "../services/translate";

interface apiLanguages{
    supported_languages:{
        [key:string] : string
    }    
}

const Translator = (
    {
        preferredLang,
        translate,
        handlePreferredLanguage

    }
    :
    {
        preferredLang:string,
        translate: (languageTo:string)=>void,
        handlePreferredLanguage: (s:string)=>void
    }) =>{
    
    const[locales, setLocales] = useState<apiLanguages>();
    const[languageTo, setLanguageTo] = useState(preferredLang);   
    
    const handleLocaleChange = (
        e:React.ChangeEvent<HTMLSelectElement>, 
    ) =>{      
        setLanguageTo(e.target.value);  
        handlePreferredLanguage(e.target.value);     
    }

    const handleTranslate = () =>{
        translate(languageTo);
    }
    
    useEffect(() => {
        const getAPILanguages = async()=>{
            setLocales(await getSupportedLanguages());            
        }
        getAPILanguages();
    }, [])  

    return(
        <div className="mb-5 flex w-full gap-3">
            <select value={languageTo} onChange={(e)=>handleLocaleChange(e)}
                className="max-w-1/2 lg:max-w-2/3 max-h-10 lg:h-10 p-2 cursor-pointer truncate border border-rust bg-paper-light"
                aria-label="Translation language selector"
                >
                {
                    locales && Object.keys(locales.supported_languages).map((o,i)=>{
                        if(locales.supported_languages[o] === "auto"){
                        return
                        }
                        return(<option key={i} value={locales.supported_languages[o]}
                                className="max-w-20 text-ellipsis overflow-hidden"
                            >{o}</option>)
                        }                        
                    )
                }
            </select>
            <button onClick={handleTranslate}
                className="grow md:grow-0 min-w-fit max-h-10 lg:h-10 border p-2 border-rust bg-paper-light"
            >
                <img src="/svg/language.svg" alt="translate icon" className="size-5 inline" aria-hidden/>
                Translate</button>
            
        </div>
    );
}

export default Translator