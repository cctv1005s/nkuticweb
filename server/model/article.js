var  util = require('util');
var mysql = require('../db/db');

/**
 * 插入文章
 *
 * @params {object} Article - 插入的Article条目 
 * @params {function} cb - 回调函数
 */
exports.InsertArticle = function(Article,cb){
     console.log("----------InserArticle:%s----------",Article);
     var InsertArticle = [];
     var ArticleAttr = "";
     for(var i in Article){
        ArticleAttr += i+",";
        InsertArticle.push(Article[i]);
     }
     ArticleAttr = ArticleAttr.slice(0,ArticleAttr.length - 1);
     var query = util.format("Insert Into Article (%s) values (?,?,?,?,?,?,?) ",ArticleAttr);
     mysql.query(query,InsertArticle,cb);
}

/**
 * 通过ID获取文章
 *
 * @params {string} ArticleID - 文章ID 
 * @params {function} cb - 回调函数
 */
exports.GetArticleByID = function(ArticleID,cb){
    console.log("----------GetArticleByID:%s----------",ArticleID);
    var query = util.format("select * from Article where ArticleID = '%s'",ArticleID);
    mysql.query(query,cb);
}

/**
 * 通过Article的属性获取Article实例
 *
 * @params {object} Article -Article的属性
 * @params {function} cb -回调函数
 */
exports.GetArticle = function(Article,cb){
    console.log("----------GetArticle:%s----------",Article);
    var condition = "";
    for(var i in Article){
        condition += util.format("%s = '%s' and ",i,Article[i]);
    }
    condition = condition.slice(0,condition.length - 4);
    var query = util.format("select * from user_article_view where %s",condition);
    mysql.query(query,cb);
}

/**
 * 通过ID修改文章
 *
 * @params {string} ArticleID - 文章ID 
 * @params {object} Article - 文章修改的条目 
 * @params {function} cb - 回调函数
 */
exports.UpdateArticle = function(ArticleID,Article,cb){
     console.log("----------UpdateArticle:%s----------",ArticleID);
     var set = "";
     for(var i in Article){
        set += util.format("%s = '%s' ,",i,Article[i]);
     }
     set = set.slice(0,set.length-1);
     var query = util.format('update article set %s where ArticleID = \'%s\'',set,ArticleID);
     console.log(query);
     mysql.query(query,cb);
}