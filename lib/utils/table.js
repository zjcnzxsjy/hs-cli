const Table = require('cli-table');
const { info } = require('./logger');

const table = new Table({
  head: ['repo', 'owner', 'description', 'branch'],
  style: {
    head: ['cyan']
  }
});

module.exports = (config) => {
  const keys = Object.keys(config);

  if(keys.length) {
    keys.forEach((key) => {
      table.push(
        [`${key}`, config[key].owner, config[key].description, config[key].branch]
      );
    });
    const list = table.toString();
    if (list) {
      info('Saved templates: ')
      console.log(`${list}\n`);
    } else {
      info('Saved templates is empty!');
    }
  } else {
    info('Saved templates is empty!');
  }
};