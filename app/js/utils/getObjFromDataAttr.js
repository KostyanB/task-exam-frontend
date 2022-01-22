const getObjFromDataAttr = (elem, attr) => {

    try {
        return JSON.parse(elem.getAttribute(`${attr.slice(1, -1)}`))
    } catch (e) {
        console.warn(`Error Options in element with data attribute "${attr}"`);
    }
}

export default getObjFromDataAttr;