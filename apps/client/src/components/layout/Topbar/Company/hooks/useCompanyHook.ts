import { UserStoreType, useCompanyStore, useUserStore } from '@stores'

import { createMutation } from '@hooks/query/mutationUtils'

import { Company } from '@types'

import { changeInttId, changeMainCompany } from '@packages/apis'

function useCompanyMutation({
  setUser,
  setCompanies
}: {
  setUser: (user: UserStoreType) => void
  setCompanies: (companies: Company[]) => void
}) {
  return createMutation({
    mutationFn: changeInttId,
    onSuccess: (data) => {
      if (data.success) {
        setUser({
          userId: data.body.userId,
          companyId: data.body.companyId,
          mngeYn: data.body.mngeYn,
          useInttId: data.body.useInttId,
          certCnt: data.body.certCnt
        })
        setCompanies(data.body.accessCompanyList)
        window.location.reload()
      }
    }
  })
}
function useMainCompanyMutation({
  changeInttId
}: {
  changeInttId: (data: { useInttId: string; useTokenYn: string }) => void
}) {
  return createMutation({
    mutationFn: changeMainCompany,
    onSuccess: (data, variables) => {
      if (data.success) {
        changeInttId({
          useInttId: variables.useInttId,
          useTokenYn: 'Y'
        })
      }
    }
  })
}

export const useCompanyHook = () => {
  const { user, setUser } = useUserStore((s) => s)
  const { companies, setCompanies } = useCompanyStore((s) => s)
  const { mutate: changeInttId } = useCompanyMutation({ setUser, setCompanies })
  const { mutate: changeMainIntt } = useMainCompanyMutation({
    changeInttId
  })
  function handleChangeInttID({ c }: { c: Company }) {
    changeInttId({
      useInttId: c.useInttId,
      useTokenYn: 'Y'
    })
  }
  function handleChangeMainCompany({ c }: { c: Company }) {
    changeMainIntt({
      useInttId: c.useInttId
    })
  }
  return { companies, handleChangeInttID, user, handleChangeMainCompany }
}
