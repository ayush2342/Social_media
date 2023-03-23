const User=require('../models/user')


module.exports.profile = function(req,res)
{
   if(req.cookies.user_id)
   {
        User.findById(req.cookies.user_id).then(function(user)
        { 
         if(user)
         {
            res.render('./users',{
               title:'Users',
               user:user
           })
         }
         else
         {
            res.redirect('/users/Signin')
         }
         

        }).catch(function(error)
        {
         console.log('Error in Signing in the User',error);
        });
   }
   else
   {
      res.redirect('/users/Signin')
   }
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
   //Find the user
   User.findOne({email:req.body.email}).then(function(user)
   {
       //Handle user found
      if(user)
      {
         //Handle password which doesn't match
         if(user.password!=req.body.password)
         {
            return res.redirect('back');
         }

         //Handle session creation
         res.cookie('user_id',user.id)
         return res.redirect('/users/profile')
      }
      else
      {
         
       //Handle user not found
         return res.redirect('back');
      }

   }).catch(function()
   {
      console.log('Error in finding User while SignIn Operation',error);
         return;
   })
}

module.exports.destroySession= function(req,res)
{
   res.clearCookie('user_id');
   res.redirect('/users/Signin');
}