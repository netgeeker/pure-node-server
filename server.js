
var http = require("http"),
    fs = require("fs"),
    path = require("path");


var server = http.createServer(function (req, res){

    var url = req.url,
        extName = path.extname(url),
        contentType = "",
        dirPath = ""
        filePath = "";
    
    switch(extName){
        case ".html":{
            contentType = "text/html";
            dirPath = "/public/views/";
        } break;
        case ".css":{
            contentType = "text/css";
            dirPath = "/public/css/";
        } break;      
        case ".js":{
            contentType = "text/javascript";
            dirPath = "/public/js/";
        } break;
        default: {
            contentType = "text/html";
            dirPath = "/public/views/";
            url = "index.html";
        }
    }


    filePath = __dirname + dirPath + path.basename(url);

    fs.exists(filePath, function(isExists){
        if(isExists){
            fs.readFile(filePath, function (err, data){
                res.writeHead(200, {"Content-Type": contentType});
                res.write(data);
                res.end();
            });
        }
    });

});

server.listen(2100, "localhost", function (){
    console.log("Server is listening on http://localhost:2100");
});


