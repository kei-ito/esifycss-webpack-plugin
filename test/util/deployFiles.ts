import * as path from 'path';
import * as fs from 'fs';

export const deployFiles = async (
    directory: string,
    files: Record<string, string>,
) => {
    for (const [relativePath, body] of Object.entries(files)) {
        const filePath = path.join(directory, relativePath);
        await fs.promises.mkdir(path.dirname(filePath), {recursive: true});
        await fs.promises.writeFile(filePath, body);
    }
};
