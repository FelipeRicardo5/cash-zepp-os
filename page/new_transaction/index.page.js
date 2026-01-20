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
    NUMBER_VALUE,
    LINE
} from 'zosLoader:./index.page.[pf].layout.js'
import { readFileSync, writeFileSync } from '../../utils/fs'
import { getScrollListDataConfig } from '../../utils/index'
import { appState } from '../../utils/appState'
import { LocalStorage } from '@zos/storage'

const storage = new LocalStorage()
const logger = Logger.getLogger('todo-list-page')

Page({
    state: { text: null },
    onInit() {

        
    },
    build() {
        hmUI.createWidget(hmUI.widget.TEXT, SMALL_TITLE_PATTERN_TOP('NOVA', 90))
        hmUI.createWidget(hmUI.widget.TEXT, TITLE_PATTERN('Transação', 120))

        hmUI.createWidget(hmUI.widget.FILL_RECT, LINE(180))
        const btn = hmUI.createWidget(hmUI.widget.BUTTON, ADD_BUTTON('+ Adicionar',45, 200, true))
        hmUI.createWidget(hmUI.widget.BUTTON, ADD_BUTTON('- Subtrair',45, 310, false))
        
    },
    onDestroy() {

    }
})