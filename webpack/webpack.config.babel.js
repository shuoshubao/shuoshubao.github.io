import entry from './entry'
import output from './output'
import plugins from './plugins'
import rules from './rules'
import resolve from './resolve'
import sundry from './sundry'

export default {
  entry,
  output,
  module: {rules},
  plugins,
  resolve,
  ...sundry
}
