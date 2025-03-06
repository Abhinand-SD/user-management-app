const userSchema = require('../model/userModel');
const bcrypt = require('bcryptjs');
const saltround = 10;
const registerUser = async (req, res) => {

    try{
        const {email, password} = req.body;z
        
        const user = await userSchema.findOne({email});
        if(user) return res.render('user/register',{message: 'User already exists'}) 

            const hashedPassword = await bcrypt.hash(password, saltround);

        const newUser = new userSchema({
            email,
            password:hashedPassword
        });

        await newUser.save();
        req.session.error = 'User created successfully'
        res.redirect('/user/login');
        
    } catch(error){
        
        req.session.error = 'something went wrong'
        res.redirect('/user/register')
    }
    
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            // Clear cache to prevent back navigation after logout
            res.set('Cache-Control', 'no-store');
            res.redirect('/user/login');
        }
    });
}


const login = async (req, res) => {
    try{
        const {email,password} = req.body;

        const user = await userSchema.findOne({email});
        if(!user) return res.render('user/login',{message: 'User does not exist'});

        const isMatch  = await bcrypt.compare(password,user.password);
        req.session.error = 'Password is incorrect'
        if(!isMatch) return res.redirect('/user/login');

        req.session.user = true;
        const emailName =user.email.split('@')[0]
        req.session.userEmail = emailName
        req.session.error = 'User logged in successfully'
        // if(password !== user.password) return res.render('user/login',{message: 'Password is incorrect'});
        res.redirect('/user/home');
    } catch(error){
        req.session.error = 'something went wrong'
        res.redirect('/user/login')    }
}

const loadRegister = async (req, res) =>    {
    let message = req.session.error || null
    delete req.session.error
    res.render('user/register', {message})
}

const loadLogin = async (req, res) =>    {
    let message = req.session.error || null
    delete req.session.error
    res.render('user/login', {message})
}


const loadHome = async (req, res) =>    {
    const email = req.session.userEmail
    res.render('user/userHome', {email})
}

const notFound = async (req, res) =>    {
    res.status(404).render('user/404error');
}

module.exports = {registerUser
    ,loadRegister
    ,loadLogin
    ,login
    ,loadHome
    ,logout
    ,notFound
}