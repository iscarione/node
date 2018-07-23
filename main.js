var http = require('http');
var fs = require('fs');

// http.createServer(function (req, res){
//   if (req.url == '/'){
//     fs.readFile('./list.json', function(err, data) {
//       if (err) {
//         console.error(err);
//         res.end('Błąd wczytania danych!');
//       }
//       else{
//         var teksty = JSON.parse(data.toString());

//         fs.readFile('./index.html', function(err, data){
//           if (err) {
//             console.error(err);
//             res.end('Błąd wczytania układu strony!');
//           }
//           else {
//             let templ = data.toString();

//             let page = templ.replace('%', teksty.join('</li><li>'));
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.end(page);
//           }
//         });
//       }
//     });
//   }else{
//     res.end('No Page!')
//   }
// }).listen(8080);

const server = http.createServer(function (req, res){
  getTitles(res);
}).listen(8080);

function getTitles(res){
  fs.readFile('./list.json', function(err, data) {
    if (err) {
      logError(err, res);
    }
    else{
      getTemplate(JSON.parse(data.toString()), res);
    }
  });
}

function getTemplate(titles, res){
  fs.readFile('./index.html', function (err, data){
    if (err){
      logError(err, res);
    } else{
      formatHTML(titles, data.toString, res);
    }
  })

};

function formatHTML(titles, tmpl, res){
  var html = tmpl.replace('%', titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}
function logError(err, res){
  console.error(err);
  res.end('Wystąpił błąd!');
};