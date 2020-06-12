const projectId = 'codemortals-testing';
process.env.GCP_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

import { initializeAdminApp } from '@firebase/testing';
import { setWorldConstructor } from 'cucumber';

const testApp = require('firebase-functions-test')({ projectId });

class World {

    public firestore: any;
    public storage: any = {};
    public response: any;

    readonly functions: any;

    constructor() {
        this.firestore = initializeAdminApp({ projectId }).firestore();
        this.functions = require('../../lib/index.js');
    }

    public parseTemplate(string: string): string {
        let parsed = string;
        const template = parsed.match(/{{\s?(\S*)\s?}}/);

        if (template instanceof Array) {
            const fields = template[ 1 ].split('.');
            const scope = fields.shift();
            parsed = this.storage[ scope ];

            parsed = fields.reduce((current, next) => {
                const array = next.match(/\[(\d+)\]/);
                if (array instanceof Array) {
                    const field = next.replace(array[ 0 ], '');
                    return current[ field ][ parseInt(array[ 1 ], 10) - 1 ];
                } else {
                    return current[ next ];
                }
            }, parsed);

            parsed = parsed.replace(template[ 0 ], this.storage[ template[ 1 ] ]);
            parsed = this.parseTemplate(parsed);
        }

        return parsed;
    }

    public parseObjectData(data): { [ key: string ]: any } {
        Object.keys(data).map((key) => {
            data[ key ] = this.parseTemplate(data[ key ]);

            try {
                data[ key ] = JSON.parse(data[ key ]);
            } catch (ex) { }
        });
        return data;
    }

    public parseArrayData(data) {
        let parsed = [];
        for (const row of data) {
            for (const field in row) {
                if (row.hasOwnProperty(field)) {
                    row[ field ] = this.parseTemplate(row[ field ]);

                    try {
                        row[ field ] = JSON.parse(row[ field ]);
                    } catch (ex) { }
                }
            }
            parsed = [ ...parsed, row ];
        }
        return parsed;
    }

    public async callFunction(name: string, data: any, auth: { uid: string }) {
        const result = await testApp.wrap(this.functions[ name ])(data, { auth });

        this.response = result;
        return result;
    }

}

setWorldConstructor(World);
