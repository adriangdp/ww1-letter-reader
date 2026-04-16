import { useState, useEffect } from "react";
import { getSupportedLanguages } from "../services/translate";

interface apiLanguages{
    supported_languages:{
        [key:string] : string
    }    
}

interface Props{
    preferredLang:string,
    isShowTranslation:boolean,
    translate: (languageTo:string)=>void,
    handlePreferredLanguage: (s:string)=>void
}

const Translator = ({
    preferredLang, 
    isShowTranslation, 
    translate, 
    handlePreferredLanguage,}:Props) =>{
    
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
                className="min-w-0 grow max-h-10 lg:h-10 p-2 cursor-pointer truncate border border-rust bg-paper-light"
                aria-label="Translation language selector"
                >
                {
                    locales && Object.keys(locales.supported_languages).map((o,i)=>{
                        if(locales.supported_languages[o] === "auto"){
                        return
                        }
                        return(<option key={i} value={locales.supported_languages[o]}
                                className="max-w-15 text-ellipsis overflow-hidden"
                            >{o}</option>)
                        }                        
                    )
                }
            </select>
                <button onClick={handleTranslate}
                    className={`grow shrink-0 md:grow-0 min-w-fit max-h-10 lg:h-10 border p-2 ${!isShowTranslation ? "border-rust bg-paper-light":"border-candelight/40 bg-candelight/20"} `}
                >
                <img src="/svg/language.svg" alt="translate icon" className="size-5 inline" aria-hidden/>
                {!isShowTranslation ? "Translate":"Show Original"}</button>
        </div>
    );
}

export default Translator