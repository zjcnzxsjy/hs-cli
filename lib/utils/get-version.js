const request = require('request')
const chalk = require('chalk');
const packageConfig = require(__dirname + '/../../templates.json');
const {error} = require('./logger');
// (function getVersion() {
//   request({
//     url: 'https://www.easy-mock.com/mock/5b95cb4a9b7e7a16f787f6e2/version/template/11',
//     timeout: 1000
//   }, (err, res, body) => {
//     console.log(err, res.statusCode);
//     if (!err && res.statusCode === 200) {
//       const currentVersion = packageConfig.currentVersion;
//       const latestVersion = body.version;
//       return {
//         current: currentVersion,
//         latest: latestVersion
//       }
//     }
//     if (res.statusCode === 404) {
//       error('template is not found!');
//     }
//   })
// })();
function getVersion(owner, repo) {
  request({
    url:`https://api/github.com/repos/${owner}/${repo}/tags`,
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      if (Array.isArray(body) && body.length) {
        const [{name: version}] = body;
        return {
          latestVersion: version
        }
      }
    } else if (res.statusCode === 404) {
      error('The template:' + `${tempalteName}`+ ' is not found!');
      process.exit(1);
    } else {
      error(err);
      process.exit(1);
    }
  })
}
module.exports = (tempalteName) => {
  request({
    url:``,
    timeout: 1000
  }, (err, res, body) => {
    console.log(err, res.statusCode);
    if (!err && res.statusCode === 200) {
      const currentVersion = packageConfig.currentVersion;
      const latestVersion = body.version;
      return {
        current: currentVersion,
        latest: latestVersion
      }
    } else if (res.statusCode === 404) {
      error('The template:' + `${tempalteName}`+ ' is not found!');
      process.exit(1);
    } else {
      error(err);
      process.exit(1);
    }
  })
}
