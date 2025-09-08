// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

module.exports = removeImports()({
  i18n,
  reactStrictMode: false,
  images: {
    domains: [
      'cylimit-dev.s3.eu-central-1.amazonaws.com',
      'cylimit-dev.s3-eu-central-1.amazonaws.com',
      'gateway.pinata.cloud',
      'cylimit-public.s3-eu-west-3.amazonaws.com',
      'cylimit-public.s3.eu-west-3.amazonaws.com',
      'platform-lookaside.fbsbx.com',
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            babel: true,
            titleProp: true,
          },
        },
        {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[hash:8].[ext]',
            limit: 500000,
          },
        },
      ],
    });

    return config;
  },
});
