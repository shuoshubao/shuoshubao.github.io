const qiniu = require('qiniu')
const extra = new qiniu.io.PutExtra()

qiniu.conf.ACCESS_KEY = 'LKMVIJ4M-zOvdOMOFLoohglxHuOkJz21IALeEcMB'
qiniu.conf.SECRET_KEY = 'ijkKQkeGIvF35rrua-dRtRDd0Uc2Zpwj1jAzP8pZ'
const bucket = 'shuoshubao'

//构建上传策略函数
const uptoken = (bucket, key) => (new qiniu.rs.PutPolicy(bucket + ':' + key)).token()
//构造上传函数
const uploadFile = (uptoken, key, localFile) => qiniu.io.putFile(uptoken, key, localFile, extra, (err, ret) => {});

const article = require('./data/article')

const argv = process.argv

if(argv.length === 4) {
  const key = `${[argv[2], argv[3]].join('/')}.md`
  const filePath = `./docs/${[argv[2], argv[3]].join('/')}.md`
  uploadFile(uptoken(bucket, key), key, filePath)
}else {
  article.forEach((v, i) => {
    const key = `${[v.categories, v.name].join('/')}.md`
    const filePath = `./docs/${[v.categories, v.name].join('/')}.md`
    uploadFile(uptoken(bucket, key), key, filePath)
  })
}