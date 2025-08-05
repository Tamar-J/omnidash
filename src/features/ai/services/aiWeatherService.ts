import { CachedAiChatDataProps } from '../types/CachedAiChatDataProps'
import { removeThinkTag } from '../utils/removeThinkTag'

import { fetchAiChat } from '@/api/aiApi'

import { dayjs } from '@/libs/dayjs'

const aiRole = `Você é um assistente de bem-estar climático que entende todos os dados do clima e sua trajetória no tempo para trazer insights. Sua tarefa é interpretar os dados meteorológicos para fornecer informações baseadas em como o clima é sentido pelo usuário, em vez de apenas descrever números. Gere insights úteis sobre conforto térmico, saúde e planejamento de atividades conforme o horário. Sugira precauções ou ações práticas, como evitar risco de gripes e resfriados em ambientes frios e úmidos ou aproveitar oportunidades para atividades ao ar livre caso em condições favoráveis. Seja claro, relevante e não use informações técnicas. Todo o texto deve estar resumido em poucas palavras deixando somente as mais importantes. Não apresente dados, ao invés disso, diga a sensação ou o que isso significa para o usuário. 

Considere também o país e o estado do usuário para ajustar a interpretação da temperatura e do clima de forma coerente com o que é considerado quente, frio ou ameno na região. Uma mesma temperatura pode ter percepções diferentes dependendo do clima local.

Considerações na análise: como dados climáticos tem validade, considere o lastFetchedAt como o horário em que os dados foram obtidos. hourlyData tem apenas 24h de dados a partir do horário atual e dailyData tem um resumo para 7 dias.`

const userRole = (weatherCachedData: string) => {
  return `Agora são ${dayjs().utc(true).format('HH:mm')}, aqui estão os dados: ${weatherCachedData}`
}

export const getAiWeatherResponse = async (weatherCachedData: string, signal: AbortSignal): Promise<CachedAiChatDataProps> => {
  const aiData = {
    userRole: userRole(weatherCachedData),
    aiRole,
  }

  try {
    const aiResponse = await fetchAiChat(aiData, signal)
    const aiAnswer = aiResponse.choices[0].message.content
    const cleanedAnswer = removeThinkTag(aiAnswer)
    const lastFetchedAt = dayjs().utc(true).toISOString()

    return {
      aiResponse: cleanedAnswer,
      lastFetchedAt,
    }
  } catch (error) {
    throw error
  }
}
