// eslint-disable-next-line import/no-extraneous-dependencies
// const chalk = require('chalk');
const { mdLinks } = require('./index');
const { totalLinks, uniqueLinks, brokenLinks } = require('./cli_stats');
const { getLinkStatus } = require('./functions');

const route = process.argv[2];
const options = {
  validate: process.argv.includes('--validate') || process.argv.includes('--v'),
  stats: process.argv.includes('--stats') || process.argv.includes('--s'),
};

if (options.validate && options.stats) {
  mdLinks(route, options)
    .then((arrayLinks) => {
      const allStats = {
        Total: totalLinks(arrayLinks),
        Unique: uniqueLinks(arrayLinks),
        Broken: brokenLinks(arrayLinks),
      };
      console.log(allStats);
      // agregar un foreach para que muestre cada link como en el readme
    })
    .catch((error) => {
      console.log(error);
    });
} else if (options.validate === true) {
  mdLinks(route, options)
    .then((arrayLinks) => getLinkStatus(arrayLinks)
      .then((res) => {
        console.log(res);
      }))
    .catch((error) => {
      console.log(error);
    });
} else if (options.stats) {
  mdLinks(route, options)
    .then((arrayLinks) => {
      const stats = {
        Total: totalLinks(arrayLinks),
        Unique: uniqueLinks(arrayLinks),
      };
      console.log(stats);
    })
    .catch((error) => {
      console.log(error);
    });
}
