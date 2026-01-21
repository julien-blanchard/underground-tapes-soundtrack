import fs from "node:fs";

import {
    PATH_TO_INPUT_FILE,
    PATH_TO_OUTPUT_FILE,
    ROW_SEP,
    CSS_CDN,
    TAG_BR,
    TAG_DIV_OPEN,
    TAG_DIV_CLOSE,
    TAG_H_OPEN,
    TAG_H_CLOSE,
    TAG_TABLE_OPEN,
    TAG_TABLE_CLOSE,
    TAG_BODY_CLOSE,
    TAG_ROW_OPEN,
    TAG_ROW_CLOSE,
    TAG_CELL_OPEN,
    TAG_CELL_CLOSE
} from "./src/macros.ts"

import {
    TAG_STYLE,
    TAG_HEADER,
    TAG_MAIN_DIV,
    HTML5_BLUEPRINT,
    TAG_FOOTER,
    HTML_ABOUT,
    HTML_FAQ,
    HTML_CONTRIBUTE
} from "./src/html_templates.ts"

const openFile = (path_to_file: string): string[] => {
    let result: string[] = fs
        .readFileSync(path_to_file,"utf-8")
        .split("\n");

    return result;
};

const createTableRow = (row_values: string): string => {
    let result: string = `${TAG_ROW_OPEN}\n`;
    let temp_data: string[] = row_values.split(ROW_SEP);
    let temp_data_left: string[] = temp_data[0].split(". ");
    let temp_data_right: string[] = temp_data.slice(1, temp_data.length);
    let data: string[] = temp_data_left.concat(temp_data_right);
    for (let d of data) {
        if (d.includes("discogs")) {
            const parsed_link:string = `<a href="${d}" target="_blank">Discogs</a>`;
            const table_cell: string = `${TAG_CELL_OPEN}${parsed_link}${TAG_CELL_CLOSE}\n`;
            result = result + table_cell;
        }
        else if (d.includes("youtube")) {
            const parsed_link:string = `<a href="${d}" target="_blank">YouTube</a>`;
            const table_cell: string = `${TAG_CELL_OPEN}${parsed_link}${TAG_CELL_CLOSE}\n`;
            result = result + table_cell;
        }
        else if (d.includes("soundcloud")) {
            const parsed_link:string = `<a href="${d}" target="_blank">SoundCloud</a>`;
            const table_cell: string = `${TAG_CELL_OPEN}${parsed_link}${TAG_CELL_CLOSE}\n`;
            result = result + table_cell;
        }
        else if (d.includes("bandcamp")) {
            const parsed_link:string = `<a href="${d}" target="_blank">Bandcamp</a>`;
            const table_cell: string = `${TAG_CELL_OPEN}${parsed_link}${TAG_CELL_CLOSE}\n`;
            result = result + table_cell;
        }
        else if (d != "\r") {
            const table_cell: string = `${TAG_CELL_OPEN}${d}${TAG_CELL_CLOSE}\n`;
            result = result + table_cell;
        }
    }  
    result = result + TAG_ROW_CLOSE;
    return result;
}

const createHTML = (rows: string[]): string => {
    let result: string = TAG_DIV_OPEN;
    for (let i = 0; i < rows.length; i++) {
        try {
            if (rows[i].startsWith("## ")) {
                const parsed_section_header = rows[i]?.replace("##","");
                const tag_section_header = `${TAG_H_OPEN}${parsed_section_header}${TAG_H_CLOSE}${TAG_BR}${TAG_TABLE_OPEN}`;
                result = result + tag_section_header;
            }
            else if (!Number.isNaN(rows[i][0]) && rows[i+1].length > 2) {
                const parsed_row: string = createTableRow(rows[i]);
                result = result + parsed_row;
            }
            else if (!Number.isNaN(rows[i][0]) && rows[i+1].length === 1) {
                const parsed_row: string = createTableRow(rows[i] + ROW_SEP);
                result = result + `${parsed_row}${TAG_TABLE_CLOSE}`;
            }
        }
        catch (e) {
        }
        
    };
    result = `${result}${TAG_BR}${TAG_TABLE_CLOSE}${TAG_BR}${TAG_DIV_CLOSE}`
    return result;
};

const saveToFile = (data: string, path_to_output: string): void => {
    const result: string = (
        HTML5_BLUEPRINT
        .replace("{{placeholder_css_cdn}}",CSS_CDN)
        .replace("{{placeholder_tag_style}}",TAG_STYLE)
        .replace("{{placeholder_tag_header}}",TAG_HEADER)
        .replace("{{placeholder_tag_main_div}}",TAG_MAIN_DIV)
        .replace("{{placeholder_tables}}",data)
        .replaceAll("<td>\r</td>","")
        .replaceAll("<td></td>","")
        .replaceAll("<tr>\r</tr>","")
        .replaceAll("<tr>\n</tr>","")
        .replaceAll("<tr></tr>","")
        .replace("{{placeholder_about}}",HTML_ABOUT)
        .replace("{{placeholder_faq}}",HTML_FAQ)
        .replace("{{placeholder_contribute}}",HTML_CONTRIBUTE)
        .replace("{{placeholder_footer}}",TAG_FOOTER)
    )
    fs.writeFileSync(path_to_output, result);
};

const input_file: string[] = openFile(PATH_TO_INPUT_FILE);
const md_to_html: string = createHTML(input_file);
saveToFile(md_to_html,PATH_TO_OUTPUT_FILE);