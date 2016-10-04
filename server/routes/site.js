var eventproxy = require('eventproxy');
var Article = require('../model/article');

var ep = new eventproxy();

exports.index = function(req,res,next){
    ep.all('Article',function(article){
        var data = {
            User:req.session.user,
            Article:article,
            Course:[]
        }
        res.render('index',data);     
    });
    var SelectArticle = {
        ArticleState:2
    }

    Article.GetArticle(SelectArticle,function(err,data){
        ep.emit('Article',data);
    });
} 