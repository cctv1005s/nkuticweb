exports.index = function(req,res,next){
    var data = {
        User:req.session.user,
        Article:[],
        Course:[]
    }
    res.render('index',data);
} 