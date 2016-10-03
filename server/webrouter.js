var express = require('express');
var router = express.Router();
var route = require('./routes'),
    site = route.site,
    user = route.user,
    article = route.article;
 
 var access = require('./middleware/access');

router.get('/',site.index);//网站首页

/*用户操作*/
router.get('/user/:userid',user.select);//查看某个用户的信息
router.post('/user/add',user.add);//新建用户
router.post('/user/:userid/update',user.update);//修改用户信息
router.post('/user/:userid/delete',user.delete);//删除某个用户
router.post('/user/:userid/articles',user.getArticles);//得到某一个用户的全部文章

/*文章操作*/
router.get('/article/:articleid',article.select);//查看某篇文章
router.post('/article/add',article.add);//添加文章
router.post('/article/:articleid/update',article.update);//修改某篇文章
router.post('/article/:articleid/delete',article.delete);//删除某篇文章


module.exports = router;