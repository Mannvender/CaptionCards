function getLocalData() {
	const retrievedObject = JSON.parse(localStorage.getItem('testObject'));
	// console.log('retrievedObject: ', retrievedObject);
	return retrievedObject;
}

function putLocalData(imageURL, caption) {
	let retrievedObject = JSON.parse(localStorage.getItem('testObject'));

	if (retrievedObject === undefined || retrievedObject === null) {
		retrievedObject = { dataArr: [] };
	}
	retrievedObject.dataArr.push({ imageURL: imageURL, caption: caption });

	// console.log('retrievedObject: ', retrievedObject);
	localStorage.setItem('testObject', JSON.stringify(retrievedObject));
}

function deleteLocalData(newArray) {
	const testObject = { dataArr: newArray };
	localStorage.setItem('testObject', JSON.stringify(testObject));
}