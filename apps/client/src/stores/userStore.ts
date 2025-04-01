import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Company, UserInfo } from '@packages/apis/types'

export type UserStoreType = Omit<UserInfo, 'jwtToken' | 'accessCompanyList'>
interface UserStore {
  user: UserStoreType | null
  setUser: (user: UserStoreType) => void
  isBolcked: boolean
  setIsBolcked: (isBolcked: boolean) => void
  handleLogout: () => void
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user })
      },
      handleLogout: () => {
        set({ user: null })
      },
      isBolcked: false,
      setIsBolcked: (isBolcked) => {
        set({ isBolcked })
      }
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
interface CompanyStore {
  companies: Company[]
  setCompanies: (companies: Company[]) => void
}
const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      companies: [],
      setCompanies: (companies: Company[]) => set({ companies })
    }),
    { name: 'company', storage: createJSONStorage(() => localStorage) }
  )
)
export { useUserStore, useCompanyStore }
