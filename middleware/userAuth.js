const checkSession = (req, res, next) =>{
    // console.log("home = ",req.session)
    if(req.session.user){
        next()
    }
    else{
        res.redirect('/home')
    }
}

// const isLogin = (req, res, next) =>{
//     // console.log("login = ",req.session)
//     if(req.session.user){
//         res.redirect('/user/home')
//     }
//     else{
//         next()
//     }
// } 

module.exports = {
    checkSession
}