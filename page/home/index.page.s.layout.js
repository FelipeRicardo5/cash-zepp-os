import * as hmUI from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo } from '@zos/device'
import { px } from '@zos/utils'

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()

export const TITLE_PATTERN = (text, y) =>({
  text: getText(text.toUpperCase()),
  x: px(42),
  y: px(y),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(50),
  color: 0x787878,
  text_size: 40,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP
})

export const SMALL_TITLE_PATTERN_TOP = (text, y) =>({
  text: getText(text),
  x: px(20),
  y: px(y),
  w: DEVICE_WIDTH - px(20 * 2),
  h: px(50),
  color: 0xffffff,
  text_size: 24,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP
})

export const BALANCE_VALUE = (text, callback_press, callback_click) =>({
  text: getText(text),
  x: px(42),
  y: px(215),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(50),
  color: 0x7952BA,
  normal_color: 0x000000,
  press_color : 0x000000,
  text_size: 55,
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
  click_func: callback_click,
  longpress_func: callback_press
})

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

export const ADD_BUTTON = {
  x: Math.floor((DEVICE_WIDTH - px(88)) / 2),
  y: DEVICE_HEIGHT - px(100),
  w: px(88),
  h: px(88),
  normal_src: 'add.png',
  press_src: 'add.png'
}

export const LINE = (x) => ({
  x: px(42),
  y: px(x),
  w: DEVICE_WIDTH - px(42 * 2),
  h: px(2),
  color: 0x828282,
  alpha: 85
})

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
