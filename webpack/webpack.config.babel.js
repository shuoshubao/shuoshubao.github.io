import entry from './entry'
import plugins from './plugins'
import module from './module'
import resolve from './resolve'
import sundry from './sundry'

export default {
  ...entry,
  module,
  plugins,
  resolve,
  ...sundry
}
