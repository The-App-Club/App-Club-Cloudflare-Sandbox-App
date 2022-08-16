import { Router } from 'itty-router';

import { cleanSomethingInfoFromFauna } from './handlers/cleanSomethingInfoFromFauna';
import { indexSomethingInfoToFauna } from './handlers/indexSomethingInfoToFauna';
import { patchSomethingInfoToFauna } from './handlers/patchSomethingInfoToFauna';

const router = Router();

router
  .get('/api/clean-something-info-from-fanuna', cleanSomethingInfoFromFauna)
  .get('/api/index-something-info-to-fanuna', indexSomethingInfoToFauna)
  .get('/api/patch-something-info-to-fanuna', patchSomethingInfoToFauna)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request) => router.handle(request);
