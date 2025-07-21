const { setSource } = require("./source");
const createSource = require("./sources");

async function initPostSource() {
  const source = await createSource();
  setSource(source);
  console.log("✅ Post source initialized");
}

module.exports = initPostSource;
