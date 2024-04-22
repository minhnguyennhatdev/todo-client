export const buildLoginUrl = () => {
  const ssoUrl = process.env.NEXT_PUBLIC_SSO_SERVER_URL;
  const todoUrl = process.env.NEXT_PUBLIC_TODO_CLIENT_URL;
  const state = btoa(JSON.stringify({
    redirectUrl: `${todoUrl}/authenticated`
  }));
  return `${ssoUrl}?state=${state}`;
}