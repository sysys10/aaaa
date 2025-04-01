import { useState } from 'react'

import {
  FdsSettingResponse,
  SaveFdsSettingResponse,
  getFdsSettingApi,
  saveFdsSettingApi
} from '@apis/fdsSettingApi'

import { createMutation } from '@hooks/query/mutationUtils'

export interface FdsSettingProps {
  inAmount: number
  outAmount: number
  inYn: boolean
  outYn: boolean
}
function useFdsSettingQuery({
  setFdsAmount
}: {
  setFdsAmount: (fdsSetting: FdsSettingProps) => void
}) {
  return createMutation<FdsSettingResponse>({
    mutationFn: getFdsSettingApi,
    onSuccess: (data) => {
      if (data.success)
        setFdsAmount({
          inAmount: Number(data.body.inAmount),
          outAmount: Number(data.body.outAmount),
          inYn: data.body.inYn === 'Y',
          outYn: data.body.outYn === 'Y'
        })
      else {
        throw new Error('FDS 설정 불러오기 실패')
      }
    }
  })
}

function useFdsSettingSaveMutation({ setFdsAmount }: { setFdsAmount: any }) {
  return createMutation<
    SaveFdsSettingResponse,
    {
      useYn: boolean
      amount: string
      inOutDv: '1' | '2'
    }
  >({
    mutationFn: saveFdsSettingApi,
    onSuccess: (data) => {
      if (data.body.inOutDv === '1') {
        setFdsAmount((prev: FdsSettingProps) => ({
          ...prev,
          inAmount: Number(data.body.amount),
          inYn: data.body.useYn === 'Y'
        }))
      } else {
        setFdsAmount((prev: FdsSettingProps) => ({
          ...prev,
          outAmount: Number(data.body.amount),
          outYn: data.body.useYn === 'Y'
        }))
      }
    }
  })
}
export function useFdsSetting() {
  const [fdsAmount, setFdsAmount] = useState<FdsSettingProps>({
    inAmount: 0,
    outAmount: 0,
    inYn: true,
    outYn: true
  })

  const { mutate: saveFdsSetting, isPending: isSaving } =
    useFdsSettingSaveMutation({ setFdsAmount })

  const { mutate: getFdsSetting, isPending } = useFdsSettingQuery({
    setFdsAmount
  })
  return { fdsAmount, getFdsSetting, isPending, saveFdsSetting, isSaving }
}
