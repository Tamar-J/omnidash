import axios from 'axios'

export async function fetchFaviconUrl(htmlUrl: string) {
  try {
    const url = new URL(htmlUrl)
    const duckduckgoFavicon = `https://icons.duckduckgo.com/ip3/${url.hostname}.ico`

    try {
      const response = await axios.get(duckduckgoFavicon)
      if (response.status === 200) {
        return duckduckgoFavicon
      }
    } catch (error) {
      __DEV__ && console.warn('Error while fetching favicon:', error)
    }

    return `https://${url.hostname}/favicon.ico`
  } catch {
    return ''
  }
}
