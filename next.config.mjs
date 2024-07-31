/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
          {
            source: '/home', // The URL you want to display
            destination: '/pages/homepage', // The actual page that will be served
          },
          {
            source: '/login', // The URL you want to display
            destination: '/pages/operatepage/login', // The actual page that will be served
          },
          {
            source: '/quiz', // The URL you want to display
            destination: '/pages/personality-test/quiz', // The actual page that will be served
          },
          {
            source: '/result', // The URL you want to display
            destination: '/pages/personality-test/result', // The actual page that will be served
          },
          
        ];
      },
};

export default nextConfig;
