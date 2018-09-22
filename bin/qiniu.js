import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import qiniu from 'qiniu';

const accessKey = 'LKMVIJ4M-zOvdOMOFLoohglxHuOkJz21IALeEcMB';
const secretKey = 'ijkKQkeGIvF35rrua-dRtRDd0Uc2Zpwj1jAzP8pZ';
const bucket = 'shuoshubao';

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();
const options = {
    scope: bucket
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const log = (str, color) => console.log(color ? chalk[color](str) : str);

const uploadFile = localFile =>
    new Promise((resolve, reject) => {
        const key = localFile.split('/').slice(-1)[0];
        formUploader.putFile(uploadToken, key, localFile, putExtra, err => {
            if (err) {
                reject(err);
            } else {
                log(`成功上传: ${path.relative(process.cwd(), localFile)}`, 'cyan');
                resolve();
            }
        });
    });

const fileList = glob
    .sync(path.resolve(__dirname, '../build/*'), {nodir: false})
    .filter(v => !v.endsWith('.html'));

Promise.all(fileList.map(v => uploadFile(v)))
    .then(() => log(`上传成功, 共上传${fileList.length}个文件`, 'green'))
    .catch(e => {
        log('上传失败', 'red');
        log(e, 'red');
    });
