const fs = require('fs');
const path = require('path');

module.exports = class EsifyCSSResolverPlugin {

    apply(compiler) {
        console.info(Object.keys(compiler.hooks));
        compiler.hooks.resolve.tapPromise('EsifyCSSResolverPlugin', async (request) => {
            if (request.request.endsWith('.module.css')) {
                for (const extension of ['.js', '.ts']) {
                    const resolved = `${request.request}${extension}`;
                    const stat = await fs.promises.stat(
                        path.join(request.path, resolved),
                    ).catch(() => null);
                    if (stat && stat.isFile()) {
                        request.request = resolved;
                        break;
                    }
                }
            }
        });
    }

};
