import { daquvApi } from './axiosInstance'

export const openAdminApi = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const { data } = await daquvApi.post('/auth/admin', {
    headers: {
      'JWT-TOKEN': `${user?.jwtToken}`
    }
  })
  return data
}
