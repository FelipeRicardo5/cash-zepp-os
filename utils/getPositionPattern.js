import { getDeviceInfo } from '@zos/device'

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()

export const getIconPosition = ({ alignX = 'center', alignY = 'center', size = 0, padding = 0 }) => {
    const x =
        alignX === 'left' ? padding :
        alignX === 'right' ? DEVICE_WIDTH - size - padding :
        (DEVICE_WIDTH - size) / 2

    const y =
        alignY === 'top' ? padding :
        alignY === 'bottom' ? DEVICE_HEIGHT - size - padding :
        (DEVICE_HEIGHT - size) / 2

    return { x: Math.floor(x), y: Math.floor(y) }
}