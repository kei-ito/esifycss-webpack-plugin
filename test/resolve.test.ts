import * as path from 'path';
import * as fs from 'fs';
import * as vm from 'vm';
import ava from 'ava';
import * as webpack from 'webpack';
import EsifyCSSWebpackPlugin from '../src';
import {compile} from './util/compile';
import {setupTest} from './util/setupTest';
import {deployFiles} from './util/deployFiles';

ava('resolve .css → .css.js', async (t) => {
    const {directory, defaultConfig} = await setupTest();
    const className = {foo: `_${Date.now()}`};
    await deployFiles(directory, {
        'style.module.css': '',
        'style.module.css.js': `export const className = ${JSON.stringify(className)};`,
        'entry.js': [
            'import * as css from \'./style.module.css\';',
            'result.css = css;',
        ].join('\n'),
    });
    const compiler = webpack({
        ...defaultConfig,
        entry: path.join(directory, 'entry.js'),
        output: {
            path: directory,
            filename: 'output.js',
            iife: false,
        },
    });
    (new EsifyCSSWebpackPlugin()).apply(compiler);
    await compile(compiler);
    const files = await fs.promises.readdir(directory);
    t.log(files);
    t.true(files.includes('output.js'));
    const code = await fs.promises.readFile(path.join(directory, 'output.js'), 'utf-8');
    const context = {result: {}};
    vm.runInNewContext(code, context);
    t.like(context.result, {
        css: {className},
    });
});

ava('resolve .css → .css.ts', async (t) => {
    const {directory, defaultConfig} = await setupTest();
    const className = {foo: `_${Date.now()}`};
    await deployFiles(directory, {
        'style.module.css': '',
        'style.module.css.ts': `export const className = ${JSON.stringify(className)};`,
        'entry.js': [
            'import * as css from \'./style.module.css\';',
            'result.css = css;',
        ].join('\n'),
    });
    const compiler = webpack({
        ...defaultConfig,
        entry: path.join(directory, 'entry.js'),
        output: {
            path: directory,
            filename: 'output.js',
            iife: false,
        },
    });
    (new EsifyCSSWebpackPlugin()).apply(compiler);
    await compile(compiler);
    const files = await fs.promises.readdir(directory);
    t.log(files);
    t.true(files.includes('output.js'));
    const code = await fs.promises.readFile(path.join(directory, 'output.js'), 'utf-8');
    const context = {result: {}};
    vm.runInNewContext(code, context);
    t.like(context.result, {
        css: {className},
    });
});
