import { Router } from 'itty-router';

import {CowboyBebop} from './handlers/select';

const router = Router();

router
  .get('/', CowboyBebop)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request) => router.handle(request);
