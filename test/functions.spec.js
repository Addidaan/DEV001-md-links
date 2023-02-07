/* eslint-disable no-undef */
const { default: axios } = require('axios');
const {
  pathIsAbsolute,
  pathExists,
  turnPathAbsolute,
  isExtensionMd,
  getLinks,
  getLinkStatus,
} = require('../functions');

const { totalLinks, uniqueLinks, brokenLinks } = require('../cli_stats');

jest.mock('axios');

// -------------------------------TESTS DE FUNCTIONS.JS--------------------------------------------
const absolutePathMd = 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md';
const noExisteRuta = 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/noexiste.md';
const relativePath = 'prueba/ejemplo.md';
const absolutePathInvert = 'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md';
const htmlPath = './prueba/ejemplo.html';
const noLinks = './prueba/ejemplosinlinks.md';

// Test cuando SI existe la ruta
describe('pathExists: cuando SI existe RUTA', () => {
  it('Debe indicar TRUE cuando si existe ruta', () => {
    expect(pathExists(absolutePathMd)).toEqual(true);
  });
});
// Test cuando NO existe la ruta
describe('pathExists: cuando NO existe', () => {
  it('Debe indicar FALSE cuando no existe la ruta', () => {
    expect(pathExists(noExisteRuta)).toEqual(false);
  });
});
// Test cuando la ruta SI es absoluta
describe('pathIsAbsolute: cuando SI es absoluta', () => {
  it('Debe indicar TRUE cuandoo SI es absoluta', () => {
    expect(pathIsAbsolute(absolutePathMd)).toEqual(true);
  });
});
// Test cuando la ruta NO es absoluta
describe('pathIsAbsolute: cuando NO es absoluta', () => {
  it('Debe indicar FALSE cuando NO es absoluta', () => {
    expect(pathIsAbsolute(relativePath)).toEqual(false);
  });
});

// Test cuando la ruta es absoluta la deja igual/no la convierte
describe('turnPathAbsolute: Cuando es absoluta la deja igual', () => {
  it('Cuando la ruta es absoluta la deja igual', () => {
    expect(turnPathAbsolute(absolutePathMd)).toEqual(absolutePathMd);
  });
});

// Test cuando la ruta es relativa la cambia a absoluta
describe('turnPathAbsolute: la ruta relativa la cambia a absoluta', () => {
  it('Cuando la ruta es relativa la cambia a absoluta', () => {
    expect(turnPathAbsolute(relativePath)).toEqual(absolutePathInvert);
  });
});

// Test cuando el archivo SI tiene extension md
describe('isExtensionMd : Si archivo tiene extension md', () => {
  it('Devuelve TRUE si el arvhivo tiene extension .md', () => {
    expect(isExtensionMd(absolutePathMd)).toEqual(true);
  });
});

// Test cuando el archivo NO tiene extension md
describe('isExtensionMd : El archivo NO tiene extension md', () => {
  it('Devuelve FALSE si el arvhivo NO tiene extension .md', () => {
    expect(isExtensionMd(htmlPath)).toEqual(false);
  });
});

// Test getLinks
const array = [
  {
    href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
    text: 'description',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
];

test('getLinks muestra links cuando encuentra', () => getLinks(absolutePathMd).then((data) => expect(data).toEqual(array)));
test('getLinks muestra ERROr cuando no tiene links', () => getLinks(noLinks).catch((error) => expect(error).toEqual(new Error('Path does not have links'))));

// Test de getLinkStatus
const arrayGetLinkStatus = [
  {
    href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
    text: 'description',
    file: 'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
];
const arrayGetStatus = [
  {
    href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
    text: 'description',
    file: 'C:\\Users\\adria\\Desktop\\Laboratoria\\DEV001-md-links\\prueba\\ejemplo.md',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    status: 200,
    message: 'ok',
  },
];

test('getLinkStatus', () => getLinkStatus(arrayGetLinkStatus).then((data) => expect(data).toEqual(arrayGetStatus)));
// Test getLinkStatus cuando rechaza
const arrayGetLinkStatusFail = [
  {
    href: 'https://nodasjs.org/',
    text: 'Node.js',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
];
const errorArraytGetLinkStatus = [
  {
    href: 'https://nodasjs.org/',
    text: 'Node.js',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    status: 500,
    message: 'Fail',
  },
];
test('getLinkStatus', () => getLinkStatus(arrayGetLinkStatusFail).catch((error) => expect(error).toEqual(errorArraytGetLinkStatus)));

// -----------------------------TEST FUNCTIONS CLI-STATS------------------------------------------

const arrayStats = [
  {
    href: 'https://raw.githubusercontent.com/programminghistorian/jekyll/gh-pages/es/lecciones/introduccion-a-bash.md',
    text: 'description',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
];
const arrayBroken = [
  {
    href: 'https://raw.githubusercontent.com/programminghistorian/gh-pages/es/lecciones/introduccion-a-bash.md',
    text: 'description',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
  },
];
// TEST DEL TOTAL DE LINKS
describe('totalLinks', () => {
  it('should be a function', () => {
    expect(typeof totalLinks).toBe('function');
  });
  it('should count the total of links', () => {
    expect(totalLinks(arrayStats)).toBe('1');
  });
});

// TEST DE LINKS UNICOS QUE NO SE REPITEN
describe('uniqueLinks', () => {
  it('should be a function', () => {
    expect(typeof uniqueLinks).toBe('function');
  });
  it('should count the unique links', () => {
    expect(uniqueLinks(arrayStats)).toBe('1');
  });
});

// TEST DE LINKS ROTOS
describe('brokenLinks', () => {
  it('should be a function', () => {
    expect(typeof brokenLinks).toBe('function');
  });
  it('should count the broken links', () => {
    expect(brokenLinks(arrayBroken)).toBe('0');
  });
});

// ----------------------------TEST CON MOCK-------------------------------------------

// afterEach(() => {
//   // cleaning up the mess left behind the previous test
//   mockAxios.reset();
// });

const link = [
  {
    href: 'https://nodejs.org/',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    text: 'Node.js',
  },
];
const linkStatus = [
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    status: 200,
    message: 'ok',
  },
];
const linkFail = [
  {
    href: 'https://nodasjs.org/',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    text: 'Node.js',
  },
];

const linkFailStatus = [
  {
    href: 'https://nodasjs.org/',
    text: 'Node.js',
    file: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',
    status: 400,
    message: 'fail',
  },
];
describe('getLinkStatus', () => {
  it('Debe retornar el href, text, file, estatus y message', () => {
    axios.get.mockResolvedValue({ status: 200 });
    return expect(getLinkStatus(link))
      .resolves
      .toEqual(linkStatus);
  });
});
it('Devuelve el array mostando el FAIL', () => {
  // axios.get.mockRejectedValueOnce({});
  // axios.get.mockRejectedValueOnce({ request: {} });
  axios.get.mockRejectedValueOnce({ response: { status: 400 } });
  return expect(getLinkStatus(linkFail))
    .resolves
    .toEqual(linkFailStatus);
});
