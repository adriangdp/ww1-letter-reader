import Papa from "papaparse";
import { 
    type EntryMeta, 
    type EntryContent, 
    type PlacesData, 
    type Letter} 
from "../types/types";

interface PaparseResult<T> {
    data:T[],
    errors:object[],
    meta:object
}

export const FetchLetters = async():Promise<Letter[]> =>{
    const parsedMetaData = await parseCSV<EntryMeta>("/data/index.csv");
    const parsedPlacesData = await parseCSV<PlacesData>("/data/places.csv");
    const contentLetter = await fetchContentLetter();

    const metaData:EntryMeta[] = [...parsedMetaData.data];
    const placesData:PlacesData[] = [...parsedPlacesData.data];

    const consolidated:Letter[]= metaData.map((entry)=>{
        const relatedContent = contentLetter[entry.letter_key];
        const relatedPlace = placesData.find(e => e.place === entry.place)

        const letter:Letter = {
            meta:entry,
            content:relatedContent,
            locationData:{
                latitude: relatedPlace?.latitude,
                longitude: relatedPlace?.longitude,
                contry: relatedPlace?.country
            }
        }

        return letter;
    })

    return consolidated;

}

const parseCSV = async<T>(filePath:string):Promise<PaparseResult<T>> =>{
    const response = await fetch(filePath);
    const fileText = await response.text();

    const parseOptions = {
        header: true,
        delimiter: ",",
    }

    const parsedData:PaparseResult<T> = Papa.parse(fileText, parseOptions);

    return parsedData;
}


const fetchContentLetter = async():Promise<EntryContent> =>{
    const response = await fetch("/data/letters.json");
    if(!response.ok){
        throw new Error("Error while fetching letter content")
    }
    const contents:EntryContent = await response.json();
    return contents;
}