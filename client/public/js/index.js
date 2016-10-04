new paneSwitch('.left-page');

$('[data-nk-article]').click(function(e) {
});

$('.signup-button').click(function(event) {
    signup();
});

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