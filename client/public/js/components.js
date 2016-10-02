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
        }

        PS.fn.disabled = function(){
            var pages = $(PS.btn.page);
            for(var i = 0;i < pages.length;i++){
                $(pages[i]).removeClass('ps-page-active');
            }
        }

        PS.btn = {};
        PS.btn.control = "[data-ps-control]";
        PS.btn.page = "[data-ps-page]";
        PS.btn.hover = "data-ps-hover";
        PS.btn.click = "data-ps-click";
        PS.state  = {};
        PS.state.active = "ps-page-active";
    });
    
})(jQuery)