import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';

import HTTPClientError from './http-client-error';

export class HTTPBadRequest extends HTTPClientError {
  readonly statusCode = BAD_REQUEST;

  constructor(message: string | object = getStatusText(BAD_REQUEST)) {
    super(message);
  }
}

export class HTTPNotFound extends HTTPClientError {
  readonly statusCode = NOT_FOUND;

  constructor(message: string | object = getStatusText(NOT_FOUND)) {
    super(message);
  }
}
