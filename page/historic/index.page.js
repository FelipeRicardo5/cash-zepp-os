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
const logger = Logger.getLogger('cash')

Page({
    state: { text: null },
    onInit() {
        logger.debug('page HISTORIC onInit invoked')
        this.updateBalance = (newBalance) => {
            if (this.balanceWidget) {
                this.balanceWidget.setProperty(hmUI.prop.TEXT,
                    `Saldo R$ ${newBalance.toFixed(2)}`
                )
            }
        }
        appState.on('balance', this.updateBalance)
        logger.debug(vl)
        logger.debug(appState.getListeners('balance').length)
        logger.debug(appState.get('balance'))
        
    },
    build() {
        const vl = storage.getItem('balance')
        hmUI.createWidget(hmUI.widget.TEXT, TITLE_PATTERN(vl))

        this.balanceWidget = hmUI.createWidget(hmUI.widget.BUTTON, {
            text: '+ R$ 100',
            x: 50,
            y: 200,
            w: 200,
            h: 60,
            click_func: () => {
                const current = appState.get('balance')
                appState.set('balance', current + 100)
                // ✅ Todas as páginas que escutam 'balance' serão atualizadas!
                logger.debug(appState.get('balance'))
            }
        })
    },
    onDestroy() {

    }
})