var express = require('express'),
  http = require('http'),
  path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  app = express();

var target = fs.readlinkSync('../target');

app.use(express.logger('dev'));
app.set('json spaces', 0);
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/target', express.static(target));
app.get('/dir', function (req, res) {
  res.json({
    target: target,
    files: scanDir(target + '/')
  });
});
app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname, "../public/index.html"));
});

http.createServer(app).listen(3000);

function scanDir(path) {
  return _.map(fs.readdirSync(path), function (name) {
    var item = {name: name};
    if (fs.statSync(path + name).isDirectory()) {
      item.children = scanDir(path + name + '/');
    }
    return item;
  });
}
