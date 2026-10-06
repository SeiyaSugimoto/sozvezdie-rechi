import type {NextConfig} from 'next';
const config:NextConfig={
 output:'standalone',
 outputFileTracingRoot:process.cwd(),
 devIndicators:false,
 poweredByHeader:false,
 images:{remotePatterns:[{protocol:'https',hostname:'cdn.sanity.io',pathname:'/images/**'}]},
 async rewrites(){return {beforeFiles:[{source:'/studio',destination:'/studio/index.html'}],afterFiles:[],fallback:[{source:'/studio/:path*',destination:'/studio/index.html'}]};},
 async headers(){return [{source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'X-Frame-Options',value:'SAMEORIGIN'}]}];},
};
export default config;
