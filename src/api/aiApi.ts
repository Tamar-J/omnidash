import axios from 'axios'

export type AiChatAPIResponseProps = {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    logprobs: number | null
    finish_reason: string
    message: {
      role: string
      content: string
    }
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  stats: {
    tokens_per_second: number
    time_to_first_token: number
    generation_time: number
    stop_reason: string
  }
  model_info: {
    arch: string
    quant: string
    format: string
    context_length: number
  }
  runtime: {
    name: string
    version: string
    supported_formats: string[]
  }
}

type AiModelProps = {
  id: string
  object: string
  type: string
  publisher: string
  arch: string
  compatibility_type: string
  quantization: string
  state: string
  max_context_length: number
}

type AiModelsAPIResponseProps = {
  data: AiModelProps[]
  object: string
}

// For Emulador: 'http://10.0.2.2:1234/api/v0'
// For Real Device (with adb reverse): 'http://127.0.0.1:1234/api/v0'
const BASE_URL = 'http://127.0.0.1:1234/api/v0'

export const fetchAiModels = async () => {
  const url = `${BASE_URL}/models`
  try {
    const response = (await axios.get(url)) as AiModelsAPIResponseProps

    return response
  } catch (error) {
    __DEV__ && console.error('Failed to fetching AI data:', error)
    throw error
  }
}

export type AiDataProps = {
  aiRole: string
  userRole: string
}

export const fetchAiChat = async (aiData: AiDataProps, signal: AbortSignal) => {
  const { aiRole, userRole } = aiData
  const url = `${BASE_URL}/chat/completions`
  try {
    const response = await axios.post(
      url,
      {
        model: process.env.EXPO_PUBLIC_DEFAULT_MODEL_NAME,
        messages: [
          { role: 'system', content: aiRole },
          { role: 'user', content: userRole },
        ],
        temperature: 0.2,
        max_tokens: -1,
        stream: false,
      },
      { signal }
    )

    return response.data as AiChatAPIResponseProps
  } catch (error) {
    throw error
  }
}
