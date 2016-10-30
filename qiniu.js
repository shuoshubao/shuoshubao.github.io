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

article.forEach((v, i) => {
  // 要保存的文件名
  const key = `${[v.categories, v.name].join('/')}.md`
  //要上传文件的本地路径
  const filePath = `./docs/${[v.categories, v.name].join('/')}.md`
  uploadFile(uptoken(bucket, key), key, filePath)
})