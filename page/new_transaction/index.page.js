/// <reference types="@zeppos/types" />
import * as hmUI from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device'
import { log as Logger } from '@zos/utils'
import { push } from '@zos/router'
// import { BasePage } from '@zeppos/zml/base-page'
import {
    TITLE_TEXT_STYLE,
    SCROLL_LIST,
    OPERATION_BUTTON,
    TITLE_PATTERN,
    SMALL_TITLE_PATTERN_TOP,
    LINE,
    BALANCE_VALUE,
    NEW_BALANCE_VALUE,
    BUTTON_IMG
} from 'zosLoader:./index.page.[pf].layout.js'
import { readFileSync, writeFileSync } from '../../utils/fs'
import { getScrollListDataConfig } from '../../utils/index'
import { appState } from '../../utils/appState'
import { LocalStorage } from '@zos/storage'

const storage = new LocalStorage()
const logger = Logger.getLogger('cash')
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()

Page({
    state: { text: null },
    onInit() {
        const new_vl = storage.setItem('new_transaction', 0)

        this.updateNewTransaction = (newBalance) => {
            if (this.newTransactionWidget) {
                this.newTransactionWidget.setProperty(hmUI.prop.TEXT,
                    `R$${newBalance.toFixed(2)}`
                )
            }
        }

        appState.on('new_transaction', this.updateNewTransaction)
    },
    build() {
        const new_vl = storage.getItem('new_transaction')

        hmUI.createWidget(hmUI.widget.TEXT, SMALL_TITLE_PATTERN_TOP('NOVA', 90))
        hmUI.createWidget(hmUI.widget.TEXT, TITLE_PATTERN('Transação', 120))

        hmUI.createWidget(hmUI.widget.FILL_RECT, LINE(185))

        this. newTransactionWidget = hmUI.createWidget(hmUI.widget.BUTTON, NEW_BALANCE_VALUE(
            `${new_vl}`,
            () => {
                // QUANDO PRESSIONADO
                vibrator.start()
                setTimeout(() => {
                    vibrator.stop()
                }, 200)
            },
            () => {
                // QUANDO CLICADO
            }, true
        ))

        hmUI.createWidget(hmUI.widget.BUTTON, OPERATION_BUTTON('↑', 'left', 'bottom', 20,
            () => {
                logger.debug('incrementa mais um ao storage de chave new_trasaction')
                storage.setItem('new_trasaction', storage.getItem('new_transaction') + 1)
                appState.set('new_trasaction', storage.getItem('new_transaction'))
                logger.debug(`valor da chave new_trasaction ${storage.getItem('new_transaction')} | ${new_vl}`)
            }
        ))
        logger.debug(DEVICE_WIDTH)
        logger.debug(Math.floor((DEVICE_WIDTH - px(88)) / 2))
        hmUI.createWidget(hmUI.widget.BUTTON, OPERATION_BUTTON('↓', 'right', 'bottom', 20))
        hmUI.createWidget(hmUI.widget.BUTTON, BUTTON_IMG())
    },
    onDestroy() {

    }
})