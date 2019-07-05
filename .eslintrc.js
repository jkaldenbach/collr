module.exports = {
  extends: ["standard", "prettier"],
  globals: {
    after: false,
    afterEach: false,
    assert: false,
    before: false,
    beforeEach: false,
    describe: false,
    expect: false,
    it: false,
    request: false
  },
  parserOptions: {
    ecmaVersion: 2018
  }
};
