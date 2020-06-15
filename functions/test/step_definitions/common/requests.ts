import { When } from 'cucumber';

When(/^I call the "([^"]*)" endpoint with:$/, async function (endpoint, data) {
    const request = this.parseObjectData(data.rowsHash());
    this.response = await this.callFunction(endpoint, request, { uid: this.storage.hostId });
});
