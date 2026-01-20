export const createTextConfig = (options) => {
  const defaults = {
    x: px(42),
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(50),
    align_h: hmUI.align.CENTER_H,
    text_style: hmUI.text_style.WRAP,
    text_size: 24,
    color: 0xFFFFFF
  }

  return {
    ...defaults,
    ...options,
    text: getText(options.text),
    y: px(options.y)
  }
}
