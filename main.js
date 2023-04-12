var http = require('http');
var fs = require('fs');
var url = require('url'); //url(http) = module 을 require(load)

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query; //주어진 url 정보를 분석하여 사용하기 쉽게 보여줌
  var pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    if (queryData.id === undefined) {

      fs.readdir('./data', function (error, filelist) {
        console.log(filelist);
        var title = 'Welcome';
        var description = 'Hello, Node.js';

        var list = '<ul>';

        var i = 0;
        while (i < filelist.length) {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }

        list = list + '</ul>';

        var template = `
          <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
          `;
        response.writeHead(200);
        response.end(template); //user가 입력한 url을 읽어준다.
      })
    } else {
      fs.readdir('./data', function (error, filelist) {
        console.log(filelist);
        var title = 'Welcome';
        var description = 'Hello, Node.js';

        var list = '<ul>';

        var i = 0;
        while (i < filelist.length) {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }

        list = list + '</ul>';
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var template = `
        <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p>${description}</p>
    </body>
    </html>
        `;
          response.writeHead(200);
          response.end(template); //user가 입력한 url을 읽어준다.
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end('Not found');
  }


});
app.listen(3000);

//Node.js : 사용자에게 전송할 데이터를 생성한다.

//URL
//    http://opentutorials.org:3000/main?id=HTML&page=12
//protocol/ host(domain)     /port/path/query string
//query string의 시작은 '?'로
//value과 value은 '&'
//key과 value은 '='로 구분


//module이란?
//node.js가 가지고 있는 기능을 비슷한 것끼리 묶어놓은 것

//main.js 파일이 바뀔 때는 node.js를 껐다 켜줘야 하는데 다른 파일(data)이 바뀔 때는 필요 없음.
