// Convert MD tables to a CSV file

import { readFileSync, writeFileSync} from "node:fs";

const PATH_TO_MD_FILE: string = "ut.md";
const PATH_TO_CSV_FILE: string = "ut.csv";

const CSV_HEADER: string = "Video,Track,Section,Band,Title,Info,Listen";

const PATTERN_TABLE_1: string = "| Track | Section | Band | Title | Info | Listen |";
const PATTERN_TABLE_2: string = "| --- | --- | --- | --- | --- | --- |";
const PATTERN_TABLE_3: string = "[Discogs](";
const PATTERN_TABLE_4: string = "[YouTube](";
const PATTERN_TABLE_5: string = "[SoundCloud](";
const PATTERN_TABLE_6: string = "[Bandcamp](";
const PATTERN_TABLE_7: string = ") |";

const openFile = (path_to_file: string): string => {
    const result: string = readFileSync(
        path_to_file, 
        { encoding: "utf8", flag: "r" }
    );
    return result;
};

const writeToCsv = (data: string, path_to_file: string): void => {
    writeFileSync(data,path_to_file);
};

const prepareMdFile = (path_to_file: string): string[] => {
    const result: string[] = path_to_file
        .replaceAll(PATTERN_TABLE_1, "")
        .replaceAll(PATTERN_TABLE_2, "")
        .replaceAll(PATTERN_TABLE_3, "")
        .replaceAll(PATTERN_TABLE_4, "")
        .replaceAll(PATTERN_TABLE_5, "")
        .replaceAll(PATTERN_TABLE_6, "")
        .replaceAll(PATTERN_TABLE_7, " |")
        .replaceAll(",","")
        .split("\n");
    return result;
};

const mdToCsv = (path_to_file: string[]): string => {
    let temp_array: string[] = [];
    let prefix: string = "";
    for (let p of path_to_file) {
        if (p.startsWith("##")) {
            prefix = p;
        }
        else if (p.startsWith("| ")) {
            const video_title: string = prefix.slice(3);
            const video_description: string = p
                .replaceAll(" | ",",")
                .replaceAll("| ",",")
                .replaceAll(" |","");
            const new_row: string = `${video_title}${video_description}`;
            temp_array.push(new_row);
        }
    };
    const temp_array_as_string: string = temp_array.join("\n");
    const result: string = `${CSV_HEADER}\n${temp_array_as_string}`;
    return result;
};

const md_file: string = openFile(PATH_TO_MD_FILE);
const md_file_cleaned: string[] = prepareMdFile(md_file);
const csv_file: string = mdToCsv(md_file_cleaned);
writeToCsv(PATH_TO_CSV_FILE,csv_file);
