type FormatCityNameProps = {
  city: string
  countryCode: string
  state?: string
}

export const formatCityName = (cityData: FormatCityNameProps) => {
  const { city, countryCode, state } = cityData
  const formattedState = getStateAbbreviation({ countryCode, state })

  return `${city}${formattedState ? ' - ' + formattedState : ''} `
}

type StateAbbreviationsProps = Record<string, string>

// prettier-ignore
const BRAZILIAN_STATE_ABBREVIATIONS: StateAbbreviationsProps = {
  'Acre': 'AC',
  'Alagoas': 'AL',
  'Amapá': 'AP',
  'Amazonas': 'AM',
  'Bahia': 'BA',
  'Ceará': 'CE',
  'Distrito Federal': 'DF',
  'Espírito Santo': 'ES',
  'Goiás': 'GO',
  'Maranhão': 'MA',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Minas Gerais': 'MG',
  'Pará': 'PA',
  'Paraíba': 'PB',
  'Paraná': 'PR',
  'Pernambuco': 'PE',
  'Piauí': 'PI',
  'Rio de Janeiro': 'RJ',
  'Rio Grande do Norte': 'RN',
  'Rio Grande do Sul': 'RS',
  'Rondônia': 'RO',
  'Roraima': 'RR',
  'Santa Catarina': 'SC',
  'São Paulo': 'SP',
  'Sergipe': 'SE',
  'Tocantins': 'TO',
}

const STATE_ABBREVIATIONS: Record<string, StateAbbreviationsProps> = {
  BR: BRAZILIAN_STATE_ABBREVIATIONS,
}

const getStateAbbreviation = (stateData: Omit<FormatCityNameProps, 'city'>) => {
  const { state, countryCode } = stateData
  if (!state) return ''

  return STATE_ABBREVIATIONS[countryCode]?.[state] || state
}
