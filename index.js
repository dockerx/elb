var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs');

var elb = {},
HostList = {},
ElbPort,
ErrorMessage;

var proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end(ErrorMessage || 'Something went wrong.');
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  //proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

elb.start = function(port, options){
	HostList.Default = options.defaultTarget;
	ErrorMessage = options.errorMessage;
	ElbPort = port;

	if(!HostList.Default || !ElbPort) return console.log("ELB cannot be started by giving PORT and Default Options");

	http.createServer(function(req, res) {
		proxy.web(req, res, {
			target: 'http://' + (HostList[req.headers.host] || HostList.Default)
		});
	}).listen(ElbPort);

	console.log("ELB started on port " + ElbPort);
	writeHostList();
}

elb.add = function(hostName, proxyTarget) {
	if(!hostName || !proxyTarget) return console.log("Adding Host to ELB failed for HostName : %s and ProxyTarget : %s" , hostName, proxyTarget);
	HostList[hostName] = proxyTarget;
	console.log('Added the host %s to ELB with target %s', hostName, proxyTarget);
	writeHostList();
}

elb.remove = function(hostName) {
	if(!HostList[hostName]) return console.log("ELB host removel failed. No host exist for hostName %s", hostName);
	delete HostList[hostName];
	console.log('Removed the host %s from ELB', hostName);
	writeHostList();
}

function writeHostList() {
    //Creating the tempfiles folder
    require('child_process').exec('mkdir -p ' + __dirname + '/tempfiles', function (err) {
		if (err) return console.log('ELB TempFile create Error : ', err);
		writeHostList = function() {
			fs.writeFile(__dirname + '/tempfiles/HostList.json', JSON.stringify(HostList), function (err) {
				if (err) console.log('ELB TempFile write Error : ', err);
			});
		}
		writeHostList();
	});	
}

module.exports = elb;