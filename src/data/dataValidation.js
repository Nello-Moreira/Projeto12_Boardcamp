function isEmptyString(str) {
	if (str.length === 0) return true;
	return false;
}

function alreadyExists(obj, listToCompare, keyToCompare) {
	return listToCompare.some(e => e[keyToCompare] === obj[keyToCompare]);
}

export { isEmptyString, alreadyExists };
