var fs = require('fs'),
  async = require('async'),
  path = require('path'),
  _ = require('underscore');

var ftypes = {
  '40': 'directory',
  '12': 'symlink',
  '10': 'file'
};

var ignored = ['node_modules', 'vendor', '.git'];

function getFtype(mode) {
  return ftypes[mode.toString(8).slice(0, 2)];
}

function getPath() {
  return path.join(process.cwd(), pathPrefix) + '/';
}

function scanDir(path) {
  path += '/';
  return _.compact(_.map(fs.readdirSync(path), function (item) {
    if (ignored.indexOf(item) === -1) {
      var stat = fs.statSync(path + item);
      stat.name = item;
      stat.type = getFtype(stat.mode);
      if (stat.type === 'directory') {
        stat.children = scanDir(path + item);
      }
      return _.pick(stat, 'type', 'name', 'children');
    }
  }));
};

exports.scan = scanDir;

