import plugins from './plugins'
import rules from './rules'
import sundry from './sundry'

export default {
    module: { rules },
    plugins,
    ...sundry
}
