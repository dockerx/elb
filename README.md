Elastic Load Balancer(ELB) for [DockerBox](https://github.com/dockerx/dockerbox)
=======

`elb` is a dynamically programmable proxy library used in DockerBox project. It is based upon node-http-proxy.

### Installation

`npm install git@github.com:dockerx/elb.git --save`

#### Setup a use of an elb server

A new elb is created by passing the port in which the elb have to listen and 
an `options` object as argument

```javascript
var elb = require('elb');
var options = {
	defaultTarget : "defaultTarget",
	errorMessage : "errorMessage"
};
elb.start(80, options);
```

Adding and removing a host to the ELB dynamically

```javascript

elb.add('host_name', 'proxy_target');

elb.remove('host_name');

```
#### Current Host list for debugging
The currenty used Host List will be available to check in json file /tempfiles/HostList.json

### Test

```
$ npm test
```

## Author
Alan Joseph (alanjosephmec@gmail.com)

### License

>The MIT License (MIT)
>
>Copyright (c) 2010 - 2015 DockerX.
>
>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in
>all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>THE SOFTWARE.


