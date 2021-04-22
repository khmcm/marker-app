/** @type {number} */
let counter = 0;

/** @type {number} */
let previousTimestamp = 0;

/**
 * @description Generates a 64-bit id, based on a timestamp and counter
 * @returns {string}
 */
function getId() {
    const newTimestamp = Date.now();
    if(counter > 2 ** 20 - 1) {
        counter = 0;
    }
    previousTimestamp = newTimestamp;
    return (window.BigInt(newTimestamp) << 20n | window.BigInt(counter ++)).toString(16);
}

export default getId;