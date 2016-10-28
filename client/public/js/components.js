(function($){
    var _add = function(M,fn){
        fn();
    }

    var PS = function(node){
        this.$container = $(node);
        this.init();
    }

    PS.fn = PS.prototype;
    window.paneSwitch = PS;

    _add(PS,function(){
        var $container = {};
        var self = {};
        var selected = false;
        /**
        * 初始化
        */
        PS.fn.init = function(){
            $container = this.$container;
            self = this;
            this.eventBind();
        }
        /**
        * 事件绑定
        */
        PS.fn.eventBind = function(){
            //绑定hover事件
            $('body').on('mouseover',PS.btn.control, function(e) {
                if(selected == true)
                    return ;
                var $elem = $($(e.currentTarget).attr(PS.btn.hover));
                self.disabled();
                $elem.addClass(PS.state.active);
            });

            //绑定click事件
            $('body').on('click',PS.btn.control, function(e) {
                selected = true;
                var $elem = $($(e.currentTarget).attr(PS.btn.hover));
                self.disabled();
                $elem.addClass(PS.state.active);
            });

            //绑定写文章按钮
            $('body').on('click', PS.btn.write, function(e) {
                event.preventDefault();
                //发起新建一个文章
                newArticle(function(err,ArticleID){
                    if(err){
                        return alert(err);
                    }
                    window.location.href = "/article/"+ArticleID+"/write";
                });
            });

            $('body').on('click',PS.btn.clickhref, function(e) {
                var href = $(e.currentTarget).attr(PS.btn.href);
                console.log(href);
                window.location.href = href||"/";
            });
        }

        PS.fn.disabled = function(){
            var pages = $(PS.btn.page);
            for(var i = 0;i < pages.length;i++){
                $(pages[i]).removeClass('ps-page-active');
            }
        }

        var newArticle = function(cb){
            $.ajax({
                url:'/article/add',
                type:'post',
                data:{
                    ArticleContent:"",
                    ArticleTitle:"",
                    ArticleBelong:User.UserID
                },
                success:function(data){
                    var data = JSON.parse(data);
                    if(data.Flag == 100){
                        var ArticleID = JSON.parse(data.Content).ArticleID;
                        cb(null,ArticleID);
                    }else{
                        alert("失败");
                    }
                }
            });
        }

        PS.btn = {};
        
        PS.btn.control = "[data-ps-control]";//控制按钮
        PS.btn.page = "[data-ps-page]";//被控制的页面
        PS.btn.hover = "data-ps-hover";
        PS.btn.click = "data-ps-click";
        PS.btn.clickhref = "[data-ps-clickhref]";//跳转按钮
        PS.btn.href = "data-ps-href";//跳转链接

        PS.btn.write = "[data-ps-write]";//写文章的按钮   
        PS.state  = {};

        PS.state.active = "ps-page-active";//页面处于激活状态
    });
    
})(jQuery)