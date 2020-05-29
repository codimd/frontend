import { FrontendConfigState } from '../redux/frontend-config/types'
import { BackendConfigState } from '../redux/backend-config/types'
import { expectResponseCode, getBackendUrl } from '../utils/apiUtils'

export const getBackendConfig = async (): Promise<BackendConfigState> => {
  const response = await fetch(getBackendUrl() + '/config')
  expectResponseCode(response)
  return await response.json() as Promise<BackendConfigState>
}

export const getFrontendConfig = async (): Promise<FrontendConfigState> => {
  const response = await fetch('config.json')
  expectResponseCode(response)
  return await response.json() as Promise<FrontendConfigState>
}
