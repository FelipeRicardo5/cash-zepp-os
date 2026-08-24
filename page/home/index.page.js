import AutoGUI from '@silver-zepp/autogui'
import { getText } from '@zos/i18n'
import { push } from '@zos/router'
import { showToast } from '@zos/interaction'
import { Vibrator } from '@zos/sensor'
import { log as Logger } from '@zos/utils'
import { appState } from '../../core/state'
import { cashStorage } from '../../core/storage'
import { formatCurrency } from '../../core/format'
import { COLORS, STORAGE_KEYS } from '../../core/constants'

const logger = Logger.getLogger('cash')
const vibrator = new Vibrator()
const RESET_CONFIRM_TIMEOUT_MS = 3000

Page({
  onInit() {
    logger.debug('home onInit invoked')

    this.resetArmed = false
    this.resetTimer = null

    this.updateBalance = (value) => {
      if (this.balanceText) {
        this.balanceText.update({ text: formatCurrency(value) })
      }
    }

    appState.on(STORAGE_KEYS.BALANCE, this.updateBalance)
  },

  armReset(gui) {
    this.resetArmed = true
    this.hintText.update({ text: getText('Tap again to confirm') })
    this.resetTimer = setTimeout(() => this.disarmReset(), RESET_CONFIRM_TIMEOUT_MS)
  },

  disarmReset() {
    this.resetArmed = false
    if (this.resetTimer) {
      clearTimeout(this.resetTimer)
      this.resetTimer = null
    }
    if (this.hintText) {
      this.hintText.update({ text: '' })
    }
  },

  handleReset() {
    if (!this.resetArmed) {
      this.armReset()
      return
    }

    this.disarmReset()
    cashStorage.resetBalance()
    appState.set(STORAGE_KEYS.BALANCE, 0)

    vibrator.start()
    setTimeout(() => vibrator.stop(), 200)
    showToast({ message: getText('Balance reset') })
  },

  build() {
    const balance = cashStorage.getBalance()

    const gui = new AutoGUI()
    AutoGUI.SetTextColor(COLORS.WHITE)

    gui.text(getText('Current Balance'))
    this.balanceText = gui.text(formatCurrency(balance), {
      text_size: 52,
      color: COLORS.ACCENT
    })
    gui.newRow()

    gui.button(
      getText('New Transaction'),
      () => push({ url: 'page/new_transaction/index.page' }),
      { normal_color: COLORS.PRIMARY, press_color: COLORS.PRIMARY_DARK, radius: 24 }
    )
    gui.button(getText('History'), () => push({ url: 'page/historic/index.page' }), {
      normal_color: COLORS.PRIMARY,
      press_color: COLORS.PRIMARY_DARK,
      radius: 24
    })
    gui.newRow()

    gui.button(getText('Reset Balance'), () => this.handleReset(), {
      normal_color: COLORS.PRIMARY_DARK,
      press_color: COLORS.PRIMARY,
      radius: 24,
      text_size: 28
    })
    this.hintText = gui.text('', { text_size: 20, color: COLORS.MUTED })

    gui.render()

    appState.set(STORAGE_KEYS.BALANCE, balance)
  },

  onDestroy() {
    logger.debug('home onDestroy invoked')
    this.disarmReset()
    appState.off(STORAGE_KEYS.BALANCE, this.updateBalance)
  }
})
