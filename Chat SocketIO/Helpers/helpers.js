const fs = require("node:fs");

/*
    Reads a file and returns it. If type's null, return a string with the file content

    filePath: relative path to the file you want to read
    type: optional. Options: JSON -> returns a JSON object
    attributes: optional. List of Strings. If not null, it will look for these attributes
        on file and return a JSON object composed only by these attributes
*/

function readFile(filePath, type, attributes = null) {
    try {
        if (type == "JSON") {
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            if (attributes != null) {
                // To do
                /* Look for attributes on file and create a JSON Object */
            }

            return jsonData;
        }

        const data = fs.readFileSync(filePath, "utf-8");

        return data;
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = {readFile};
