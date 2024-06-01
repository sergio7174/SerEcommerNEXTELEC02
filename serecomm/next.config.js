// next.config.js
/*const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})*/

/** @type {import('next').NextConfig} */

const nextConfig = {
    
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],

    reactStrictMode: true,
    images: {
     domains: ['i.ibb.co','lh3.googleusercontent.com','res.cloudinary.com','localhost']
    },

  }
  
  module.exports = nextConfig;