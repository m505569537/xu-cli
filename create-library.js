const fs = require('fs')
const ora = require('ora')
const download = require('download-git-repo')
const handlebars = require('handlebars')
const symbols = require('log-symbols')
const chalk = require('chalk')

module.exports = ({ info }) => {
    // 创建文件，下载模版，并修改模版内容
    const spinner = ora('正在下载模版...')
    spinner.start()
    let target
    switch (info.template) {
        case 'next-app':
            target = 'm505569537/next-app-template'
            break;
        case 'ts-app':
            target = 'm505569537/first-test'
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
              } else {
                spinner.fail();
                console.log(symbols.error, chalk.red(`拉取远程仓库失败${err}`));
              }
        }
    )
}