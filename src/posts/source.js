let sourceInstance = null;

function setSource(source) {
  sourceInstance = source;
}

function getSource() {
  if (!sourceInstance) {
    throw new Error("Source not initialized. Call initPostSource() first.");
  }
  return sourceInstance;
}

module.exports = {
  setSource,
  getSource,
};
