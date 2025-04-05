import { AllSizesKeyType, BackgroundColorsKeyType, BorderColorsKeyType } from '@/themes'

type BoxPresetProps = {
  borderColor?: BorderColorsKeyType
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
  flexDirection?: 'row' | 'column'
  flex?: number
  backgroundColor?: BackgroundColorsKeyType
  paddingTop?: AllSizesKeyType
}

export const boxPresets = {
  box: {
    borderColor: 'primary',
  },
  boxCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxRow: {
    flexDirection: 'row',
  },
  boxSafe: {
    flex: 1,
    backgroundColor: 'background',
    paddingTop: 's6',
  },
} as const satisfies Record<string, BoxPresetProps>

export type BoxPresetsType = typeof boxPresets
export type BoxPresetsKeyType = keyof BoxPresetsType
