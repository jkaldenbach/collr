function createLogger() {
  return {
    debug: console.debug,
    info: console.log,
    warn: console.warn,
    error: console.error
  };
}

module.exports = createLogger();
