const crypto = require("crypto");

function _toString(data) {
  if (typeof data === "string") {
    return data;
  }
  return JSON.stringify(data);
}

function _toHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return _toHash(_toString(event));
  }
  
  candidate = _toString(event.partitionKey);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return _toHash(candidate)
  }

  return candidate;
};