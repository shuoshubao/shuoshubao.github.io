import program from 'commander'
import {webpackDllBuild, webpackBuild} from '../webpack'

program
  .version('0.0.1')
  .option('--task [type]', '任务名')
  .parse(process.argv)

if(program.task === 'dll') {
    (async () => {
      await webpackDllBuild()
    })()
}

if(program.task === 'build') {
  (async () => {
    await webpackBuild()
  })()
}
