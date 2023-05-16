const { fetchBooks, renderBooks } = require('./index.js');
const sinon = require('sinon');
const chai = require('chai');
const spies = require('chai-spies');
const fetch = require('node-fetch');

chai.use(spies);
const expect = chai.expect;

describe('index.js', () => {
  describe('fetchBooks()', () => {
    beforeEach(() => {
      global.window = {
        document: {
          body: {
            innerHTML: '<main></main>',
          },
        },
      };
      global.fetch = fetch;
    });

    afterEach(() => {
      delete global.window;
      delete global.fetch;
    });

    it("sends a fetch request to 'https://anapioficeandfire.com/api/books'", async () => {
      const fetchSpy = sinon.spy(global, 'fetch');
      await fetchBooks();
      expect(fetchSpy).to.have.been.called.with(
        'https://anapioficeandfire.com/api/books'
      );
      fetchSpy.restore();
    });

    it("renders book titles into the DOM by passing a JSON object to renderBooks()", async () => {
      const renderBooksSpy = sinon.spy(global.window, 'renderBooks');
      const books = [{ title: 'Book 1' }, { title: 'Book 2' }];
      renderBooks(books);
      expect(renderBooksSpy).to.have.been.called();
      renderBooksSpy.restore();
    });
  });
});
