#生产环境部署脚本
###
 # @Description: 
 # @Autor: 张津瑞
 # @Date: 2022-05-20 13:20:07
 # @LastEditors: 张津瑞
 # @LastEditTime: 2022-05-20 13:44:21
### 
set -e

#先构建项目，生成dist目录
npm run build

#cd到构建的目录下
cd dist

#部署到自定义域名
scp -r * root@112.74.96.217:/var/www/face2face-frontend