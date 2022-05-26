#生产环境部署脚本

#先构建项目，生成dist目录
pnpm run build

#cd到构建的目录下
cd dist

#部署到自定义域名
scp -r * root@49.123.0.26:/var/www/signff