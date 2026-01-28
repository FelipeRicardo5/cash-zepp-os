import * as hmUI from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo } from '@zos/device'
import { px } from '@zos/utils'
import { getIconPosition } from '../utils/getPositionPattern'

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()

// ==================== ESTILIZAÇÕES COMUNS (IDÊNTICAS PARA SQUARE E ROUND) ====================

export const TITLE_TEXT_STYLE = {
  text: getText('todoList'),
  x: px(42),
  y: px(65),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(50),
  color: 0xffffff,
  text_size: 36,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
}

export const SCROLL_LIST = {
  item_height: px(120),
  item_space: px(10),
  item_config: [
    {
      type_id: 1,
      item_bg_color: 0x333333,
      item_bg_radius: px(25),
      text_view: [
        {
          x: px(80),
          y: px(0),
          w: px(360),
          h: px(120),
          key: 'name',
          color: 0xffff00,
          text_size: px(36),
          align_h: hmUI.align.LEFT
        }
      ],
      text_view_count: 1,
      image_view: [
        {
          x: DEVICE_WIDTH - px(10),
          y: px(16),
          w: px(88),
          h: px(88),
          key: 'img_src',
          action: true
        }
      ],
      image_view_count: 1,
      item_height: px(120)
    },
    {
      type_id: 2,
      item_bg_color: 0x333333,
      item_bg_radius: px(25),
      text_view: [
        {
          x: px(80),
          y: px(0),
          w: px(360),
          h: px(120),
          key: 'name',
          color: 0xff0000,
          text_size: px(36),
          align_h: hmUI.align.LEFT
        }
      ],
      text_view_count: 1,
      image_view: [
        {
          x: DEVICE_WIDTH - px(10),
          y: px(16),
          w: px(88),
          h: px(88),
          key: 'img_src',
          action: true
        }
      ],
      image_view_count: 1,
      item_height: px(120)
    }
  ],
  item_config_count: 2,
  x: px(10),
  y: px(80),
  h: px(250),
  w: DEVICE_WIDTH - px(10) * 2
}

export const ADD_BUTTON = {
  x: Math.floor((DEVICE_WIDTH - px(88)) / 2),
  y: DEVICE_HEIGHT - px(100),
  w: px(88),
  h: px(88),
  normal_src: 'add.png',
  press_src: 'add.png'
}

export const OPERATION_BUTTON = (op, x, y, pad, onClick, onPress) => {
  const { x: calcX, y: calcY } = getIconPosition({
    alignX: x,
    alignY: y,
    size: px(88),
    padding: px(pad),
  })

  const finalX = (typeof x === 'number') ? x : calcX
  const finalY = (typeof y === 'number') ? y : calcY

  return {
    text: getText(op),
    x: finalX,
    y: finalY,
    w: DEVICE_WIDTH - px(150 * 2),
    h: px(88),
    text_size: 56,
    radius: 100,
    normal_color: 0x7C4FC6,
    press_color: 0x22143F,
    click_func: onClick,
    longpress_func: onPress
  }
}

export const BUTTON_IMG = () => {
  const { x, y } = getIconPosition({
    alignX: 'center',
    alignY: 'bottom',
    size: px(88),
    padding: px(20),
  })

  return {
    x: x,
    y: y,
    w: px(88),
    h: px(88),
    normal_src: 'save.png',
    press_src: 'save.png',
  }
}


export const BALANCE_VALUE = (text, onPress = () => {}, onClick = () => {}, isNewTransaction = false) => ({
  text: getText(text),
  x: px(42),
  y: px(215),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(90),
  color: 0x7952BA,
  normal_color: isNewTransaction ? 0x202020 : 0x000000,
  press_color: isNewTransaction ? 0x000000 : 0x000000,
  text_size: 55,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
  click_func: onClick,
  longpress_func: onPress
})

export const NEW_BALANCE_VALUE = (text, onPress = () => {}, onClick = () => {}, isNewTransaction = false) => ({
  text: getText(text),
  x: px(42),
  y: px(215),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(90),
  color: 0x7952BA,
  normal_color: isNewTransaction ? 0x202020 : 0x000000,
  press_color: isNewTransaction ? 0x000000 : 0x000000,
  radius: 50,
  text_size: 55,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
  click_func: onClick,
  longpress_func: onPress
})

// ==================== ESTILIZAÇÕES SQUARE (index.page.s.layout.js) ====================

export const SQUARE = {
  TITLE_PATTERN: (text, y) => ({
    text: getText(text.toUpperCase()),
    x: px(42),
    y: px(y),
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(50),
    color: 0x787878,
    text_size: 40,
    align_h: hmUI.align.CENTER_H,
    text_style: hmUI.text_style.WRAP
  }),

  SMALL_TITLE_PATTERN_TOP: (text, y) => ({
    text: getText(text),
    x: px(20),
    y: px(y),
    w: DEVICE_WIDTH - px(20 * 2),
    h: px(50),
    color: 0xffffff,
    text_size: 24,
    align_h: hmUI.align.CENTER_H,
    text_style: hmUI.text_style.WRAP
  }),

  LINE: (x) => ({
    x: px(42),
    y: px(x),
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(2),
    color: 0x828282,
    alpha: 85
  }),

  ADD_BUTTON: (text, x, y, claro = true, onClick, onPress) => ({
    text: getText(text),
    x: x,
    y: y,
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(88),
    text_size: 36,
    radius: 20,
    normal_color: claro ? 0x7C4FC6 : 0x22143F,
    press_color: claro ? 0x22143F : 0x7C4FC6,
    click_func: onClick,
    longpress_func: onPress
  })
}

// ==================== ESTILIZAÇÕES ROUND (index.page.r.layout.js) ====================

export const ROUND = {
  TITLE_PATTERN: (text) => ({
    text: getText(text),
    x: px(42),
    y: px(105),
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(50),
    color: 0xffffff,
    text_size: 26,
    align_h: hmUI.align.CENTER_H,
    text_style: hmUI.text_style.WRAP
  }),

  SMALL_TITLE_PATTERN_TOP: (text) => ({
    text: getText(text),
    x: px(42),
    y: px(85),
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(50),
    color: 0xffffff,
    text_size: 16,
    align_h: hmUI.align.CENTER_H,
    text_style: hmUI.text_style.WRAP
  }),

  NUMBER_VALUE: (text) => ({
    text: getText(text),
    x: px(42),
    y: px(185),
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(50),
    color: 0x7952BA,
    text_size: 46,
    align_h: hmUI.align.CENTER_H,
    text_style: hmUI.text_style.WRAP,
    font: 'fonts/bold.ttf'
  }),

  LINE: (y) => ({
    x: px(42),
    y: px(y),
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(2),
    color: 0x828282,
    alpha: 85
  }),

  TIPS_TEXT_STYLE: {
    text: getText('noData'),
    x: px(15),
    y: px(120),
    w: DEVICE_WIDTH - px(15 * 2),
    h: DEVICE_HEIGHT - px(120),
    color: 0xffffff,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.WRAP
  },

  ADD_BUTTON: (text, x, y, claro = true, onClick, onPress) => ({
    text: getText(text),
    x: x,
    y: y,
    w: DEVICE_WIDTH - px(42 * 2),
    h: px(88),
    text_size: 36,
    radius: 20,
    normal_color: claro ? 0x7C4FC6 : 0x22143F,
    press_color: claro ? 0x22143F : 0x7C4FC6,
    click_func: onClick,
    longpress_func: onPress
  })
}
