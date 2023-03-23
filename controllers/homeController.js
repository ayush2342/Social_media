module.exports.home=function(req,res)
{
    console.log(req.cookies);
    res.cookie('user_id',77);
    res.render('./home',{
        title:'Home'
    })
}