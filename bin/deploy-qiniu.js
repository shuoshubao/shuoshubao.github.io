import glob from 'glob'
import deployToQiniu from './qiniu.js'

const fileList = glob.sync('view/**/*.html').map(v => v.slice(5))

deployToQiniu(fileList, 'view')
