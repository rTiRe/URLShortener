import log4js from 'log4js'

import config from './config'

const logger = log4js.getLogger()
logger.level = log4js.levels.getLevel(config.LOG_LEVEL) || log4js.levels.ERROR

export default logger
