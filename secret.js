const crypto = require("crypto");

const secret = "Cineasta";
const secret2 = "Palomitas";
const hashSecret = crypto
  .createHmac("sha256", secret)
  .update(secret2)
  .digest("hex");

const refresh = "Proyector";
const refresh2 = "Guion";
const hashRefresh = crypto
  .createHmac("sha256", refresh)
  .update(refresh2)
  .digest("hex");

console.log(hashSecret, hashRefresh);
