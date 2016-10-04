var Article = require('../model/article.js');
var User = require('../model/user.js');
var uuid = require('node-uuid');
var tool = require('./tool');
var eventproxy = require('eventproxy');
var fs = require('fs');
var getResData = tool.getResData;
var path = require('path');
/**
 * 渲染某篇文章
 */
exports.article = function(req,res,next){
    // res.render();
    var ArticleID = req.params.articleid;
    var ep1 = new eventproxy();
    var ep2 = new eventproxy();
    //渲染
    ep2.all('Article','User',function(Article,User){
        res.render('./article/article-show',{
            Article:Article,
            User:User
        });
    });

    Article.GetArticleByID(ArticleID,function(err,data){
        data = Array2Object(data);
        ep1.emit('UserID',data.ArticleBelong);
        data = Data2Content(data);
        ep2.emit('Article',data);
    });

    ep1.all('UserID',function(UserID){
        User.getUserByID(UserID,function(err,data){
            ep2.emit('User',data);
        });
    });
}

/**
 * 新建文章
 */
exports.add = function(req,res,next){
    var post = req.body;
    var id = uuid.v1();
    try{
    var article = {
        ArticleID:id,
        ArticleContent:saveAsFile(id,post.ArticleContent||""),
        ArticleTitle:post.ArticleTitle||"",
        ArticleBelong:post.ArticleBelong||req.session.user.UserID,
        ReadNum:0,
        ArticleState:1,
        ArticleType:1
    };
    Article.InsertArticle(article,function(err,data){
        if(err){
            console.log(err);
            return res.json(getResData(-100,{},JSON.stringify(err)));
        }
        res.json(getResData(100,article,""));
    });
    }
    catch(e){
        console.log(e);
    }
}

/**
* 渲染写文章界面，响应get请求
*/
exports.write = function(req,res,next){
    var ArticleID = req.params.articleid;
    ep = new eventproxy();
    
    ep.all('Article',function(Article){
        res.render('./article/article-write',{
            Article:Article
        });
    });

    Article.GetArticleByID(ArticleID,function(err,data){
        if(err){
            console.log(err);
            return  next(err);
        }
        
        data = Array2Object(data);
        data.ArticleContent = fs.readFileSync(getFileName(data.ArticleID));
        ep.emit('Article',data);
    });
}


/**
* 修改某篇文章
*/
exports.update = function(req,res,next){
    var ArticleID = req.params.articleid;
    var ArticleData = req.body;
    try{
    //保存信息到文件
    saveContent2File(getFileName(ArticleID),ArticleData.ArticleContent);
    //保存文件
    ArticleData.ArticleContent = getFileName(ArticleID);
    Article.UpdateArticle(ArticleID,ArticleData,function(err,data){
        if(err){
            console.log(err);
            return res.json(getResData(-100,{},JSON.stringify(err)));
        }
        res.json(getResData(100,{},""));
    });
    }
    catch(e){
        console.log(e);
    }
}

/**
* 删除某篇文章
*/
exports.delete = function(req,res,next){
    var ArticleID = req.params.articleid;
    res.json(getResData(100,{},""));   
}


var saveAsFile = function(id,str){
    var fileName = id +'.txt';
    var savePath = path.join(__dirname,'../articleData/'+fileName);
    fs.writeFileSync(savePath,str);
    return savePath;
}

var Array2Object = function(arr){
    if(arr.length >= 0)
        arr = arr[0]; 
    return arr;
}

var getFileName = function(id){
    var fileName = id +'.txt';
    var savePath = path.join(__dirname,'../articleData/'+fileName);
    return savePath;
}

var saveContent2File = function(filePath,str){
    fs.writeFileSync(filePath,str);
}

var Data2Content = function(data){
    var id = data.ArticleID;
    var fileName = getFileName(id);
    var content = fs.readFileSync(fileName);
    data.ArticleContent = content;
    return data;
}
