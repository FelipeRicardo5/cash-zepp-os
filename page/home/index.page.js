/// <reference types="@zeppos/types" />
import * as hmUI from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device'
import { log as Logger } from '@zos/utils'
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
  state: {
    scrollList: null,
    tipText: null,
    refreshText: null,
    addButton: null,
    dataList: readFileSync()
  },
  onInit() {
    logger.debug('page onInit invoked')
    this.getTodoList()
  },
  build() {
    logger.debug('page build invoked')

    if (getDeviceInfo().screenShape !== SCREEN_SHAPE_SQUARE) {
      this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TITLE_TEXT_STYLE
      })
    }

    this.createAndUpdateList(false)

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: px(42),
      y: px(150),
      w: DEVICE_WIDTH - px(42 * 2),  
      h: px(2),  
      color: 0xffffff  
    })
    
    hmUI.createWidget(hmUI.widget.TEXT, SMALL_TITLE_PATTERN_TOP('Pressione e segure p/ resetar'))
    hmUI.createWidget(hmUI.widget.TEXT, TITLE_PATTERN('SALDO ATUAL'))
    hmUI.createWidget(hmUI.widget.TEXT, NUMBER_VALUE('R$500,00'))

    this.state.addButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...ADD_BUTTON,
      click_func: () => {
        logger.debug('add button clicked')
        try {
          hmUI.showToast({ text: 'Add clicked' })
        } catch (e) {
          // swallow if showToast unavailable in current env
        }
        this.addRandomTodoItem()
      }
    })
  },
  onDestroy() {
    logger.debug('page onDestroy invoked')
    writeFileSync(this.state.dataList, false)
  },
  onCall(req) {
    const dataList = req.result.map((i) => ({ name: i, img_src: 'delete.png' }))
    logger.log('call dataList', dataList)
    this.refreshAndUpdate(dataList)
  },
  getTodoList() {
    logger.debug('-------------------------------------------- Get Todo List Function!!')
    logger.log('-------------------------------------------- Log Get Todo List Function!!')
    this.request({
      method: 'GET_TODO_LIST'
    })
      .then(({ result }) => {
        this.state.dataList = result.map((d) => ({ name: d, img_src: 'delete.png' }))
        this.createAndUpdateList()
      })
      .catch((res) => {
        logger.error('-------------------------------------------- Error getTodoList!!')
        this.createAndUpdateList()
      })
  },
  addRandomTodoItem() {
    logger.debug('addRandomTodoItem invoked — checking request')
    try {
      logger.debug('this.request type:', typeof this.request)
    } catch (e) {
      logger.error('error checking this.request type', e)
    }

    try {
      hmUI.showToast({ text: 'Calling ADD' })
    } catch (e) { }

    if (typeof this.request !== 'function') {
      logger.error('this.request is not a function on this Page instance')
      try {
        hmUI.showToast({ text: 'Request not available' })
      } catch (e) { }
      return
    }

    this.request({ method: 'ADD' })
      .then((res) => {
        logger.debug('ADD result:', res)
        const result = res && res.result ? res.result : []
        this.state.dataList = result.map((d) => ({ name: d, img_src: 'delete.png' }))
        this.createAndUpdateList()
        hmUI.showToast({ text: getText('addSuccess') })
      })
      .catch((err) => {
        logger.error('ADD request failed', err)
        try {
          hmUI.showToast({ text: getText('addFailure') })
        } catch (e) { }
      })
  },
  deleteTodoItem(index) {
    this.request({
      method: 'DELETE',
      params: { index }
    })
      .then(({ result }) => {
        this.state.scrollList.setProperty(hmUI.prop.DELETE_ITEM, { index: index })
        this.state.dataList.splice(index, 1)
        hmUI.showToast({
          text: getText('deleteSuccess')
        })
      })
      .catch((res) => {
        hmUI.showToast({
          text: getText('deleteFailure')
        })
      })
  },
  changeUI(showEmpty) {
    const { dataList } = this.state

    if (showEmpty) {
      if (dataList.length === 0) {
        !this.state.tipText &&
          (this.state.tipText = hmUI.createWidget(hmUI.widget.TEXT, {
            ...TIPS_TEXT_STYLE
          }))
      }
      const isTip = dataList.length === 0

      this.state.refreshText && this.state.refreshText.setProperty(hmUI.prop.VISIBLE, false)
      this.state.tipText && this.state.tipText.setProperty(hmUI.prop.VISIBLE, isTip)
      this.state.scrollList && this.state.scrollList.setProperty(hmUI.prop.VISIBLE, !isTip)
    } else {
      // 占位刷新
      !this.state.refreshText &&
        (this.state.refreshText = hmUI.createWidget(hmUI.widget.TEXT, {
          ...TIPS_TEXT_STYLE,
          text: ' '
        }))

      this.state.tipText && this.state.tipText.setProperty(hmUI.prop.VISIBLE, false)
      this.state.refreshText.setProperty(hmUI.prop.VISIBLE, true)
      this.state.scrollList && this.state.scrollList.setProperty(hmUI.prop.VISIBLE, false)
    }
  },
  createAndUpdateList(showEmpty = true) {
    const _scrollListItemClick = (list, index, key) => {
      if (key === 'img_src') {
        this.deleteTodoItem(index)
      }
    }
    const { scrollList, dataList } = this.state
    this.changeUI(showEmpty)
    const dataTypeConfig = getScrollListDataConfig(
      dataList.length === 0 ? -1 : 0,
      dataList.length
    )
    if (scrollList) {
      scrollList.setProperty(hmUI.prop.UPDATE_DATA, {
        data_array: dataList,
        data_count: dataList.length,
        data_type_config: [{ start: 0, end: dataList.length, type_id: 2 }],
        data_type_config_count: dataTypeConfig.length,
        on_page: 1
      })
    } else {
      this.state.scrollList = hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
        ...(SCROLL_LIST || {}),
        data_array: dataList,
        data_count: dataList.length,
        data_type_config: dataTypeConfig,
        data_type_config_count: dataTypeConfig.length,
        item_enable_horizon_drag: true,
        item_drag_max_distance: -120,
        on_page: 1,
        item_click_func: _scrollListItemClick
      })
    }
  },
  refreshAndUpdate(dataList = []) {
    this.state.dataList = []
    this.createAndUpdateList(false)

    setTimeout(() => {
      this.state.dataList = dataList
      this.createAndUpdateList()
    }, 20)
  }
}
)
