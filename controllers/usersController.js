const User=require('../models/user')


module.exports.profile = function(req,res)
{
    res.render('./users',{
        title:'Users'
    })
}

//Render the Signin Page
module.exports.Signin=function(req,res)
{
   res.render('./signinPage',
   {
      title:'SignUpPage'
   });
}

//Render the SignUp Page
module.exports.SignUp=function(req,res)
{
   res.render('./signupPage',
   {
      title:'SignInPage'
   });
}

//Get the sign up Data 
module.exports.create=function(req,res)
{
   if(req.body.password!=req.body.confirm_password)
   {
      return res.redirect('back');
   }

   User.findOne({email:req.body.email}).then(function(user)
   {
      if(!user)
      {
         User.create(req.body).then(function()
         {
            console.log('User Created succesfully')
            return res.redirect('/users/Signin');

         }).catch(function(error)
         {
            console.log('Error in creating User while sign up',error);
         })
      }
      else
      {
         return res.redirect('back');
      }

   }).catch(function(error)
   {
      console.log('Error in finding User in sign up',error);
         return;
   })
}

//Sign in and create the session for the user
module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}