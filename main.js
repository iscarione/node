const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res){
  if (req.url == '/'){
    getTitles(res);
  } else {
    res.end("No such Page!");
  }
}).listen(8080);

function getTitles(res){
  fs.readFile('./list.json', function(err, data) {
    if (err) {
      logError(err, res);
    } else {
      getTemplate(JSON.parse(data.toString()), res);
    }
  });
}

function getTemplate(titles, res){
  fs.readFile('./index.html', function (err, data){
    if (err) {
      logError(err, res);
    } else {
      formatHTML(titles, data.toString(), res);
    }
  });
}

function formatHTML(titles, tmpl, res){
  var html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}

function logError(err, res){
  console.error(err);
  res.end('Wystąpił błąd!');
}