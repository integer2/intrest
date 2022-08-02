export const parseContextCokies = (ctx) => {
  const contextCookies = ctx.req.headers.cookie;
  if (!contextCookies) return contextCookies;
  const cookies = contextCookies ? contextCookies : document.cookie;
  const parsedCookies = cookies
    ? cookies.split(';').reduce((acc, curr) => {
        const [key, value] = curr.split('=');
        acc[key.trim()] = value.trim();
        return acc;
      }, {})
    : {};
  return parsedCookies;
};
