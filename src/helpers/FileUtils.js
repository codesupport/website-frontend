import fs from "fs";
import { promisify } from "util";

class FileUtils {
	static WRITE = "W";

	static open = promisify(fs.open);
	static readFile = promisify(fs.readFile);
	static writeFile = promisify(fs.writeFile);
}

export default FileUtils;