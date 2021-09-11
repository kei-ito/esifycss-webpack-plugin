/* eslint-disable class-methods-use-this */
import * as fs from 'fs';
import * as path from 'path';
import type * as webpack from 'webpack';

const pluginName = 'EsifyCSSResolverPlugin';

class EsifyCSSResolverPlugin {

    public apply(compiler: webpack.Compiler) {
        compiler.hooks.normalModuleFactory.tap(pluginName, (normalModuleFactory) => {
            normalModuleFactory.hooks.resolve.tapPromise(pluginName, async (request) => {
                if (!request.request.endsWith('.module.css')) {
                    return;
                }
                for (const extension of ['.js', '.ts']) {
                    const extended = `${request.request}${extension}`;
                    const absolutePath = path.join(request.context, extended);
                    const stat = await fs.promises.stat(absolutePath).catch(() => null);
                    if (stat && stat.isFile()) {
                        // eslint-disable-next-line require-atomic-updates
                        request.request = extended;
                        return;
                    }
                }
            });
        });
    }

}

export default EsifyCSSResolverPlugin;
