import type * as webpack from 'webpack';

export const compile = async (
    compiler: webpack.Compiler,
) => {
    const result = await new Promise<webpack.Stats>((resolve, reject) => {
        compiler.run((error, stats) => {
            if (error) {
                reject(error);
            } else if (stats) {
                resolve(stats);
            } else {
                reject(new Error('NoStats'));
            }
        });
    });
    const {compilation} = result;
    for (const asset of compilation.getAssets()) {
        compilation.emitAsset(asset.name, asset.source);
    }
    await new Promise<void>((resolve, reject) => {
        compiler.close((error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
    return result;
};
