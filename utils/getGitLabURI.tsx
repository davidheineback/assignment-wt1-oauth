function getGitLabURI() {
  const rootUrl = 'https://gitlab.lnu.se/oauth/authorize'

  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GITLAB_OAUTH_REDIRECT_URI as string,
    client_id: process.env.NEXT_PUBLIC_GITLAB_APP_ID as string,
    response_type: 'code',
    state: process.env.STATE_SECRET as string,
    scope: [
      'read_api',
      'read_user',
    ].join(' '),
  }

  const qs = new URLSearchParams(options)
  
  return `${rootUrl}?${qs.toString()}`
}

export default getGitLabURI