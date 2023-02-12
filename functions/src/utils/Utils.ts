import {v4 as uuid} from 'uuid';
import * as admin from 'firebase-admin';

export const Utils = {
    async saveHtml(rawHtml: string): Promise<string> {
        const file = admin.storage().bucket().file(`${uuid()}.html`);
        await file.save(rawHtml, { contentType: 'text/html', gzip: true, public: true });
        return file.publicUrl();
    }
}