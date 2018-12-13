const request = require('request');
const { error } = require('./logger')

module.exports = {
  getVersion(tempalteName) {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://www.easy-mock.com/mock/5b95cb4a9b7e7a16f787f6e2/version/template/' + `${tempalteName}`,
        timeout: 1000
        }, (err, res, body) => {
        console.log(err, res.statusCode);
        if (!err && res.statusCode === 200) {
            const currentVersion = packageConfig.currentVersion;
            const latestVersion = body.version;
            resolve(
              {
                current: currentVersion,
                latest: latestVersion
              }
            );
        } else if (res.statusCode === 404) {
            error('The template:' + `${tempalteName}`+ ' is not found!');
            process.exit(1);
        } else {
            reject(err);
        }
      })
    })
  },
  getTemplates() {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://www.easy-mock.com/mock/5b95cb4a9b7e7a16f787f6e2/version/templates',
        timeout: 1000
      }, (err, res, body) => {
        if (err) reject(err);
        const requestBody = JSON.parse(body);
        let options = {};
        for (let key in requestBody) {
          options[key] = {
            templateName: requestBody[key].name,
            description: requestBody[key].description,
            repositoryUrl: requestBody[key].repository.url,
            version: requestBody[key].version
          }
        }
        resolve(options);
      })
    })
  }
}