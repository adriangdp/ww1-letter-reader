import { useEffect, useState } from 'react'
import type { Letter } from '../types/types'
import EntryComponent from '../components/Entry.component'
import ReaderModal from '../components/ReaderModal.component'


const LetterDisplay =({letters}:{letters:Letter[]}) => {

    const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false)
    const [entryReadable, setEntryReadable] = useState<Letter>()

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
    <div>
        <div className={`max-w-11/12 md:max-w-7/12 lg:max-w-6/12 xl:max-w-5/12 2xl:max-w-4/12 m-auto flex flex-col items-center`}>
        {
            letters && letters.map((e,i)=>
            <EntryComponent               
                letter={e} 
                key={i}              
                openModal={handleOpenModal}
            />
            )
        }  
        </div>
        {
        isReaderOpen && entryReadable &&
            <ReaderModal             
            entryReadable={entryReadable}
            setIsOpen={setIsReaderOpen} 
            />
        }
    </div>

    )
}

export default LetterDisplay
