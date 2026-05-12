import { test, expect, describe } from "vitest";
import { filterLetters } from "./filtreredLetters";
import type { Letter } from "../types/types";

const mockLetters: Letter[] =[
    {
        meta:{
            author:"Chapelain",
            day: "1",
            month: "3",
            year: "1914",
            language: "french",
            letter_key: "mock_fr_01",
            place: "Verdun",
            source: "https://example.com"
        },
        content: "This is letter 1, test target"
    },
    {
        meta:{
            author:"Jeanne Fillaud",
            day: "1",
            month: "3",
            year: "1915",
            language: "french",
            letter_key: "mock_fr_02",
            place: "Verdun",
            source: "https://example.com"
        },
        content: "This is letter 2"
    },
    {
        meta:{
            author:"Gaston Biron",
            day: "1",
            month: "3",
            year: "1916",
            language: "french",
            letter_key: "mock_fr_03",
            place: "Verdun",
            source: "https://example.com"
        },
        content: "This is letter 3"
    },
    {
        meta:{
            author:"Harold William",
            day: "1",
            month: "3",
            year: "1917",
            language: "english",
            letter_key: "mock_uk_01",
            place: "Verdun",
            source: "https://example.co.uk"
        },
        content: "This is letter 4"
    },
    {
        meta:{
            author:"George Shipley",
            day: "1",
            month: "3",
            year: "1918",
            language: "english",
            letter_key: "mock_uk_02",
            place: "Verdun",
            source: "https://example.co.uk"
        },
        content: "This is letter 5"
    },
    {
        meta:{
            author:"Ernest William Bratchell",
            day: "1",
            month: "3",
            year: "",
            language: "english",
            letter_key: "mock_uk_03",
            place: "Verdun",
            source: "https://example.co.uk"
        },
        content: "This is letter 6"
    },
    {
        meta:{
            author:"",
            day: "",
            month: "",
            year: "",
            language: "english",
            letter_key: "mock_uk_04",
            place: "Verdun",
            source: "https://example.co.uk"
        },
        content: "This is letter 7"
    }
]

const DATES = [
    "1914",
    "1915",
    "1916",
    "1917",
    "1918",
    "undated"
]

/* LANGUAGES "all","english","french" */

describe("Filter function tests", () => {
    test('"all" returns every letter regardless of language', () => {
        expect(filterLetters(mockLetters, [], "all", DATES)).toHaveLength(mockLetters.length);
    });
 
    test("filters to english only", () => {
        const result = filterLetters(mockLetters, [], "english", DATES);
        expect(result).toHaveLength(4);
        result.forEach(l => expect(l.meta.language).toBe("english"));
    });
 
    test("filters to french only", () => {
        const result = filterLetters(mockLetters, [], "french", DATES);
        expect(result).toHaveLength(3);
        result.forEach(l => expect(l.meta.language).toBe("french"));
    });

    test("filters to undated letters only", () => {
        const result = filterLetters(mockLetters, [], "all", ["undated"]);
        expect(result).toHaveLength(2);
        expect(result[0].meta.letter_key).toBe("mock_uk_03")
        expect(result[1].meta.letter_key).toBe("mock_uk_04")
    });

    test("filters by ID", ()=>{
        const searchString:string[] = ["mock_fr_02"]
        const result = filterLetters(mockLetters, searchString, "all", DATES);
        expect(result).toHaveLength(1);
        expect(result[0].meta.letter_key).toBe("mock_fr_02")
    })

    test("filters by content", ()=>{
        const searchString:string[] = ["test","target"]
        const result = filterLetters(mockLetters, searchString, "all", DATES);
        expect(result).toHaveLength(1);
        expect(result[0].meta.author).toBe("Chapelain")
    })

    test("filters by author", ()=>{
        const searchString:string[] = ["Gaston", "Biron"]
        const result = filterLetters(mockLetters, searchString, "all", DATES);
        expect(result).toHaveLength(1);
        expect(result[0].meta.author).toBe("Gaston Biron")
    })
});