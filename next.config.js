module.exports = {
  images: {
    domains: ["media.graphassets.com"],
  },
  // fs 모듈과 관련된 fallback 설정
  webpack: {
    fallback: {
      fs: false,
    },
  },
  env: {
    // 서울 리전
    MYSQL_HOST_SEOUL: process.env.MYSQL_HOST_SEOUL,
    MYSQL_USER_SEOUL: process.env.MYSQL_USER_SEOUL,
    MYSQL_PASSWORD_SEOUL: process.env.MYSQL_PASSWORD_SEOUL,
    MYSQL_DATABASE_SEOUL: process.env.MYSQL_DATABASE_SEOUL,

    // 상파울로 리전
    MYSQL_HOST_SAO_PAULO: process.env.MYSQL_HOST_SAO_PAULO,
    MYSQL_USER_SAO_PAULO: process.env.MYSQL_USER_SAO_PAULO,
    MYSQL_PASSWORD_SAO_PAULO: process.env.MYSQL_PASSWORD_SAO_PAULO,
    MYSQL_DATABASE_SAO_PAULO: process.env.MYSQL_DATABASE_SAO_PAULO,

    DEV_URL: "http://localhost:3000",
    PROD_URL: "http://autolink.vercel.com",
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
