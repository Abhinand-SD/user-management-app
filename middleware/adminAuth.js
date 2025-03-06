const  checkSession = (req, res, next) =>    {
    if(req.session.admin){
        next()
    }
    else{
       
        res.redirect('/admin/login')
    }
}

// const isLogin = (req, res, next) =>{
//     if(req.session.admin){
//         res.redirect('/admin/dashboard')
        
//     }
//     else{
//         next()
//     }
// } 

// const isLogout=(req,res,next)=>{
//     if(!req.session.admin){
//         next()
// }
// }

const redirectIfAuthaticated = (req, res, next) =>    {
    // console.log(req.session)
    if(req.session.admin){
        res.redirect('/admin/dashboard')
    }
    else if(req.session.user){
        res.redirect('/user/home')
    }
    else{
        next()
    }

}


module.exports = {
    checkSession
    ,redirectIfAuthaticated
}
