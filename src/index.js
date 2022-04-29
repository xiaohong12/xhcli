#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');
const download = require('download-git-repo')
const USER_HOME = process.env.HOME || process.env.USERPROFILE
const questions = [
    {
        type: "rawlist", // 提示的类型
        message: "请选择需要创建的项目模板`",
        name: "answer1",//存储用户回答的答案字段
        choices: [
            {
                key: '1',
                name: "react-h5",
                value: "1",
            },
            {
                key: '2',
                name: "react-web",
                value: "2",
            },
        ],
    },
    {
        type: "input", // 提示的类型
        message: "请输入项目名称`",
        name: "answer2",//存储用户回答的答案字段
    },
];

inquirer.prompt(questions).then((answers) => {
    download('xiaohong12/raect-mobine', USER_HOME + "/" + answers.answer2, function (err) {
        if (!err) {
            rederFilesAndWriteDate(answers)
        }
    })
});


function rederFilesAndWriteDate(a) {
    const templeteDir = USER_HOME + "/" + a.answer2
    let data = fs.readFileSync(templeteDir + "/package.json", "utf8");
    let paresPackageDate = JSON.parse(data);
    paresPackageDate.name = a.answer2,
        fs.rm(templeteDir + "/package.json", (err) => {
            if (!err) {
                fs.writeFile(templeteDir + '/package.json', JSON.stringify(paresPackageDate), { 'flag': 'a' }, function (err) {
                    if (!err) {
                        console.log("下载成功!欢迎使用～")
                    }
                });
            }
        })
}

