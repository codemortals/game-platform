import { clearFirestoreData } from '@firebase/testing';
import { Before } from 'cucumber';

Before(async function () {
    await clearFirestoreData({ projectId: process.env.GCP_PROJECT });
});
