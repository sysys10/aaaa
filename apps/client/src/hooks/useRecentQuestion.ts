import { useUserStore } from '@stores'
import { useState } from 'react'

import { RecentQuestionProps, RequestRemoveUtterance } from '@types'

import {
  useRecentQuestionMutation,
  useRemoveRecentQuestionMutation
} from './query'

type RemoveRecentQuestionParams = Omit<RequestRemoveUtterance, 'userId'>

interface UseRecentQuestionsReturnProps {
  recentQuestions: RecentQuestionProps[]
  handleRemoveRecentQuestion: (params: RemoveRecentQuestionParams) => void
  handleGetRecentQuestion: () => void
}

function useRecentQuestions(): UseRecentQuestionsReturnProps {
  const user = useUserStore((s) => s.user)

  const [recentQuestions, setRecentQuestions] = useState<RecentQuestionProps[]>(
    []
  )
  const { mutate: getRecentQuestion } = useRecentQuestionMutation({
    setRecentQuestions
  })

  const { mutate: removeRecentQuestion } = useRemoveRecentQuestionMutation({
    setRecentQuestions
  })

  const handleGetRecentQuestion = () => {
    getRecentQuestion({ userId: user?.userId || '' })
  }

  const handleRemoveRecentQuestion = ({
    utterance,
    intentCd,
    utteranceDate,
    type
  }: RemoveRecentQuestionParams) => {
    const userId = user?.userId
    if (!userId) return
    removeRecentQuestion({
      utterance,
      intentCd,
      utteranceDate,
      type,
      userId
    })
  }

  return {
    recentQuestions,
    handleRemoveRecentQuestion,
    handleGetRecentQuestion
  }
}

export { useRecentQuestions }
