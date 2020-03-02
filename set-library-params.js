const inquirer = require('inquirer')

module.exports = async (opts) => {
    // 命令行设置模版样式相关问题
    // 问询
    const results = [
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名',
            default: opts.name
        },
        {
            type: 'input',
            name: 'description',
            message: '请输入描述信息',
            default: opts.description
        },
        {
            type: 'input',
            name: 'author',
            message: '请输入作者名',
            default: opts.author
        },
        {
            type: 'list',
            name: 'template',
            message: '请选择模版类型',
            choices: ['next-app', 'ts-project', 'react-app', 'nw-app'],
            default: opts.template
        }
    ]
    let info = await inquirer.prompt(results)

    return {
        info
    }
}