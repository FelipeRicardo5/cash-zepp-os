import { log as Logger } from '@zos/utils'

const logger = Logger.getLogger('cash')

App({
  globalData: {},
  onCreate() {
    logger.debug('app onCreate invoked')
  },
  onDestroy() {
    logger.debug('app onDestroy invoked')
  }
})
