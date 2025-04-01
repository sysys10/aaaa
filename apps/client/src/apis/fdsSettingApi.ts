import { daquvApi } from '@apis'

import { DefaultResponse } from '@types'

export interface FdsSettingResponse extends DefaultResponse {
  body: {
    inYn: 'Y'
    inAmount: string
    outYn: 'Y'
    outAmount: string
  }
}
export async function getFdsSettingApi(): Promise<FdsSettingResponse> {
  const { data } = await daquvApi.get('/push/user/fds/data')
  return data
}

export interface SaveFdsSettingResponse extends DefaultResponse {
  body: {
    inOutDv: '1' | '2'
    amount: string
    useYn: 'Y' | 'N'
  }
}

export async function saveFdsSettingApi(data: {
  useYn: boolean
  amount: string
  inOutDv: '1' | '2'
}): Promise<SaveFdsSettingResponse> {
  const response = await daquvApi.post('/push/user/fds', {
    useYn: data.useYn ? 'Y' : 'N',
    amount: data.amount,
    inOutDv: data.inOutDv
  })
  return response.data
}
