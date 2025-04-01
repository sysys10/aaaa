import { useUserStore } from '@stores'

import { getRefreshInfo } from '@packages/apis'

import { createMutation } from './mutationUtils'

export function useRefreshMutation() {
  const setUser = useUserStore((state) => state.setUser)
  const setIsBolcked = useUserStore((state) => state.setIsBolcked)
  return createMutation({
    mutationFn: getRefreshInfo,
    onSuccess: (data) => {
      setUser({
        ...data.body
      })
      setIsBolcked(data.body.planStts == '0' && data.body.freeDDay <= 0)
    }
  })
}

export default useRefreshMutation
