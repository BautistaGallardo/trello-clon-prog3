export {default} from 'next-auth/middleware';
import {NextRequest, NextResponse} from 'next/server'; 
export const config = {matcher: ['/pages/board/:path*','/pages/dashboard', '/pages/porfile']}