export function formatCurrency(value) {
  const safeValue = Number.isFinite(value) ? value : 0
  return `R$ ${safeValue.toFixed(2).replace('.', ',')}`
}

export function formatDateTime(timestamp) {
  const date = new Date(timestamp)
  const pad = (n) => `${n}`.padStart(2, '0')
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
