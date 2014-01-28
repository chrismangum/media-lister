var express = require('express'),
  http = require('http'),
  path = require('path'),
  fs = require('fs'),
  scanDir = require('./scanDir'),
  app = express();

app.use(express.logger('dev'));

function getTargetDir() {
  var targetDir;
  process.chdir(path.join(__dirname, '../target'));
  targetDir = process.cwd();
  process.chdir(__dirname);
  return targetDir;
}

function dirReq(req, res) {
  var dir = req.params[0] || '',
    fullPath = path.join(__dirname, '../target/' + dir);
  res.send({
    target: getTargetDir(),
    files: scanDir.scan(fullPath)
  });
}

app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/target', express.static(path.join(__dirname, '../target')));
app.get('/dir/*', dirReq);
app.get('/dir', dirReq);
app.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, "../public/index.html"));
});

http.createServer(app).listen(3000);

