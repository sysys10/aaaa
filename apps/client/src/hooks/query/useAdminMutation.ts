import { openAdminApi } from '@apis'

import { useAdminStore } from '@stores/adminStore'

import { AICFOMutation } from '@types'

import { createMutation } from './mutationUtils'

export const useAdminQuery = () => {
  const setAdminUrl = useAdminStore((s) => s.setAdminUrl)

  return createMutation({
    mutationFn: openAdminApi,
    onSuccess: (data) => {
      if (data.success) {
        setAdminUrl(data.message)
      }
    }
  }) as AICFOMutation<any, void>
}
