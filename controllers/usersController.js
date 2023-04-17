const User=require('../models/user')


module.exports.profile = function(req,res)
{
   User.findById(req.params.id).then(function(user)
   {
      res.render('./users',{
         title:'Social Code |',
         profile_user:user
     })
   }).catch(function(error)
   {
      console.log('Error in finding the User',error);
   })
    
}

module.exports.update = function(req,res)
{
   if(req.user.id==req.params.id)
   {
      User.findByIdAndUpdate(req.params.id,req.body).then(function()
      {
         return res.redirect('back');
      }).catch(function(error)
      {
         console.log('Error in updating user',error);
      })
   }
   else
   {
      return res.status(401).send('Unauthorized');
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
    return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
   req.logout(function(error)
   {
      if(error)
      {
         return console.log('Error while signing out');
      }

      return res.redirect('/users/Signin');
   });
    
}
