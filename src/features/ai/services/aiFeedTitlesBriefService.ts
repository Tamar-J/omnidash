import { fetchAiChat } from '@/api/aiApi'
import { dayjs } from '@/libs/dayjs'

import { CachedAiChatDataProps } from '../types/CachedAiChatDataProps'

import { removeThinkTag } from '../utils/removeThinkTag'

const aiRole = `Leia os títulos a seguir e Selecione as mais relevantes (com base em impacto social, político, econômico ou tecnológico) e crie um resumo fluído, dividido por ponto e vírgula, como se fosse uma nota editorial. O resumo deve ser feito em um único parágrafo curto.
No fim de cada trecho adicione uma referência numérica no estilo "[1]" referente ao index do título, que será usado para adicionar referencia a matéria ou as matérias em caso de condensação de assuntos similares. Use um tom jornalístico enxuto, evitando sensacionalismo.

Exemplo de estilo:
"Possível corte na Selic ganha força com queda da inflação [0]; Dólar cai para R$ 5,30 [2, 10]; Chuvas fortes causam enchentes e transtornos no Sul do Brasil [4]; Microsoft confirma novo ataque hacker e alerta governos e empresas [5]."

Descarte promoções e notícias irrelevantes.
`

export const getAiFeedTitlesBriefResponse = async (articlesData: string, signal: AbortSignal): Promise<CachedAiChatDataProps> => {
  const aiData = {
    userRole: articlesData,
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
