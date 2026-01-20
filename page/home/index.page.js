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
import { appState } from '../../utils/appState'
import { LocalStorage } from '@zos/storage'

const storage = new LocalStorage()
const logger = Logger.getLogger('todo-list-page') // add correct name here

Page({
  state: {

  },
  onInit() {
    storage.setItem('balance', storage.getItem('balance', 0) || 0)
    logger.debug('page onInit invoked')

    this.updateBalance = (newBalance) => {
      if (this.balanceWidget) {
        this.balanceWidget.setProperty(hmUI.prop.TEXT,
          `Saldo R$ ${newBalance.toFixed(2)}`
        )
      }
    }

    appState.on('balance', this.updateBalance)
  },
  build() {
    const vl = storage.getItem('balance', 100)
    logger.debug('page build invoked')

    if (getDeviceInfo().screenShape !== SCREEN_SHAPE_SQUARE) {
      this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TITLE_TEXT_STYLE
      })
    }

    this.balanceWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      text: `Saldo R$ ${vl}`,
      x: 50,
      y: 100,
      w: 200,
      h: 50,
      color: 0xffffff
    })

    const add = hmUI.createWidget(hmUI.widget.BUTTON, {
      text: '+ R$ 100',
      x: 0,
      y: 200,
      w: 200,
      h: 60,
      click_func: () => {
        // Atualiza o armazenamento local e o estado global
        storage.setItem('balance', storage.getItem('balance') + 100)
        appState.set('balance', storage.getItem('balance'))
        logger.debug(storage.getItem('balance'))
      }
    })

    const sub = hmUI.createWidget(hmUI.widget.BUTTON, {
      text: '- R$ 100',
      x: 150,
      y: 200,
      w: 200,
      h: 60,
      click_func: () => {
        // Atualiza o armazenamento local e o estado global
        storage.setItem('balance', storage.getItem('balance') - 100)
        appState.set('balance', storage.getItem('balance'))
        logger.debug(storage.getItem('balance'))
      }
    })

    this.state.addButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...ADD_BUTTON,
      click_func: () => {
        logger.debug('add button clicked')
        try {
          push({ url: 'page/historic/index.page' })
        } catch (e) {
          hmUI.showToast({ text: e })
          console.log(e)
        }
      }
    })
  },
  onDestroy() {
    logger.debug('page onDestroy invoked')
    // appState.off('balance', this.updateBalance)
  },
}
)
