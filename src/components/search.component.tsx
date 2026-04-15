import { type ChangeEvent } from "react";
import Checkbox from "./ui/Checkbox";


interface Props{
    filterDates:string[],
    handleFilterWords:(e:ChangeEvent<HTMLInputElement>)=>void,
    handleFilterLanguage:(e:ChangeEvent<HTMLSelectElement>)=>void,
    handleFilterDates:(e:ChangeEvent<HTMLInputElement>)=>void
}
const SearchComponent = ({
    filterDates,
    handleFilterWords,
    handleFilterLanguage,
    handleFilterDates
}:Props) =>{
        
    return(
        <div className='mt-3 flex flex-wrap gap-2 items-center'>
            <input 
                className='p-2 w-full lg:w-4/12 border max-h-10 border-rust bg-paper-light lg:h-10'
                placeholder='Search by author / text / origin / letter id'
                onChange={(e)=>handleFilterWords(e)}
            ></input>
            <select className='border p-2 border-rust bg-paper-light max-h-10 lg:h-10'
                onChange={(e)=>handleFilterLanguage(e)}
            >
                <option value="all">Any language</option>
                <option value="english">English</option>
                <option value="french">Français</option>
            </select>
            <div className='my-3 w-full gap-y-1 grid grid-cols-3 grid-rows-2 md:w-fit md:my-0 md:ml-5 md:flex md-flex-wrap md:gap-6 lg:ml-2 lg:gap-4 lg:grid lg:grid-cols-3 lg:gap-y-0.5'>
                <label>
                <Checkbox checked={filterDates.includes("1914")} value="1914"
                    callback={(e)=>handleFilterDates(e)}
                />
                <span>1914</span>
                </label>
                <label>
                <Checkbox checked={filterDates.includes("1915")} value="1915"
                    callback={(e)=>handleFilterDates(e)}
                />
                <span>1915</span>
                </label>
                <label>
                <Checkbox checked={filterDates.includes("1916")} value="1916"
                    callback={(e)=>handleFilterDates(e)}
                />
                <span>1916</span>
                </label>
                <label>
                <Checkbox checked={filterDates.includes("1917")} value="1917"
                    callback={(e)=>handleFilterDates(e)}
                />
                <span>1917</span>
                </label>
                <label>
                <Checkbox checked={filterDates.includes("1918")} value="1918"
                    callback={(e)=>handleFilterDates(e)}
                />
                <span>1918</span>
                </label>
                <label>
                <Checkbox checked={filterDates.includes("undated")} value="undated"
                    callback={(e)=>handleFilterDates(e)}
                />
                <span>undated</span>
                </label>
            </div>
        </div>
    );
}

export default SearchComponent;