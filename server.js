var http = require('http')
 , fs 	 = require('fs')
 , url   = require('url')
 , path  = require('pathname')
 , qs    = require('querystring')
 , port  = 8080;

var server = http.createServer (function (req, res) {
	var uri = url.parse(req.url);
	console.log(uri.pathname);

	switch( uri.pathname ) {
		case '/':
			sendFile(res, 'index.html', 'text/html')
			break
		case '/index.html':
			sendFiles(res, 'index.html', 'text/html')
			break
		case '/style.css':
			sendFile(res, 'style.css', 'text/css')
			break
		case '/README.md':
			sendFile(res, 'README.md', 'text/markdown')
			break
		case '/package.json':
			sendFile(res, 'package.json', 'text/json')
			break
		default:
			res.end('404 not found')
	}

})


server.listen(process.env.PORT || port)
console.log('listening on ' + port)

//subroutines

function sendFile(res, filename, contentType) {
	contentType = contentType || 'text/html'

	fs.readFile(filename, function(error, content) {
		res.writeHead(200, {'Content-type': contentType})
		res.end(content, 'utf-8')
	})
}
