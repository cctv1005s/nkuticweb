exports.getResData = function(Flag,Content,Extra){
    var resData = {
        Flag:100,//标志位
        Content:JSON.stringify(Content),//返回内容
        Extra:Extra//存放错误信息
    };
    return JSON.stringify(resData);
}