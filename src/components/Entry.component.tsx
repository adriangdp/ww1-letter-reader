import  { type Letter } from "../types/types";
import truncate from "../utils/truncateText";


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
                        <h3 className="text-lg font-semibold text-start">
                          {author || "[Unidentified]"}                            
                        </h3>                
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
                            {language === "french" ? 
                                <svg aria-hidden="true" focusable="false"
                                    className="inline size-3 mr-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 130 120" enable-background="new 0 0 130 120" xmlSpace="preserve" width="800px" height="800px" fill="#6e4e22" stroke="#6e4e22">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"> <g id="Infos"> <rect id="BG" x="-650" y="-740" fill="#D8D8D8" width="2180" height="1700"/> </g> <g id="Others"> </g> <g id="Europe"> <g id="Row_5"> </g> <g id="Row_4"> </g> <g id="Row_3"> </g> <g id="Row_2"> <g> <rect x="87" fill="#DB3A49" width="43" height="120"/> <rect x="43" fill="#FFFFFF" width="44" height="120"/> <rect fill="#2A66B7" width="43" height="120"/> </g> </g> <g id="Row_1"> </g> </g> </g>
                                </svg>
                                :
                                <svg aria-hidden="true" focusable="false"
                                    className="inline size-3 mr-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 130 120" enable-background="new 0 0 130 120" xmlSpace="preserve" width="800px" height="800px" fill="#6e4e22">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"> <g id="Infos"> <rect id="BG" x="-200" y="-1160" fill="#D8D8D8" width="2180" height="1700"/> </g> <g id="Others"> </g> <g id="Europe"> <g id="Row_5"> <g> <polygon fill="#2A66B7" points="20.2,120 46.3,120 46.3,95.8 "/> <polygon fill="#2A66B7" points="46.3,0 20.6,0 46.3,23.9 "/> <polygon fill="#2A66B7" points="0,78.7 0,101.4 24.6,78.7 "/> <polygon fill="#2A66B7" points="130,101.8 130,78.7 105.1,78.7 "/> <polygon fill="#2A66B7" points="0,18.2 0,41.3 24.9,41.3 "/> <polygon fill="#2A66B7" points="130,41.3 130,18.6 105.4,41.3 "/> <polygon fill="#2A66B7" points="83.7,120 109.4,120 83.7,96.1 "/> <polygon fill="#2A66B7" points="109.8,0 83.7,0 83.7,24.2 "/> <g> <polygon fill="#DC4437" points="85.1,78.7 83.7,78.7 83.7,86.5 119.7,120 129.4,120 130,120 130,111.4 94.8,78.7 "/> <polygon fill="#DC4437" points="44.9,41.3 46.3,41.3 46.3,33.5 10.3,0 0.6,0 0,0 0,8.6 35.2,41.3 "/> <polygon fill="#DC4437" points="34.9,78.7 0,110.9 0,120 9.8,120 46.3,86.3 46.3,78.7 44.8,78.7 "/> <polygon fill="#DC4437" points="120.2,0 83.7,33.7 83.7,41.3 85.2,41.3 95.1,41.3 130,9.1 130,0 "/> <polygon fill="#DC4437" points="76.7,0 53.3,0 53.3,48.3 0,48.3 0,71.7 53.3,71.7 53.3,120 76.7,120 76.7,71.7 130,71.7 130,48.3 76.7,48.3 "/> </g> <g> <polygon fill="#FFFFFF" points="95.1,41.3 83.7,41.3 83.7,33.7 120.2,0 115,0 109.8,0 83.7,24.2 83.7,0 76.7,0 76.7,48.3 130,48.3 130,41.3 105.4,41.3 130,18.6 130,13.8 130,9.1 "/> <polygon fill="#FFFFFF" points="46.3,23.9 20.6,0 15.5,0 10.3,0 46.3,33.5 46.3,41.3 35.2,41.3 0,8.6 0,13.4 0,18.2 24.9,41.3 0,41.3 0,48.3 53.3,48.3 53.3,0 46.3,0 "/> <polygon fill="#FFFFFF" points="76.7,71.7 76.7,120 83.7,120 83.7,96.1 109.4,120 114.5,120 119.7,120 83.7,86.5 83.7,78.7 94.8,78.7 130,111.4 130,106.6 130,101.8 105.1,78.7 130,78.7 130,71.7 92.5,71.7 "/> <polygon fill="#FFFFFF" points="0,71.7 0,78.7 24.6,78.7 0,101.4 0,106.2 0,110.9 34.9,78.7 46.3,78.7 46.3,86.3 9.8,120 15,120 20.2,120 46.3,95.8 46.3,120 53.3,120 53.3,71.7 52.4,71.7 "/> </g> </g> </g> <g id="Row_4"> </g> <g id="Row_3"> </g> <g id="Row_2"> </g> <g id="Row_1"> </g> </g> </g>
                                </svg>                            
                            }
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