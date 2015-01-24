var http = require("http"),
    fs = require("fs"),
    path = require("path");


var server = http.createServer(function (req, res){

    var url = req.url,
        extName = path.extname(url),
        contentType = "",
        dirPath = ""
        filePath = "",
        homePagePath = __dirname + "/public/views/index.html",
        errorPagePath = __dirname + "/public/views/404.html";
   
    console.log(url);

    if(url === "/"){
        redirectToHome();
    }
    else{
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
        }

        filePath = __dirname + dirPath + path.basename(url);
        
        fs.exists(filePath, function(isExists){
            if(isExists){
                readAndSendFile(res, filePath, contentType,200);
            }
            else {
                redirect404();
            }
        });
    }     


    // Private functions -----     

    function redirectToHome(){
        readAndSendFile(res, homePagePath, "text/html",200);
    }

    function redirect404(){
        readAndSendFile(res, errorPagePath, "text/html", 404);
    }

    function readAndSendFile(response, filePath, contentType, status){
        fs.readFile(filePath, function (err, data){
            sendResponse(response, status, contentType, data); 
        });
    } 

    function sendResponse(response, status, contentType, fileData){
        response.writeHead(status, {"Content-Type": contentType});
        response.write(fileData);
        response.end(); 
    }

});

server.listen(2100, "localhost", function (){
    console.log("Server is listening on http://localhost:2100");
});


