const http = require('http');
const fs = require('fs');


http.createServer(function (req, res){
  if (req.url === '/'){
    fs.readFile('./list.json', function (err, data){
      if (err){
        console.log('JSON Error!');
        res.end('No file list.json!');
      }else {
        let lista = JSON.parse(data.toString());
        fs.readFile('./index.html', function (err, data){
          if (err){
            console.log('TEMPLATE Error!');
            res.end('No file index.html!');
          } else {
            let tmpl = data.toString();
  
            let page = tmpl.replace('%', lista.join('</li><li>'));
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(page);
          }
        });
      }
    });
  }else {
    res.end('No page exists!');
  }

}).listen(8080);