var path = require('path');
var fs = require('fs');
exports.getResData = function(Flag,Content,Extra){
    if(typeof Extra == 'object')
        Extra = JSON.stringify(Extra);
    
    var resData = {
        Flag:100,//标志位
        Content:JSON.stringify(Content),//返回内容
        Extra:Extra//存放错误信息
    };
    return JSON.stringify(resData);
}

exports.Data2Content = function(data){
    data = Array2Object(data);
    if(!data)
        return null;
    var id = data.ArticleID;
    var fileName = getFileName(id);
    var content = fs.readFileSync(fileName);
    data.ArticleContent = content;
    return data;
}

var Array2Object = function(arr){
    if(!arr){
        return null;
    }
    if(arr.length >= 0)
        arr = arr[0]; 
    return arr;
}

var getFileName = function(id){
    var fileName = id +'.txt';
    var savePath = path.join(__dirname,'../articleData/'+fileName);
    return savePath;
}
