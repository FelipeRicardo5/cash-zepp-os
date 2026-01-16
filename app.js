// import { BaseApp } from '@zeppos/zml/base-app'
import { log as Logger } from '@zos/utils'

const logger = Logger.getLogger('todo-list-app')

App({
    globalData: {},
    onCreate() {
      logger.log('app onCreate invoked')
    },

    onDestroy() {
      logger.log('app onDestroy invoked')
    }}
)
