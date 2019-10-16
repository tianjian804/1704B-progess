const  Koa = require('koa')

const app= new Koa()

const path =require('path')
//处理静态资源
const koaStatic=require('koa-static')

const staticPath=koaStatic(path.join(process.cwd(),'public'))
//处理路由
const router=require('./router')
//处理post请求携带参数的
const bodyparser=require('koa-bodyparser')

const {port}=require('./config')

app.use(staticPath)

app.use(bodyparser()) //放在路由前面

app.use(router.routes())

app.use(router.allowedMethods())

app.listen(port,()=>{
    console.log('服务启动成功'+port)
})