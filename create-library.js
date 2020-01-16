const fs = require('fs')
const ora = require('ora')
const download = require('download-git-repo')
const handlebars = require('handlebars')
const symbols = require('log-symbols')
const chalk = require('chalk')
const cp = require('child_process')

module.exports = ({ info }) => {
    // 创建文件，下载模版，并修改模版内容
    const spinner = ora('正在下载模版...')
    spinner.start()
    let target
    switch (info.template) {
        case 'next-app':
            target = 'm505569537/next-app-template'
            break;
        case 'ts-project':
            target = 'm505569537/ts-template'
            break;
        case 'react-app':
            target = 'm505569537/react-template'
            break;
        default:
            target = 'm505569537/test-web'
            break;
    }
    download(
        target,
        info.name,
        { clone: true },
        err => {
            if (!err) {
                spinner.succeed();
                const fileName = `${info.name}/package.json`;
                if (fs.existsSync(fileName)) {
                  fs.readFile(`${info.name}/package.json`, (err, data) => {
                    if (err) throw err;
                    let _data = JSON.parse(data.toString())
                    _data.name = info.name
                    _data.description = info.description
                    _data.author = info.author
                    let str = JSON.stringify(_data, null, 4);
                    fs.writeFile(`${info.name}/package.json`, str, function (err) {
                      if (err) throw err;
                    })
                  })
                }
                console.log(symbols.success, chalk.green("项目初始化完成"));
                const installSpinner = ora('正在下载依赖...');
                installSpinner.start();
                cp.exec(`cd ${info.name} && npm i`, (err) => {
                  if(!err) {
                    installSpinner.succeed()
                    console.log(symbols.success, chalk.green('依赖下载完成，项目构建结束'));
                  } else {
                    installSpinner.fail()
                    console.log(symbols.error, chalk.red('依赖下载失败，请尝试手动下载依赖'));
                  }
                })
              } else {
                spinner.fail();
                console.log(symbols.error, chalk.red(`拉取远程仓库失败${err}`));
              }
        }
    )
}