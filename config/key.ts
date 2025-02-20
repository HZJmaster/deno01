import { generateKey } from "./generateKey.js";
export { $o, $d } from "./encrypt.js";

export const apiKey = generateKey().key;
