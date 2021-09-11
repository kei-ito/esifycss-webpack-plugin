import * as fs from 'fs';
import * as path from 'path';
import type * as webpack from 'webpack';

const pluginName = 'EsifyCSSWebpackPlugin';
const fileExistsAt = async (filePath: string): Promise<boolean> => {
    const stat = await fs.promises.stat(filePath).catch(() => null);
    return Boolean(stat && stat.isFile());
};

export class EsifyCSSWebpackPlugin {

    // eslint-disable-next-line class-methods-use-this
    public apply(compiler: webpack.Compiler) {
        compiler.hooks.normalModuleFactory.tap(pluginName, (normalModuleFactory) => {
            normalModuleFactory.hooks.resolve.tapPromise(pluginName, async (request) => {
                if (!request.request.endsWith('.module.css')) {
                    return;
                }
                for (const extension of ['.js', '.ts']) {
                    const extended = `${request.request}${extension}`;
                    if (await fileExistsAt(path.join(request.context, extended))) {
                        // eslint-disable-next-line require-atomic-updates
                        request.request = extended;
                        return;
                    }
                }
            });
        });
    }

}

export default EsifyCSSWebpackPlugin;
