import { LocalStorage } from '@zos/storage'
import { STORAGE_KEYS, TRANSACTION_TYPE } from './constants'

class CashStorage {
  constructor() {
    this.storage = new LocalStorage()
  }

  getBalance() {
    return this.storage.getItem(STORAGE_KEYS.BALANCE, 0) || 0
  }

  setBalance(value) {
    this.storage.setItem(STORAGE_KEYS.BALANCE, value)
  }

  getTransactions() {
    const data = this.storage.getItem(STORAGE_KEYS.TRANSACTIONS, '[]')
    try {
      const parsed = JSON.parse(data)
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      return []
    }
  }

  addTransaction(type, amount) {
    const transaction = {
      id: Date.now(),
      type,
      amount,
      timestamp: Date.now()
    }
    const transactions = this.getTransactions()
    transactions.unshift(transaction)
    this.storage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))

    const delta = type === TRANSACTION_TYPE.EXPENSE ? -amount : amount
    this.setBalance(this.getBalance() + delta)

    return transaction
  }

  removeTransaction(id) {
    const transactions = this.getTransactions()
    const index = transactions.findIndex((tx) => tx.id === id)
    if (index === -1) {
      return false
    }
    const [removed] = transactions.splice(index, 1)
    this.storage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))

    const delta = removed.type === TRANSACTION_TYPE.EXPENSE ? removed.amount : -removed.amount
    this.setBalance(this.getBalance() + delta)

    return true
  }

  resetBalance() {
    this.setBalance(0)
  }
}

export const cashStorage = new CashStorage()
