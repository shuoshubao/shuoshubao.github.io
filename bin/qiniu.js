import fs from 'fs'
import path from 'path'
import qiniu from 'qiniu'
import chalk from 'chalk'
import glob from 'glob'

qiniu.conf.ACCESS_KEY = 'LKMVIJ4M-zOvdOMOFLoohglxHuOkJz21IALeEcMB'
qiniu.conf.SECRET_KEY = 'ijkKQkeGIvF35rrua-dRtRDd0Uc2Zpwj1jAzP8pZ'
const bucket = 'shuoshubao'
const uptoken = (bucket, key) => (new qiniu.rs.PutPolicy(`${bucket}:${key}`)).token()
const uploadFile = (uptoken, key, localFile) => {
  let extra = new qiniu.io.PutExtra()
  return new Promise((resolve, reject) => qiniu.io.putFile(uptoken, key, localFile, extra, (err, ret) => err ? reject(err) : resolve()))
}

const fileList = glob.sync('build/*').map(v => v.slice(6))

Promise.all(fileList.map(v => {
  console.log(chalk.cyan(`正在上传: ${v}`))
  return uploadFile(uptoken(bucket, v), v, path.join(__dirname, `../build/${v}`))
}))
.then(() => {
  console.log(chalk.green('上传成功'))
  console.log(chalk.green(`共上传${fileList.length}个文件`))
})
.catch(e => {
  console.log(chalk.red('上传失败'))
  console.error(e)
})
