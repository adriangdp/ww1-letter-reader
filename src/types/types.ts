export type EntryMeta = {
  author:string,
  day:string,
  month:string,
  year:string,
  language:string,
  letter_key:string,
  place:string,
  source:string,
}

export type EntryContent = {
 [key:string] : string
}

export type PlacesData = {
    place:string,
    latitude:number,
    longitude:number,
    country:string
}

export type Letter = {
    meta: EntryMeta,
    content: string,
    locationData?:{
        latitude?:number,
        longitude?:number,
        country?:string
    }    
}           