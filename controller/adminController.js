const adminModel = require('../model/adminModel');
const bcrypt = require('bcryptjs');
const userModel = require('../model/userModel');


const loadLogin = async (req, res) => {
    res.render('admin/login')
}

const login = async (req, res) => {

    try{
        const {email, password} = req.body;

        const admin = await adminModel.findOne({email});

        if(!admin) return res.render('admin/login', {message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) return res.render('admin/login', {message: 'Password is incorrect'});

        req.session.admin = true;
        res.redirect('/admin/dashboard');
    }

    catch(error){
    
    }   

}

//loading dashboard
const loadDashBoard = async (req, res) => {
    try{

       const admin = req.session.admin;
       if(!admin) return res.redirect('/admin/login');
       
       const users = await userModel.find();
       const message = req.session.error || "";
       delete req.session.error
    //    console.log(users)
       res.render('admin/dashboard',{users, message}) 
    }
    catch(error){
        res.render('admin/login', {message: 'something went wrong'});
    }
}

//add new usser in dashboard
const addUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userModel({ email, password: hashedPassword });
        await newUser.save();
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


//edit user in dashboard
const editUser = async (req, res) => {
    try {
        // console.log('edit user request');
        // console.log(req.body);
        
        const { id, email, password } = req.body;
        // console.log('This is id', id);

        let updateData = { email };

        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updateData.password = hashedPassword;
        }

        const user = await userModel.findOneAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: true }
        );

        req.session.error = 'User updated successfully';
        
        // console.log(user);
        res.redirect('/admin/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



const deleteUser = async (req, res) => {
    try{
       
        // console.log(req.params.id);
        
        const id = req.params.id;
        const user = await userModel.findOneAndDelete({_id:id});

        res.redirect('/admin/dashboard')

    }

    catch(error){
        console.log(error)

    }

}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            // Clear cache to prevent back navigation after logout
            res.set('Cache-Control', 'no-store'); // Disable caching
            res.redirect('/admin/login'); // Redirect to login after logout
        }
    });

    
}

const notFound = async (req, res) =>    {
    res.status(404).render('admin/404error');
}


module.exports = {loadLogin
    ,login
    ,loadDashBoard
    ,logout
    ,addUser
    ,editUser
    ,deleteUser
    ,notFound
}   