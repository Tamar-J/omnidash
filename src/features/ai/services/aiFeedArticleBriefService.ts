import { fetchAiChat } from '@/api/aiApi'

import { dayjs } from '@/libs/dayjs'

import { removeThinkTag } from '../utils/removeThinkTag'

const aiRole = `Leia o conteúdo a seguir e produza um **resumo claro e objetivo com os principais pontos**.

### Estilo e Foco do Resumo

Adapte o estilo conforme o tipo de texto:
– **Notícia**: destaque os fatos essenciais (o quê, quem, quando, onde, por quê e como).  
– **Opinião ou análise**: resuma os argumentos e conclusões mais relevantes.  
– **Tutorial ou guia**: apresente o propósito e os passos ou dicas principais.  
– **Review**: destaque pontos avaliados, prós e contras, e o parecer final.  
– **Conteúdo leve ou curioso**: extraia o ponto mais marcante ou interessante.  
Priorize o que for mais novo, relevante ou com implicações práticas.

### Precisão e Verificação

Evite tratar opiniões ou hipóteses como fatos.  
Atribua corretamente falas e alegações.  
Mantenha tom neutro, sem ênfases artificiais, distorções ou frases fora de contexto.

### Exclusões e Tempo

Ignore propagandas, conteúdos promocionais e comentários irrelevantes fora do assunto.
Considere que hoje é **${dayjs().utc(true).format('LLLL')}** e não apresente como atuais fatos antigos ou datados.

### Formato Final

O resumo deve conter no máximo **entre 1 e 5 frases diretas, fiéis ao conteúdo original**, sem distorções ou omissões relevantes.
`

export const getAiFeedArticleBriefResponse = async (articlesData: string, signal: AbortSignal): Promise<string> => {
  const aiData = {
    userRole: articlesData,
    aiRole,
  }

  try {
    const aiResponse = await fetchAiChat(aiData, signal)
    const aiAnswer = aiResponse.choices[0].message.content
    const cleanedAnswer = removeThinkTag(aiAnswer)

    return cleanedAnswer
  } catch (error) {
    throw error
  }
}
