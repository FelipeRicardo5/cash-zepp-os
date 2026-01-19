/// <reference types="@zeppos/types" />
import * as hmUI from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device'
import { log as Logger } from '@zos/utils'
import { push } from '@zos/router'
// import { BasePage } from '@zeppos/zml/base-page'
import {
  TITLE_TEXT_STYLE,
  TIPS_TEXT_STYLE,
  SCROLL_LIST,
  ADD_BUTTON,
  TITLE_PATTERN,
  SMALL_TITLE_PATTERN_TOP,
  NUMBER_VALUE
} from 'zosLoader:./index.page.[pf].layout.js'
import { readFileSync, writeFileSync } from './../../utils/fs'
import { getScrollListDataConfig } from './../../utils/index'

const logger = Logger.getLogger('todo-list-page')

Page({
    state: {text: null},
    onInit() {
        logger.debug('page HISTORIC onInit invoked')
    },
    build() {
        hmUI.createWidget(hmUI.widget.TEXT, TITLE_PATTERN('Segunda tela'))
    },
    onDestroy() {

    }
})