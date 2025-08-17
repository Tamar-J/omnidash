export const extractYouTubeId = (urlString: string) => {
  try {
    const url = new URL(urlString)
    const hostname = url.hostname.replace(/^www\./, '')

    const YOUTUBE_HOSTNAMES = ['youtube.com', 'youtu.be', 'youtube-nocookie.com']

    const isYouTubeHost = YOUTUBE_HOSTNAMES.includes(hostname)
    if (!isYouTubeHost) return null

    const idFromQuery = url.searchParams.get('v')
    if (idFromQuery) return idFromQuery

    const pathMatch = url.pathname.match(/(?:\/(?:embed|v)\/|\/)([\w-]{11})/)
    return pathMatch ? pathMatch[1] : null
  } catch {
    return null
  }
}
