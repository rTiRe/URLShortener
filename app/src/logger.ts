import log4js from 'log4js'

import env from './config'

const logger = log4js.getLogger()
logger.level = log4js.levels.getLevel(env.LOG_LEVEL || 'error') || log4js.levels.ERROR

console.log(env.LOG_LEVEL)
console.log(`Logger level set to ${logger.level}`)

export default logger
