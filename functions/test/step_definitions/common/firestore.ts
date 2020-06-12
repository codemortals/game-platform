import { Then } from 'cucumber';
import { expect } from 'chai';

Then(/^there is a collection "([^"]*)" with document "([^"]*)"$/, async function (collectionName, documentId) {
    const parsedId = this.parseTemplate(documentId);
    this.storage.documentRef = this.firestore.collection(collectionName).doc(parsedId);

    const document = await this.storage.documentRef.get();
    expect(document.exists, `No document for "${ collectionName }" with ID "${ parsedId }"`).to.be.true;
});

Then(/^there is a sub-collection "([^"]*)" with document "([^"]*)"$/, async function (collectionName, documentId) {
    if (!this.storage.documentRef) {
        throw new Error('No existing document reference');
    }

    const parsedId = this.parseTemplate(documentId);
    this.storage.documentRef = this.storage.documentRef.collection(collectionName).doc(parsedId);

    const document = await this.storage.documentRef.get();
    expect(document.exists, `No document for "${ collectionName }" with ID "${ parsedId }"`).to.be.true;
});

Then(/^the document contains:$/, async function (tableData) {
    if (!this.storage.documentRef) {
        throw new Error('No existing document reference');
    }

    const document = (await this.storage.documentRef.get()).data();
    const expectedData = this.parseObjectData(tableData.rowsHash());

    expect(document).deep.equals(expectedData);
});
