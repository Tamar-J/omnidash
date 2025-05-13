export const boxPresets = {
  box: {
    borderColor: 'primary',
  },
  boxCenter: {
    borderColor: 'primary',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxRow: {
    borderColor: 'primary',
    flexDirection: 'row',
  },
  boxSafe: {
    borderColor: 'primary',
    flex: 1,
    backgroundColor: 'background',
    paddingTop: 's6',
  },
} as const

export type BoxPresetsType = typeof boxPresets
export type BoxPresetsKeyType = keyof BoxPresetsType
