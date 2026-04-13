interface Props{
    checked:boolean,
    value:string,
    callback:(...args: any[]) => any
}

import svg from "/svg/checkbox.svg";

const Checkbox =({checked, value, callback}:Props) =>{
    return(
        <div className="relative inline-block w-4 h-4 mr-1">
            <input type="checkbox" checked={checked} value={value}
                onChange={callback}
                className='absolute top-1 left-0 peer size-4 border-2 border-rust appearance-none checked:border-0'/>
            <img src={svg} alt="filter checkbox" className="size-4 absolute top-1 left-0 opacity-0 peer-checked:opacity-100"/>
        </div>
    );
}

export default Checkbox;