exports.index = function(req,res,next){
    var data = {
        background:"",
        articles:[]
    }
    res.render('index',data);
} 