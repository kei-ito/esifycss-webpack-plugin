import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import type * as webpack from 'webpack';

export const setupTest = async () => {
    const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'test-'));
    const defaultConfig: Partial<webpack.Configuration> = {
        mode: 'production',
        bail: true,
        optimization: {
            minimize: false,
        },
    };
    return {
        directory,
        defaultConfig,
    };
};
