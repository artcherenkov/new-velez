/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      return config;
    }

    config.externalsType = "script";
    config.externals = {
      ymaps3: ["https://velez-trip.ru/api/load-ymaps", "ymaps3"],
    };

    return config;
  },
};

module.exports = nextConfig
