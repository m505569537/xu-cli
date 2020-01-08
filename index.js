#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const chalk = require('chalk')
const symbols = require('log-symbols')

const setLibraryParams = require('./set-library-params')
const createLibrary = require('./create-library')

program
    .name('xu-cli')
    .version('1.0.0', '-v, --version')
    .usage('[options] [package-name]')
    .parse(process.argv)

let opts = {
    description: '?',
    template: 'next-app',
    author: 'xu'
}
if(program.args.length == 1) {
    opts.name = program.args[0]
} else if(program.args.length > 1) {
    // 设定xu-cli后面除了可以接 options之外，最多只能再接收一个参数
    console.log(symbols.error, chalk.red('invalid argument'));
    process.exit(1)
}

const asyncFn = async () => {
    const params = await setLibraryParams(opts)
    if(fs.existsSync(params.info.name)) {
        console.log(symbols.error, chalk.red('文件已存在'))
        process.exit(1)
    } else {
        createLibrary(params)
    }
}
asyncFn()