import { openAdminApi } from '@apis'

import { AICFOMutation } from '@types'

import { createMutation } from './mutationUtils'

export const useAdminQuery = ({
  setAdminUrl
}: {
  setAdminUrl: (url: string) => void
}) => {
  return createMutation({
    mutationFn: openAdminApi,
    onSuccess: (data) => {
      if (data.success) {
        setAdminUrl(data.message)
      }
    }
  }) as AICFOMutation<any, void>
}
