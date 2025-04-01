import { useAdminStore } from '@stores/adminStore'
import { useSidebarStore } from '@stores/sidebarStore'

import { useAdminQuery } from './query'

export function useAdmin(handleResetResults: () => void, refresh: () => void) {
  const adminUrl = useAdminStore((s) => s.adminUrl)
  const setAdminUrl = useAdminStore((s) => s.setAdminUrl)
  const { setIsSidebarOpen, setSidebarContent } = useSidebarStore((s) => s)

  const { mutate: openAdmin, isPending: isAdminLoading } = useAdminQuery({
    setAdminUrl
  })
  const handleToggleAdmin = () => {
    if (adminUrl) {
      setAdminUrl('')
      refresh()
      setIsSidebarOpen(false)
      setSidebarContent('brf')
    } else {
      openAdmin()
    }
  }
  const handleCloseAdmin = () => {
    setAdminUrl('')
    refresh()
    setIsSidebarOpen(false)
    setSidebarContent('brf')
    handleResetResults()
  }
  return { adminUrl, handleToggleAdmin, handleCloseAdmin, isAdminLoading }
}
