import { gettext } from 'i18n'

AppSettingsPage({
  build() {
    return View({ style: { padding: '12px 20px' } }, [
      Text({
        label: gettext('cashSettings'),
        style: { fontSize: '16px', fontWeight: 'bold' }
      })
    ])
  }
})
