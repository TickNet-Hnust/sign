#生产环境部署脚本

#先构建项目，生成dist目录
pnpm run build

#cd到构建的目录下
cd dist

#部署到自定义域名
scp -r * root@112.74.96.217:/var/www/face2face-frontend/dist