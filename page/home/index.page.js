/// <reference types="@zeppos/types" />
import * as hmUI from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device'
import { log as Logger } from '@zos/utils'
import { push } from '@zos/router'
import { Vibrator } from '@zos/sensor'
// import { BasePage } from '@zeppos/zml/base-page'
import { createTextConfig } from '../../utils/textStyles.js'

import {
  TITLE_TEXT_STYLE,
  SCROLL_LIST,
  ADD_BUTTON,
  TITLE_PATTERN,
  SMALL_TITLE_PATTERN_TOP,
  BALANCE_VALUE,
  LINE
} from 'zosLoader:./index.page.[pf].layout.js'
import { readFileSync, writeFileSync } from './../../utils/fs'
import { getScrollListDataConfig } from './../../utils/index'
import { appState } from '../../utils/appState'
import { LocalStorage } from '@zos/storage'

const vibrator = new Vibrator()
const storage = new LocalStorage()
const logger = Logger.getLogger('cash') // add correct name here

Page({
  state: {

  },
  onInit() {
    storage.setItem('balance', storage.getItem('balance', 0) || 0)
    logger.debug('page onInit invoked')

    this.updateBalance = (newBalance) => {
      if (this.balanceWidget) {
        this.balanceWidget.setProperty(hmUI.prop.TEXT,
          `R$${newBalance.toFixed(2)}`
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

    hmUI.createWidget(hmUI.widget.TEXT, SMALL_TITLE_PATTERN_TOP('Pressione e segure p/ resetar', 100))
    hmUI.createWidget(hmUI.widget.TEXT, TITLE_PATTERN('Saldo Atual', 140))

    hmUI.createWidget(hmUI.widget.FILL_RECT, LINE(200))

    this.balanceWidget = hmUI.createWidget(hmUI.widget.BUTTON, BALANCE_VALUE(
      `R$${vl.toFixed(2)}`,
      () => {
        vibrator.start()
        storage.setItem('balance', 0)
        appState.set('balance', storage.getItem('balance'))
        setTimeout(() => {
          vibrator.stop()
        }, 200)
      },
      () => { push({ url: 'page/new_transaction/index.page' }) },
      
    ))

    hmUI.createWidget(hmUI.widget.FILL_RECT, LINE(320))
    hmUI.createWidget(hmUI.widget.TEXT, SMALL_TITLE_PATTERN_TOP('ou apenas clique para alterar.', 340))

    // const add = hmUI.createWidget(hmUI.widget.BUTTON, {
    //   text: '+ R$ 100',
    //   x: 0,
    //   y: 350,
    //   w: 200,
    //   h: 60,
    //   click_func: () => {
    //     // Atualiza o armazenamento local e o estado global
    //     storage.setItem('balance', storage.getItem('balance') + 100)
    //     appState.set('balance', storage.getItem('balance'))
    //     logger.debug(storage.getItem('balance'))
    //   }
    // })

    // const sub = hmUI.createWidget(hmUI.widget.BUTTON, {
    //   text: '- R$ 100',
    //   x: 150,
    //   y: 350,
    //   w: 200,
    //   h: 60,
    //   click_func: () => {
    //     // Atualiza o armazenamento local e o estado global
    //     storage.setItem('balance', storage.getItem('balance') - 100)
    //     appState.set('balance', storage.getItem('balance'))
    //     logger.debug(storage.getItem('balance'))
    //   }
    // })


  },
  onDestroy() {
    logger.debug('page onDestroy invoked')
    // appState.off('balance', this.updateBalance)
  },
}
)
