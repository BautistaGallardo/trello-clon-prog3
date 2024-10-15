export {default} from 'next-auth/middleware';

export const config = {matcher: ['/pages/board/:path*','/pages/dashboard', '/pages/porfile']}