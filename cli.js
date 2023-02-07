require('colors');
// const chalk = require('chalk');
const { mdLinks } = require('./index');
const { totalLinks, uniqueLinks, brokenLinks } = require('./cli_stats');
const { getLinkStatus } = require('./functions');

const route = process.argv[2];
const options = {
  validate: process.argv.includes('--validate') || process.argv.includes('--v'),
  stats: process.argv.includes('--stats') || process.argv.includes('--s'),
};
// const help = option.includes('--help') || option.includes('--h');
if (route === undefined) {
  console.log(
    `
      ██     ██ ███████ ██       ██████  ██████  ███    ███ ███████ 
      ██     ██ ██      ██      ██      ██    ██ ████  ████ ██      
      ██  █  ██ █████   ██      ██      ██    ██ ██ ████ ██ █████   
      ██ ███ ██ ██      ██      ██      ██    ██ ██  ██  ██ ██      
       ███ ███  ███████ ███████  ██████  ██████  ██      ██ ███████ 
                                                                    
  `.trap);
  console.log(
    `
       █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
       █                                                                               █
       █             Please enter the path you want to analyze                         █
       █    And add:                                                                   █
       █  --validate : TO VALIDATE ALL LINKS THAT WERE FOUND WORK OR NOT               █
       █  --stats : FOR BASIC STATISTICS OF THE LINKS                                  █
       █  --validate --stats: TO OBTAIN STATISTICS THAR REQUIRE THE VALIDATION RESULTS █
       █                                                                               █
       ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  `.gray);
}

if ((options.validate && options.stats) || (options.stats && options.validate)) {
  mdLinks(route, options)
    .then((arrayLinks) => {
      console.log(`\n                                      
       LINKS VALIDATION AND STATS     
                                      `.bgCyan.black,
      );
      console.log(`\n${'TOTAL LINKS  :'.bgMagenta} ${totalLinks(arrayLinks)}`.brightMagenta);
      console.log(`\n${'UNIQUE LINKS :'.bgGreen} ${uniqueLinks(arrayLinks)}`.brightGreen);
      console.log(`\n${'BROKEN LINKS :'.bgGrey} ${brokenLinks(arrayLinks)}`.white);

      // agregar un foreach para que muestre cada link como en el readme
    })
    .catch((error) => {
      console.log(error);
    });
} else if (options.validate === true) {
  mdLinks(route, options)
    .then((arrayLinks) => {
      console.log(
        `\n                                      
       LINKS VALIDATION               
                                      `.bgCyan.black
      );
      arrayLinks.forEach((link) => {
        console.log(`
      ${'HREF    :'.bgMagenta} ${link.href.brightMagenta} 
      ${'MESSAGE :'.bgBlue} ${link.message.brightBlue} 
      ${'STATUS  :'.bgGreen} ${link.status} 
      ${'TEXT    :'.bgYellow} ${link.text.brightYellow}
        `);
      });
    })
    .catch((error) => {
      console.log(error);
    });
} else if (options.stats && !options.validate) {
  mdLinks(route, options)
    .then((arrayLinks) => {
      console.log(
        `\n                                      
       LINKS STATS                    
                                      `.bgCyan.black
      );
      console.log(`\n${'TOTAL LINKS  :'.bgBlue} ${totalLinks(arrayLinks)}`.brightBlue);
      console.log(`\n${'UNIQUE LINKS :'.bgMagenta} ${uniqueLinks(arrayLinks)}`.brightMagenta);
    })
    .catch((error) => {
      console.log(error);
    });
} else if (!options.validate && !options.stats && route !== undefined) {
  mdLinks(route, options)
    .then((arrayLinks) => {
      console.log(
        `\n                                                     
       THIS LINKS WERE FOUND                         
                                                     `.bgCyan.black
      );
      arrayLinks.forEach((link) => {
        console.log(`
      ${'HREF    :'.bgMagenta} ${link.href.brightMagenta} 
      ${'PATH    :'.bgWhite.black} ${link.file} 
      ${'TEXT    :'.bgYellow} ${link.text.brightYellow}`);
      });
      console.log(`     
    Add after your path: 
    ${'--validate :'.bgBlue.white} IF YOU WANT TO VALIDATE IF THE LINKS THAT WERE FOUND WORK OR NOT
    ${'--stats :'.bgBlue.white} IF YOU WANT TO RECEIVE AN OUTPUT WITH A TEXT CONTAINING BASIC STATISTICS ABOUT THE LINKS
    ${'--validate --stats :'.bgBlue.white} IF YOU WANT TO OBTANIN STATISTICS THAT REQUIRE THE VALIDATION RESULTS `.blue);
    }).catch((error) => { console.log(error); });
}

// ------------------------------------------------------------
// if (valid && !stats) {
//   mdLinks(path, { validate: valid }).then((links) => {
//     console.log(`\n
//                                           LINKS VALIDATION`.bgBlue);
//     for (let i = 0; i < links.length; i++) {
//       const object = links[i];
//       console.log(`
//       ${'HREF    :'.bgCyan} ${object.href.brightCyan}
//       ${'MESSAGE :'.bgBlue} ${object.message.brightBlue}
//       ${'STATUS  :'.bgWhite} ${object.status}
//       ${'TEXT    :'.bgYellow} ${object.text.brightYellow}`);
//     }
//   }).catch((error) => { console.log(error); });
// } else if (stats && !valid) {
//   mdLinks(path, { validate: stats }).then((links) => {
//     console.log(`\n${'TOTAL LINKS  :'.bgBlue} ${totalStats(links)}`.brightBlue);
//     console.log(`\n${'UNIQUE LINKS :'.bgYellow} ${uniqueStats(links)}`.brightYellow);
//   }).catch((error) => { console.log(error); });
// } else if ((stats && valid) || (valid && stats)) {
//   mdLinks(path, { validate: valid }).then((links) => {
//     console.log(`\n${'TOTAL LINKS  :'.bgBlue} ${totalStats(links)}`.brightBlue);
//     console.log(`\n${'UNIQUE LINKS :'.bgYellow} ${uniqueStats(links)}`.brightYellow);
//     console.log(`\n${'BROKEN LINKS :'.bgWhite} ${brokenStats(links)}`);
//   }).catch((error) => { console.log(error); });
// } else if (!valid && !stats && path !== undefined) {
//   mdLinks(path, { validate: valid }).then((links) => {
//     console.log(`\n
//                                             THE FOLLOWING LINKS WERE FOUND`
//       .bgBlue);
//     for (let i = 0; i < links.length; i++) {
//       const object = links[i];
//       console.log(`
//       ${'HREF    :'.bgCyan} ${object.href.brightCyan}
//       ${'PATH    :'.bgWhite} ${object.file}
//       ${'TEXT    :'.bgYellow} ${object.text.brightYellow}`);
//     }
//     console.log(`
//     ██ ██
//     ██ ██
//     ██ ██

//     ██ ██

//     Add after your path:
//     ${'--validate :'.bgBlue} IF YOU WANT TO VALIDATE IF THE LINKS THAT WERE FOUND WORK OR NOT
//     ${'--stats :'.bgBlue} IF YOU WANT TO RECEIVE AN OUTPUT WITH A TEXT CONTAINING BASIC STATISTICS ABOUT THE LINKS
//     ${'--validate --stats :'.bgBlue} IF YOU WANT TO OBTANIN STATISTICS THAT REQUIRE THE VALIDATION RESULTS `.blue);
//   }).catch((error) => { console.log(error); });
// }
