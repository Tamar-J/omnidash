import { palette } from '@/themes'

type GradientLocationType = [number, number, ...number[]]

export const gradientPresets = {
  gradientDay: {
    colors: palette.gradient.day,
    locations: [0, 0.66] as GradientLocationType,
    start: { x: 0.45, y: 0 },
    end: { x: 0.55, y: 1 },
  },
  gradientNight: {
    colors: palette.gradient.night,
    locations: [0, 1] as GradientLocationType,
    start: { x: 0.45, y: 0 },
    end: { x: 0.55, y: 1 },
  },
}

export type GradientPresetsKeyType = keyof typeof gradientPresets
