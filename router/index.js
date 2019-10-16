const router =require('koa-router')()

const query=require('../db/query')

//查询成员列表
router.get('/api/userlist',async ctx=>{
    let  data= await query('select * from userlist')
    ctx.body=data.data
})

//添加成员信息

router.post('/api/add', async ctx=>{
    let {username,age,phone,sex,address,idcard}=ctx.request.body
    console.log(ctx.request.body)

    let sql='insert into userlist (name,age,phone,sex,address,idcard) values (?,?,?,?,?,?)'

    if(!username || !age || !phone || !sex|| !address || !idcard){
        return ctx.body={code:2,msg:'缺少参数'}
    }

    //查询此人是否添加
    let isData= await query('select * from userlist where idcard=?',[idcard])

    if(isData.data.length){
        //存在
        return ctx.body={code:3,msg:'此人已存在'}
    }else{
        //不存在

        let data=await query(sql,[username,age,phone,sex,address,idcard])

        if(data.msg==='success'){
            ctx.body={code:1,msg:'添加成功'}
        }else{
            ctx.body={code:0,msg:'添加失败'}
        }
    }

})


//删除成员信息 id

router.get('/api/del',async ctx=>{
    let {id}=ctx.query;
    let sql='delete from userlist where id=?'
    let res= await query(sql,[id])
    
    if(res.msg==='error'){
        ctx.body={code:0,msg:'删除失败'}
    }else{
        ctx.body={code:1,msg:'删除成功'}
    }
})

//修改
router.post('/api/update',async ctx=>{
    let {username,age,phone,sex,address,idcard,id}=ctx.request.body;

    if(!username || !age || !phone || !sex|| !address || !idcard || !id){
        return ctx.body={code:2,msg:'缺少参数'}
    }

    let sql='update userlist u set u.name=?,u.age=?,u.phone=?,u.address=?,u.idcard=?,u.sex=? where id=?'
    let res= await query(sql,[username,age,phone,address,idcard,sex,id])
    console.log(res)
    if(res.msg==='error'){
        ctx.body={code:0,msg:'修改失败'}
    }else{
        ctx.body={code:1,msg:'修改成功'}
    }

})

module.exports=router