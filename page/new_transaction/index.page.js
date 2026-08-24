import AutoGUI from '@silver-zepp/autogui'
import { getText } from '@zos/i18n'
import { back } from '@zos/router'
import { showToast } from '@zos/interaction'
import { log as Logger } from '@zos/utils'
import { appState } from '../../core/state'
import { cashStorage } from '../../core/storage'
import { formatCurrency } from '../../core/format'
import { COLORS, MAX_INPUT_DIGITS, STORAGE_KEYS, TRANSACTION_TYPE } from '../../core/constants'

const logger = Logger.getLogger('cash')

Page({
  onInit() {
    logger.debug('new_transaction onInit invoked')
    this.inputDigits = ''
    this.transactionType = TRANSACTION_TYPE.EXPENSE
  },

  currentAmount() {
    return this.inputDigits ? parseInt(this.inputDigits, 10) / 100 : 0
  },

  refreshDisplay() {
    this.amountText.update({ text: formatCurrency(this.currentAmount()) })
    this.incomeButton.update({ normal_color: this.isSelected(TRANSACTION_TYPE.INCOME) })
    this.expenseButton.update({ normal_color: this.isSelected(TRANSACTION_TYPE.EXPENSE) })
  },

  isSelected(type) {
    return type === this.transactionType ? COLORS.PRIMARY : COLORS.PRIMARY_DARK
  },

  appendDigit(digit) {
    if (this.inputDigits.length >= MAX_INPUT_DIGITS) {
      return
    }
    if (this.inputDigits === '' && digit === '0') {
      return
    }
    this.inputDigits += digit
    this.refreshDisplay()
  },

  eraseDigit() {
    this.inputDigits = this.inputDigits.slice(0, -1)
    this.refreshDisplay()
  },

  selectType(type) {
    this.transactionType = type
    this.refreshDisplay()
  },

  save() {
    const amount = this.currentAmount()
    if (amount <= 0) {
      showToast({ message: getText('Invalid amount') })
      return
    }

    cashStorage.addTransaction(this.transactionType, amount)
    appState.set(STORAGE_KEYS.BALANCE, cashStorage.getBalance())
    showToast({ message: getText('Transaction saved') })

    logger.debug(`transaction saved: ${this.transactionType} ${amount}`)
    back()
  },

  build() {
    const gui = new AutoGUI()
    AutoGUI.SetTextColor(COLORS.WHITE)

    gui.text(getText('New Transaction'), { text_size: 28, color: COLORS.MUTED })

    this.amountText = gui.text(formatCurrency(this.currentAmount()), {
      text_size: 48,
      color: COLORS.ACCENT
    })

    this.incomeButton = gui.button(getText('Income'), () => this.selectType(TRANSACTION_TYPE.INCOME), {
      radius: 20,
      text_size: 26,
      normal_color: COLORS.PRIMARY_DARK,
      press_color: COLORS.PRIMARY
    })
    this.expenseButton = gui.button(
      getText('Expense'),
      () => this.selectType(TRANSACTION_TYPE.EXPENSE),
      {
        radius: 20,
        text_size: 26,
        normal_color: COLORS.PRIMARY_DARK,
        press_color: COLORS.PRIMARY
      }
    )

    const keypadRows = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']]
    keypadRows.forEach((row) => {
      row.forEach((digit) => {
        gui.button(digit, () => this.appendDigit(digit), {
          radius: 16,
          text_size: 32,
          normal_color: COLORS.PRIMARY_DARK,
          press_color: COLORS.PRIMARY
        })
      })
      gui.newRow()
    })

    gui.button('<', () => this.eraseDigit(), {
      radius: 16,
      text_size: 32,
      normal_color: COLORS.PRIMARY_DARK,
      press_color: COLORS.PRIMARY
    })
    gui.button('0', () => this.appendDigit('0'), {
      radius: 16,
      text_size: 32,
      normal_color: COLORS.PRIMARY_DARK,
      press_color: COLORS.PRIMARY
    })
    gui.spacer()
    gui.newRow()

    gui.button(getText('Save'), () => this.save(), {
      radius: 24,
      text_size: 30,
      normal_color: COLORS.PRIMARY,
      press_color: COLORS.PRIMARY_DARK
    })

    gui.render()
    this.refreshDisplay()
  },

  onDestroy() {
    logger.debug('new_transaction onDestroy invoked')
  }
})
