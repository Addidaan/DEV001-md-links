const { default: axios } = require('axios');
const { getLinkStatus } = require('./..functions');
jest.mock('axios');

// ----------------------------TEST CON MOCK-------------------------------------------

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

const link = [
  {
    HREF: 'https://nodejs.org/',
    TEXT: 'Node.js',
    FILE: 'C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md',

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

describe('getLinkStatus', () => {
  it.only('Debe retornar el href, text, file, estatus y message', () => {
    axios.get.mockResolvedValue({ status: 200 });
    return expect(getLinkStatus(link))
      .resolves
      .toEqual(linkStatus);
  });
});

module.exports = {
  mockResp,
};
