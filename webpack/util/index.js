import chalk from 'chalk'

// 打印带颜色的信息
export const log = (str, color) => console.log(color ? chalk[color](str) : str)
