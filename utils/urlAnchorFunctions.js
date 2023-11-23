export const getURLWithoutAnchor = (path, queryObject) => {
    return path.replace(`?tab=${queryObject['tab']}`, "")
}