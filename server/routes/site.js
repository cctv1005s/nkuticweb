var eventproxy = require('eventproxy');
var Article = require('../model/article');
var tool = require('./tool');
var ep = new eventproxy();

exports.index = function(req,res,next){
    ep.all('Article','Introduce',function(article,introduce){
        var data = {
            User:req.session.user,
            Article:article,
            Introduce:introduce,
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

    Article.GetArticle({ArticleState:3},function(err,data){
        ep.emit('Introduce',tool.Data2Content(data));
    })
} 