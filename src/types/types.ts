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

/**
 * @type  {TranslationCollection}
 * @params [key:string]: Letter_key
 * @params [key:string]: language code
 * @example
 * // Example:
 * const translations = {
 *   "hl_04": {
 *     "en": "English Translation...",
 *     "es": "Spanish Translation...",
 *     "fr": "French Translation..."
 *   },
 *   "na_uk_01": {
 *     "en": "English Translation...",
 *     "es": "Spanish Translation...",
 *     "fr": "French Translation..."
 *   }
 * };
 */

export type TranslationCollection = {
    [key:string] : {
        [key:string] :string
    }
}