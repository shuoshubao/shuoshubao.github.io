const versionStorage = localStorage.getItem('version')
const jsStorage = localStorage.getItem('js')

if(window.page_config.version == versionStorage) {
  eval(jsStorage)
}else {
  fetch('./asset/app.min.js')
  .then(rs => rs.text())
  .then(rs => {
    eval(rs)
    localStorage.setItem('js', rs)
    localStorage.setItem('version', window.page_config.version)
  })
}