import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import HTTPClientError from './http-client-error';

export class HTTPBadRequest extends HTTPClientError {
  readonly statusCode = BAD_REQUEST;
}

export class HTTPNotFound extends HTTPClientError {
  readonly statusCode = NOT_FOUND;
}
