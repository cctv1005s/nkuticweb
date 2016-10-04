var User = {};
new paneSwitch('.left-page');
$('[data-nk-article]').click(function(e) {
});

//不建议这么做，因为危险
var getUser = function(){
    $.ajax({
        url:'/user',
        type:'get',
        success:function(data){
            User = JSON.parse(data);
        }
    })
}

getUser();

//注册
$('.signup-button').click(function(event) {
    signup();
});

//登录
$('.login-button').click(function(event) {
    login();
});


var signup = function(){
    var UserName = $('#signup-username').val(),
        UserNick = $('#signup-usernick').val(),
        UserPassword = $('#signup-password').val(),
        RepeatPassword = $('#signup-repeat-password').val();
    $.ajax({
        url:'/user/add',
        type:'post',
        data:{
            UserName:UserName,
            UserNick:UserNick,
            UserPassword:hex_md5(UserPassword)
        },
        success:function(data){
            if(data.Flag == 100)
                alert('注册成功，正在跳转');
            window.location.href = "/";
        }
    })
}

var login = function(){

    var UserName = $('#login-username').val(),
        UserPassword = $('#login-password').val();
    $.ajax({
        url:'/user/login',
        type:'post',
        data:{
            UserName:UserName,
            UserPassword:hex_md5(UserPassword)
        },
        success:function(data){
            data = JSON.parse(data);
            if(data.Flag == 100){
                alert('登录成功，正在跳转');
                window.location.href = "/";
            }else{
                alert("登录失败："+data.Extra);
            } 
        }
    });
}

var edit = false;
//监听文章跳转
$("[data-main-article]").click(function(e) {
    if(edit == true){
        edit = false;
        return ;
    }
    var $elem = $(e.currentTarget);
    var id = $elem.attr('data-article-id');
    window.location.href = "/article/"+id;
});

$("[data-main-edit]").click(function(e) {
    edit = true;
    var $elem = $(e.currentTarget);
    var $elem = $elem.parent().parent();
    var id = $elem.attr('data-article-id');
    window.location.href = "/article/"+id+"/write";
});

