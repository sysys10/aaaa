import React, { useEffect, useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'
import { ModalPortal } from '@components/ui'
import { Skeleton } from '@components/ui/skeleton/Skeleton'

import ToggleSwitch from '../ToggleSwitch'
import AmountSetting from './AmountSetting'
import { MIN_AMOUNT } from './constants'

interface FinancialSettingsModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  fdsAmount: {
    inAmount: number
    outAmount: number
    inYn: boolean
    outYn: boolean
  }
  isPending: boolean
  saveFdsSetting: (data: {
    useYn: boolean
    amount: string
    inOutDv: '1' | '2'
  }) => void
  isSaving: boolean
}

const FinancialSettingsModal = ({
  isOpen,
  setIsOpen,
  fdsAmount,
  isPending,
  saveFdsSetting,
  isSaving
}: FinancialSettingsModalProps) => {
  const [withdrawalAlertEnabled, setWithdrawalAlertEnabled] = useState(
    fdsAmount.outYn
  )
  const [depositAlertEnabled, setDepositAlertEnabled] = useState(fdsAmount.inYn)

  const [withdrawalThreshold, setWithdrawalThreshold] = useState(
    Math.max(fdsAmount.outAmount, MIN_AMOUNT)
  )
  const [depositThreshold, setDepositThreshold] = useState(
    Math.max(fdsAmount.inAmount, MIN_AMOUNT)
  )

  const [originalWithdrawalThreshold, setOriginalWithdrawalThreshold] =
    useState(Math.max(fdsAmount.outAmount, MIN_AMOUNT))
  const [originalDepositThreshold, setOriginalDepositThreshold] = useState(
    Math.max(fdsAmount.inAmount, MIN_AMOUNT)
  )

  const [isEditingWithdrawal, setIsEditingWithdrawal] = useState(false)
  const [isEditingDeposit, setIsEditingDeposit] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setWithdrawalAlertEnabled(fdsAmount.outYn)
      setDepositAlertEnabled(fdsAmount.inYn)
      setWithdrawalThreshold(Math.max(fdsAmount.outAmount, MIN_AMOUNT))
      setDepositThreshold(Math.max(fdsAmount.inAmount, MIN_AMOUNT))
      setOriginalWithdrawalThreshold(Math.max(fdsAmount.outAmount, MIN_AMOUNT))
      setOriginalDepositThreshold(Math.max(fdsAmount.inAmount, MIN_AMOUNT))
      setIsEditingWithdrawal(false)
      setIsEditingDeposit(false)
    }
  }, [isOpen, fdsAmount])

  const handleToggleWithdrawalAlert = () => {
    const newState = !withdrawalAlertEnabled
    setWithdrawalAlertEnabled(newState)

    saveFdsSetting({
      useYn: newState,
      amount: withdrawalThreshold.toString(),
      inOutDv: '2'
    })
  }

  const handleToggleDepositAlert = () => {
    const newState = !depositAlertEnabled
    setDepositAlertEnabled(newState)

    saveFdsSetting({
      useYn: newState,
      amount: depositThreshold.toString(),
      inOutDv: '1'
    })
  }

  const handleSaveWithdrawal = () => {
    const finalAmount = Math.max(withdrawalThreshold, MIN_AMOUNT)
    setWithdrawalThreshold(finalAmount)
    setOriginalWithdrawalThreshold(finalAmount)
    setIsEditingWithdrawal(false)

    saveFdsSetting({
      useYn: withdrawalAlertEnabled,
      amount: finalAmount.toString(),
      inOutDv: '2'
    })
  }

  const handleSaveDeposit = () => {
    const finalAmount = Math.max(depositThreshold, MIN_AMOUNT)
    setDepositThreshold(finalAmount)
    setOriginalDepositThreshold(finalAmount)
    setIsEditingDeposit(false)

    saveFdsSetting({
      useYn: depositAlertEnabled,
      amount: finalAmount.toString(),
      inOutDv: '1'
    })
  }

  return (
    <ModalPortal
      size='sm'
      className='top-1/2 h-[34rem] max-h-screen overflow-auto'
      isOpen={isOpen}
      handleClose={() => setIsOpen(false)}
    >
      <div>
        <div className='border-b border-gray-200'>
          <div className='p-4 flex items-center justify-between'>
            <span className='font-medium'>금액 설정</span>
            <CustomIcons
              name='close'
              onClick={() => setIsOpen(false)}
              className='w-5 h-5 cursor-pointer'
            />
          </div>
        </div>
        {isPending ? (
          <div className='p-4 space-y-4'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-32 w-full' />
          </div>
        ) : (
          <div className='p-4'>
            <div className='mb-6'>
              <div className='flex justify-between items-center mb-4'>
                <span className='font-medium'>거래 출금 알림</span>
                <ToggleSwitch
                  isOn={withdrawalAlertEnabled}
                  onToggle={handleToggleWithdrawalAlert}
                  disabled={isSaving}
                />
              </div>

              <AmountSetting
                title='출금 금액이 얼마 초과일 때'
                subtitle='알려드릴까요?'
                amount={withdrawalThreshold}
                unit='원'
                isEditable={true}
                isEditing={isEditingWithdrawal}
                onEdit={() => {
                  setIsEditingWithdrawal(true)
                  setOriginalWithdrawalThreshold(withdrawalThreshold)
                }}
                onSave={handleSaveWithdrawal}
                onCancel={() => {
                  setWithdrawalThreshold(originalWithdrawalThreshold)
                  setIsEditingWithdrawal(false)
                }}
                onAmountChange={(value) => setWithdrawalThreshold(value)}
                disabled={isSaving}
              />
            </div>

            <div>
              <div className='flex justify-between items-center mb-4'>
                <span className='font-medium'>거래 입금 알림</span>
                <ToggleSwitch
                  isOn={depositAlertEnabled}
                  onToggle={handleToggleDepositAlert}
                  disabled={isSaving}
                />
              </div>

              <AmountSetting
                title='입금 금액이 얼마 초과일 때'
                subtitle='알려드릴까요?'
                amount={depositThreshold}
                unit='원'
                isEditable={true}
                isEditing={isEditingDeposit}
                onEdit={() => {
                  setIsEditingDeposit(true)
                  setOriginalDepositThreshold(depositThreshold)
                }}
                onSave={handleSaveDeposit}
                onCancel={() => {
                  setDepositThreshold(originalDepositThreshold)
                  setIsEditingDeposit(false)
                }}
                onAmountChange={(value) => setDepositThreshold(value)}
                disabled={isSaving}
              />
            </div>
          </div>
        )}
      </div>
    </ModalPortal>
  )
}

export default FinancialSettingsModal
