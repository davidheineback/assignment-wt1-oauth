function getGitLabURI(state: string) {
  const rootUrl = 'https://gitlab.lnu.se/oauth/authorize'

  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GITLAB_OAUTH_REDIRECT_URI!,
    client_id: process.env.NEXT_PUBLIC_GITLAB_APP_ID!,
    response_type: 'code',
    state,
    scope: [
      'read_api',
      'read_user',
    ].join(' '),
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}

export default getGitLabURI