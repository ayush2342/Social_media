const User = require('../models/user')
const fs = require('fs');
const path = require('path')


module.exports.profile = async function (req, res) {
   try {

      let user = await User.findById(req.params.id);
      res.render('./users', {
         title: 'Social Code |',
         profile_user: user
      })

   } catch (error) {

      console.log('Error', error);
      return res.redirect('back');
   }

   // Reference Code Used Earlier without try catch and async await

   // User.findById(req.params.id).then(function(user)
   // {
   //    res.render('./users',{
   //       title:'Social Code |',
   //       profile_user:user
   //   })
   // }).catch(function(error)
   // {
   //    console.log('Error in finding the User',error);
   // })

}

module.exports.update = async function (req, res) {
   try {

      if (req.user.id == req.params.id) {
         let user = await User.findById(req.params.id);
         User.uploadedAvatar(req, res, function (error) {
            if (error) {
               console.log("********Multer Error : ", error)
            }

            user.name = req.body.name;
            user.email = req.body.email;

            if (req.file) {
               if (user.avatar) {
                  fs.unlinkSync(path.join(__dirname, '..', user.avatar))
               }
               // Saving the path of uploaded file in the avatar field of user
               user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            req.flash('success', 'User Updated succesfully');
            return res.redirect('back');

         })
         // await User.findByIdAndUpdate(req.params.id,req.body);
         // req.flash('success','User Updated succesfully');
         // return res.redirect('back');
      }
      else {
         req.flash('error', 'Unauthorized');
         return res.status(401).send('Unauthorized');
      }

   } catch (error) {

      console.log('Error', error);
      return res.redirect('back');
   }

   // Reference Code Used Earlier without try catch and async await

   // if(req.user.id==req.params.id)
   // {
   //    User.findByIdAndUpdate(req.params.id,req.body).then(function()
   //    {
   //       return res.redirect('back');
   //    }).catch(function(error)
   //    {
   //       console.log('Error in updating user',error);
   //    })
   // }
   // else
   // {
   //    return res.status(401).send('Unauthorized');
   // }

}

//Render the Signin Page
module.exports.Signin = function (req, res) {
   res.render('./signinPage',
      {
         title: 'SignUpPage'
      });
}

//Render the SignUp Page
module.exports.SignUp = function (req, res) {
   res.render('./signupPage',
      {
         title: 'SignInPage'
      });
}

//Render Forgot Password Page
module.exports.forgotPassword = function (req, res) {
   res.render('./forgotPassword',
   {
      title: 'forgotPassword'
   });
}

//Get the sign up Data 
module.exports.create = async function (req, res) {
   try {
      if (req.body.password != req.body.confirm_password) {
         req.flash('error', 'Passwords do not match');
         return res.redirect('back');
      }

      let user = await User.findOne({ email: req.body.email });
      if (!user) {
         await User.create(req.body);
         req.flash('success', 'User Created succesfully');
         return res.redirect('/users/Signin');
      }
      else {
         req.flash('error', 'User Already exits,Try signing in');
         return res.redirect('back');
      }

   }
   catch (error) {

      console.log('Error', error);
      return res.redirect('back');
   }

   // Reference Code Used Earlier without try catch and async await

   // if(req.body.password!=req.body.confirm_password)
   // {
   //    return res.redirect('back');
   // }

   // User.findOne({email:req.body.email}).then(function(user)
   // {
   //    if(!user)
   //    {
   //       User.create(req.body).then(function()
   //       {
   //          console.log('User Created succesfully')
   //          return res.redirect('/users/Signin');

   //       }).catch(function(error)
   //       {
   //          console.log('Error in creating User while sign up',error);
   //       })
   //    }
   //    else
   //    {
   //       return res.redirect('back');
   //    }

   // }).catch(function(error)
   // {
   //    console.log('Error in finding User in sign up',error);
   //       return;
   // })
}

//Sign in and create the session for the user
module.exports.createSession = function (req, res) {
   req.flash('success', 'Logged in Successfully');
   return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
   req.logout(function (error) {
      if (error) {
         req.flash('error', error);
         console.log('Error while signing out');
         return res.redirect('back');
      }

      req.flash('success', 'You have been logged out');
      return res.redirect('/users/Signin');
   });

}


