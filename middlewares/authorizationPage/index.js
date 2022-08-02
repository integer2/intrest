import routes from '@/libs/routes';
import { parseContextCokies } from '@/utils/cookies';

export const unauthPage = (ctx) => {
  return new Promise((resolve, reject) => {
    const cookies = parseContextCokies(ctx);
    if (cookies?.token) {
      ctx.res.writeHead(302, {
        Location: routes.home,
      });
      ctx.res.end();
      return resolve('unauthorized');
    }
    return resolve('unauthorized');
  });
};

export const authPage = (ctx) => {
  return new Promise((resolve, reject) => {
    const cookies = parseContextCokies(ctx);
    if (!cookies?.token) {
      ctx.res.writeHead(302, {
        Location: routes.login,
      });
      ctx.res.end();
      resolve('unauthorized');
    }
    return resolve({ token: cookies.token });
  });
};
