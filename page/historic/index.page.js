import * as hmUI from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo } from '@zos/device'
import { showToast } from '@zos/interaction'
import { log as Logger } from '@zos/utils'
import { cashStorage } from '../../core/storage'
import { formatCurrency, formatDateTime } from '../../core/format'
import { COLORS, TRANSACTION_TYPE } from '../../core/constants'

const logger = Logger.getLogger('cash')

Page({
  onInit() {
    logger.debug('historic onInit invoked')
  },

  buildList() {
    const transactions = cashStorage.getTransactions()

    if (this.listWidget) {
      hmUI.deleteWidget(this.listWidget)
      this.listWidget = null
    }
    if (this.emptyText) {
      hmUI.deleteWidget(this.emptyText)
      this.emptyText = null
    }

    if (transactions.length === 0) {
      this.emptyText = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 120,
        w: this.deviceWidth,
        h: this.deviceHeight - 160,
        text: getText('No transactions yet'),
        color: COLORS.MUTED,
        text_size: 28,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.WRAP
      })
      return
    }

    const data = transactions.map((tx) => ({
      tx_id: tx.id,
      name: `${formatDateTime(tx.timestamp)} ${tx.type === TRANSACTION_TYPE.EXPENSE ? '-' : '+'} ${formatCurrency(tx.amount)}`,
      type_id: tx.type === TRANSACTION_TYPE.EXPENSE ? 2 : 1
    }))

    this.listWidget = hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
      x: 10,
      y: 90,
      w: this.deviceWidth - 20,
      h: this.deviceHeight - 110,
      item_space: 10,
      item_config: [
        {
          type_id: 1,
          item_bg_color: COLORS.ITEM_BG,
          item_bg_radius: 24,
          text_view: [
            {
              x: 20,
              y: 0,
              w: this.deviceWidth - 80,
              h: 100,
              key: 'name',
              color: COLORS.INCOME,
              text_size: 26,
              align_h: hmUI.align.LEFT
            }
          ],
          text_view_count: 1,
          item_height: 100
        },
        {
          type_id: 2,
          item_bg_color: COLORS.ITEM_BG,
          item_bg_radius: 24,
          text_view: [
            {
              x: 20,
              y: 0,
              w: this.deviceWidth - 80,
              h: 100,
              key: 'name',
              color: COLORS.EXPENSE,
              text_size: 26,
              align_h: hmUI.align.LEFT
            }
          ],
          text_view_count: 1,
          item_height: 100
        }
      ],
      item_config_count: 2,
      data,
      data_type_config: [{ start: 0, end: transactions.length, type_id: 2 }],
      data_length: transactions.length,
      click_func: (list, index) => {
        const tx = cashStorage.getTransactions()[index]
        if (!tx) {
          return
        }
        cashStorage.removeTransaction(tx.id)
        showToast({ message: getText('Transaction removed') })
        this.buildHeader()
        this.buildList()
      }
    })
  },

  buildHeader() {
    if (this.balanceHeader) {
      hmUI.deleteWidget(this.balanceHeader)
    }
    this.balanceHeader = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 40,
      w: this.deviceWidth,
      h: 44,
      text: `${getText('Current Balance')}: ${formatCurrency(cashStorage.getBalance())}`,
      color: COLORS.ACCENT,
      text_size: 30,
      align_h: hmUI.align.CENTER_H,
      text_style: hmUI.text_style.WRAP
    })
  },

  build() {
    const { width, height } = getDeviceInfo()
    this.deviceWidth = width
    this.deviceHeight = height

    this.buildHeader()
    this.buildList()
  },

  onDestroy() {
    logger.debug('historic onDestroy invoked')
  }
})
