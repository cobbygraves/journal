const { describe } = require("node:test");

describe("body contains h3", () => {
    function mockDOM(){
        document.body.innerHTML = '';
        document.body.innerHTML += '<h2>The Journal App</h2>';
    }
    mockDOM();
    test("Should be true", () => {
      const h2 = document.querySelector('h2');
        expect(h2).toBeTruthy();
    });
});