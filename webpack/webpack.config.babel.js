import entry from './entry'
import output from './output'
import plugins from './plugins'
import module from './module'
import resolve from './resolve'
import sundry from './sundry'

export default {
  entry,
  output,
  module,
  plugins,
  resolve,
  ...sundry
}
