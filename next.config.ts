
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts' // 刚才创建的配置文件路径
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 你原有的配置，比如 images, rewrites 等
	allowedDevOrigins: ['192.168.0.192']
};

export default withNextIntl(nextConfig);



