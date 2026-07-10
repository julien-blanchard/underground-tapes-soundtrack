import { readFileSync, writeFileSync} from "node:fs";

const TODAY: string = new Date()
    .toJSON()
    .slice(0, 10);
const PATH_TO_MD_FILE: string = "src/vintage-bodyboarding-videos.md";
const PATH_TO_JSON_FILE: string = `${TODAY}_soundtracks.json`;
const PATH_TO_HTML_TEMPLATE: string = "src/html_template.html";
const PATH_TO_HTML_OUTPUT: string = "dist/index.html";
const PATTERN_TABLE_1: string = "| Track | Section | Band | Title | Info | Listen |";
const PATTERN_TABLE_2: string = "| --- | --- | --- | --- | --- | --- |";
const PATTERN_TABLE_3: string = "[Discogs](";
const PATTERN_TABLE_4: string = "[YouTube](";
const PATTERN_TABLE_5: string = "[SoundCloud](";
const PATTERN_TABLE_6: string = "[Bandcamp](";
const PATTERN_TABLE_7: string = ") |";
const PATTERN_TABLE_8: string = ",";
const PATTERN_TABLE_9: string = "\n##";

type Soundtrack = [
    {[key: string]: string | string[]}?
]

const openFile = (path_to_file: string): string => {
    const result: string = readFileSync(
        path_to_file, 
        { encoding: "utf8", flag: "r" }
    );
    return result;
};

const writeToFile = (data: string, path_to_file: string): void => {
    writeFileSync(path_to_file,data);
};

const prepareMdFile = (path_to_file: string): string[] => {
    let expanded_string: string = `${path_to_file}\n${"END"}`
    let result: string[] = expanded_string
        .replaceAll(PATTERN_TABLE_1, "")
        .replaceAll(PATTERN_TABLE_2, "")
        .replaceAll(PATTERN_TABLE_3, "")
        .replaceAll(PATTERN_TABLE_4, "")
        .replaceAll(PATTERN_TABLE_5, "")
        .replaceAll(PATTERN_TABLE_6, "")
        .replaceAll(PATTERN_TABLE_7, " |")
        .replaceAll(PATTERN_TABLE_9,"END\n##")
        .split("\n");
    return result;
};

const mdToJSON = (path_to_file: string[]): Soundtrack => {
    let result: Soundtrack = [];
    let temp_video_container: any = {};
    let temp_video_title: string = "";
    let temp_video_tags: string[] = [];
    let temp_video_soundtrack: any[] = [];
    let temp_video_row: string[] = [];
    for (let p of path_to_file) {
        if (p.startsWith("## ")) {
            temp_video_title = p
                .trim()
                .slice(3);
        }
        else if (p.startsWith("#### ")) {
            temp_video_tags = p
                .slice(5)
                .trim()
                .split(",");
        }
        else if (p.startsWith("| ")) {
            temp_video_row = p
                .replaceAll(PATTERN_TABLE_8,"")
                .replaceAll(" | ",",")
                .replaceAll("| ",",")
                .replaceAll(" |","")
                .split(",")
                .slice(1);
            temp_video_soundtrack.push(temp_video_row);
        }
        else if (p.includes("END")) {
            temp_video_container["Title"] = temp_video_title;
            temp_video_container["Tags"] = temp_video_tags;
            temp_video_container["Soundtrack"] = temp_video_soundtrack;
            result.push(temp_video_container);
            temp_video_row = [];
            temp_video_container = {};
            temp_video_soundtrack = [];
            temp_video_tags = [];
        }
    };
    let result_as_string: string = JSON.stringify(result);
    writeToFile(result_as_string,PATH_TO_JSON_FILE);
    return result;
};

const createSite = (data: Soundtrack, path_to_input_file: string, path_to_output_file: string): void => {
    let data_as_string: string = JSON.stringify(data);
    let html_template: string = openFile(PATH_TO_HTML_TEMPLATE);
    let result: string = html_template
        .replace("{{placeholder_data}}",data_as_string)
        .replace("{{last_updated}}",TODAY);
    writeToFile(result,path_to_output_file);
};

const md_file: string = openFile(PATH_TO_MD_FILE);
const md_file_cleaned: string[] = prepareMdFile(md_file);
const json_file: Soundtrack = mdToJSON(md_file_cleaned);
createSite(json_file,PATH_TO_HTML_TEMPLATE,PATH_TO_HTML_OUTPUT);