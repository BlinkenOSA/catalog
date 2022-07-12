/**
 *
 * @param array
 * @param key
 * @param value
 * @returns {*}
 */
const countObjectsByProperty = (array, key, value) => {
    return (
        array.reduce((accumulator, obj) => {
            if (obj[key] === value) {
                return accumulator + 1;
            }
            return accumulator;
        }, 0)
    )
}

export default countObjectsByProperty;
