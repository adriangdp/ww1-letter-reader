import { useEffect, useRef, useState } from 'react'
import type { Letter, TranslationCollection } from '../types/types'
import EntryComponent from '../components/Entry.component'
import ReaderModal from '../components/ReaderModal.component'


const LetterDisplay =({letters}:{letters:Letter[]}) => {

    const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
    const [entryReadable, setEntryReadable] = useState<Letter>();
    const [preferredLang, setPreferredLang] = useState<string>("en");

    const translations = useRef<TranslationCollection>({})

    const addTranslation = (letter_id:string, newLanguage:string, newText:string) =>{
        const savedLetter = translations.current[letter_id];

        if(savedLetter){
            if(savedLetter[newLanguage]){
                return;
            }
            translations.current[letter_id][newLanguage] = newText;
            return;
        }
        translations.current[letter_id] = {[newLanguage]: newText}       
    }

    const isTranslated = (letter_id:string, language:string):boolean => {
        if(translations.current[letter_id]){
            if(translations.current[letter_id][language]){
                return true;
            }
            return false;
        }
        return false;
    }

    const handleChangePreferredLang = (s:string) =>{
        setPreferredLang(s)
    }

    const handleOpenModal = (entry:Letter):void =>{
        setEntryReadable(entry);
        setIsReaderOpen(true);
    }

    useEffect(()=>{
        if(isReaderOpen){
            document.body.classList.add("overflow-clip");
        }
        else{
            document.body.classList.remove("overflow-clip");
        }
    },[isReaderOpen])

    return (
    <main>
        <ul className={`max-w-11/12 md:max-w-7/12 lg:max-w-6/12 xl:max-w-5/12 2xl:max-w-4/12 m-auto flex flex-col items-center`}>
        {
            letters && letters.map((e,i)=>
            <EntryComponent               
                letter={e} 
                key={i}              
                openModal={handleOpenModal}
            />
            )
        }  
        </ul>
        {
        isReaderOpen && entryReadable &&
            <ReaderModal             
                entryReadable={entryReadable}
                translations={translations}
                setIsOpen={setIsReaderOpen} 
                preferredLang={preferredLang}
                handlePreferredLanguage={handleChangePreferredLang}                 
                isTranslated={isTranslated}  
                addTranslation={addTranslation}             
            />
        }
    </main>

    )
}

export default LetterDisplay
