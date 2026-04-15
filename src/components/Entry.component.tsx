import  { type Letter } from "../types/types";
import truncate from "../utils/truncateText";
import LanguageFlag from "./ui/LanguageFlag.component";


const EntryComponent = (
    {
        letter, 
        openModal
    }
    :
    {
        letter:Letter, 
        openModal:(letter: Letter)=>void
    }) =>{

    const {author, day, month, year, place, language} = letter.meta;

    const handleOpenEntry = () =>{
        openModal(letter);
    }

    return(
        <li className="animate-fade-l-r mb-2.5 list-none z-0 w-full">
            <button 
                className="w-full p-4 border-2 border-rust bg-paper-dark cursor-pointer"
                onClick={handleOpenEntry}
            >       
                <div className="flex justify-between">
                    <div className="flex flex-col items-start justify-center">                    
                        <h2 className="text-lg font-semibold text-start">
                          {author || "[Unidentified]"}                            
                        </h2>                
                        <div>
                            <svg aria-hidden="true" focusable="false"
                                className="size-5 inline mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#6e4e22">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                <g id="SVGRepo_iconCarrier">
                                <path d="M13.29 14.667L11 16.097V3.81l3-1.5v5.968a6.182 6.182 0 0 1 1-1.104V2.307l3.024 1.503-.003 1.974A6.275 6.275 0 0 1 19 5.7l.02.001.005-2.51L14.5.94l-4 2-4-2L2 3.191V17.9l4.5-2.811 4 2.5 3.15-1.968q-.202-.485-.36-.955zM6 14.223l-3.001 1.876-.023-12.29L6 2.308zm4 1.875l-3-1.875V2.309l3 1.5zM19 7a4.96 4.96 0 0 0-4.9 5.086c0 2.807 2.678 6.606 4.9 10.914 2.222-4.308 4.9-8.107 4.9-10.914A4.96 4.96 0 0 0 19 7zm0 13.877c-.298-.543-.598-1.077-.89-1.6-1.548-2.762-3.01-5.37-3.01-7.191a3.905 3.905 0 1 1 7.8 0c0 1.82-1.462 4.429-3.01 7.19-.292.524-.592 1.058-.89 1.601zm0-11.043A2.166 2.166 0 1 0 21.13 12 2.147 2.147 0 0 0 19 9.834zm0 3.332A1.167 1.167 0 1 1 20.13 12 1.15 1.15 0 0 1 19 13.166z"/>
                                <path fill="none" d="M0 0h24v24H0z"/>
                                </g>
                            </svg>                       
                            <span className="text-sm font-semibold text-rust/80">{place || "[Unknown origin]"}</span> 
                        </div>
                        
                    </div>
                    <div className="min-w-2/7 flex flex-col items-end">
                        <div className="flex items-center">                     
                            <svg aria-hidden="true" focusable="false"
                                className="size-5 inline mr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                <g id="SVGRepo_iconCarrier">
                                <path d="M731.4 146.3V73.1h-73.1v73.1H365.7V73.1h-73.1v73.1H109.7v804.6h804.6V146.3H731.4z m-438.8 73.1v73.1h73.1v-73.1h292.6v73.1h73.1v-73.1h109.7v146.3H182.9V219.4h109.7zM182.9 877.7V438.9h658.3v438.9H182.9z" fill="#6e4e22"/>
                                <path d="M402.3 512h73.1v73.1h-73.1zM548.6 512h73.1v73.1h-73.1zM694.9 512H768v73.1h-73.1zM256 621.7h73.1v73.1H256zM402.3 621.7h73.1v73.1h-73.1zM548.6 621.7h73.1v73.1h-73.1zM694.9 621.7H768v73.1h-73.1zM256 731.4h73.1v73.1H256zM402.3 731.4h73.1v73.1h-73.1zM548.6 731.4h73.1v73.1h-73.1z" fill="#6e4e22"/>
                                </g>
                            </svg>                            
                            { (day||month||year)?
                                (
                                    <span>                                    
                                        <time className="text-sm font-semibold text-rust/80">
                                        {`
                                            ${day? day.padStart(2,"0")+"/" : ""}${month? month.padStart(2,"0")+"/" : ""}${year||""}
                                        `}
                                        </time>                    
                                    </span>
                                )
                                :
                                <span className="text-sm font-semibold text-rust/80">[Undated]</span>                             
                            }
                        </div>                    
                        <div className="flex items-center">
                            <LanguageFlag language={language} />
                            <span className="text-sm font-semibold text-rust/80">{language}</span>
                        </div>
                    </div>

                </div>
                    
                {
                    <p className="text-left mt-3 whitespace-pre-wrap text-coal/80 font-brawler tracking-wide">{truncate(letter.content)}</p>
                }
            
           
            </button>
        </li>
    );
}

export default EntryComponent