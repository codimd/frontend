/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'

/**
 * Sends the POST request to add an alias to a given note (identified by its id or another alias).
 *
 * @param noteId The id or another alias of the note to which the alias should be added.
 * @param alias The alias that should be added.
 * @throws ApiResponseError if the request does not succeed.
 */
export const postAlias = async (noteId: string, alias: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}notes/${noteId}/metadata/alias/${alias}`, {
    ...defaultFetchConfig,
    method: 'POST'
  })
  expectResponseCode(response)
}

/**
 * Sends the DELETE request to remove an alias from a note.
 * @param alias The alias that should be removed from a note.
 *              As aliases are unique, a note id is not required.
 * @throws ApiResponseError if the request does not succeed.
 */
export const deleteAlias = async (alias: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}notes/${alias}/metadata/alias`, {
    ...defaultFetchConfig,
    method: 'DELETE'
  })
  expectResponseCode(response)
}

/**
 * Sends the PUT request to mark an alias as primary for a note.
 * @param alias The alias that should be marked as primary for a note.
 *              As aliases are unique, a note id is not required.
 * @throws ApiResponseError if the request does not succeed.
 */
export const putPrimaryAlias = async (alias: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}notes/${alias}/metadata/alias`, {
    ...defaultFetchConfig,
    method: 'PUT'
  })
  expectResponseCode(response)
}
