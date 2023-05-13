const crypto = require("crypto");

function _asString(data) {
  if (typeof data === "string") {
    return data;
  }
  return JSON.stringify(data);
}

function _asHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate = event;
  if (event.partitionKey) {
    candidate = event.partitionKey;
  }
  candidate = _asString(candidate);

  if (event.partitionKey && candidate.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }

  return _asHash(candidate);
};
