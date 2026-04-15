export const getSupportedLanguages = async() =>{
    
    const uri = import.meta.env.VITE_BASEURI + "/supported-languages";
    const options = {
        method: "GET",
        headers: {
            "content-type" : "application/json"
        }
        
    }
    const response = await fetch(uri,options);
    if(!response.ok) {
        throw new Error(
            "Could not fetch supported languages. Error " + response.status
        );
    }
    return await response.json();
   
}

export const getTranslation = async(letterText:string, langFrom:string, langTo:string):Promise<string> =>{
    
    const uri = import.meta.env.VITE_BASEURI + "/translate";
    const options = {
        method: "POST",
        headers: {
            "X-API-KEY" : import.meta.env.VITE_TRANSLATE,
            "content-type" : "application/json"
        },
        body: JSON.stringify({
            text:letterText,
            source:langFrom,
            target:langTo
        })        
    }
    const response = await fetch(uri,options);
    if(!response.ok) {
        if(response.status === 429){
            throw new Error(
                "Translation limit reached. Try next month... =( " + response.status
            );
        }
        throw new Error(
            "Could not get translation. Error: " + response.status
        );
    }
    const translation = await response.json();
    return translation.translations.translation;
}
