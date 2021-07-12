/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '../redux'

export const defaultFetchConfig: Partial<RequestInit> = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  method: 'GET'
}

export const getApiUrl = (): string => {
  return store.getState().apiUrl.apiUrl
}

/**
 * Error class for invalid API responses.
 */
export class ApiResponseError extends Error {}

/**
 * Checks if the HTTP status code of a given response matches a given status code.
 * @param response The HTTP response to check.
 * @param code The numeric HTTP response code to expect. Defaults to 200 (OK).
 * @throws ApiResponseError if the response code of the request does not match.
 */
export const expectResponseCode = (response: Response, code = 200): void => {
  if (response.status !== code) {
    throw new ApiResponseError(`response code is not ${code}`)
  }
}
