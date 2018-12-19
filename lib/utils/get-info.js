const request = require('request');
const { error } = require('./logger')
// function getVersion(owner, repo) {
//   return new Promise((resolve, reject) => {
//     request({
//       url:`https://api/github.com/repos/${owner}/${repo}/tags`,
//       timeout: 1000
//     }, (err, res, body) => {
//       console.log(body)
//       if (!err && res.statusCode === 200) {
//         if (Array.isArray(body) && body.length) {
//           const [{name: version}] = body;
//           resolve({version});
//         }
//       } else if (res.statusCode === 404) {
//         error('The template:' + `${tempalteName}`+ ' is not found!');
//         process.exit(1);
//       } else {
//         error(err);
//         process.exit(1);
//       }
//     })
//   })
// }
module.exports = {
  getVersion(owner, repo) {
    return new Promise((resolve, reject) => {
      request({
        url:`https://api.github.com/repos/${owner}/${repo}/tags`,
        headers: {
          'User-Agent': 'vue-cli'
        }
      }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
          const responseBody = JSON.parse(body);
          if (Array.isArray(responseBody) && responseBody.length) {
            const [{name: version}] = responseBody;
            resolve({version});
          }
        } else if (res.statusCode === 404) {
          error('The template:' + `${tempalteName}`+ ' is not found!');
          process.exit(1);
        } else {
          error(err);
          process.exit(1);
        }
      })
    })
  }
}