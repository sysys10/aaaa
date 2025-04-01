import { useUserStore } from '@stores'

import {
  BodyStringResponse,
  RecentQuestionProps,
  RecentQuestionsRequest,
  RequestRemoveUtterance,
  postRecentQuestionsResponse
} from '@types'

import { postRecentQuestions, postRemoveRecentQuestion } from '@packages/apis'

import { createMutation } from './mutationUtils'

interface RecentQuestionMutationProps {
  setRecentQuestions: (data: RecentQuestionProps[]) => void
}

function useRecentQuestionMutation({
  setRecentQuestions
}: RecentQuestionMutationProps) {
  return createMutation<postRecentQuestionsResponse, RecentQuestionsRequest>({
    mutationFn: postRecentQuestions,
    onSuccess: (data, _, __) => {
      if (data.success) {
        setRecentQuestions(data.body)
      }
    }
  })
}

function useRemoveRecentQuestionMutation({
  setRecentQuestions
}: RecentQuestionMutationProps) {
  const user = useUserStore((s) => s.user)
  return createMutation<BodyStringResponse, RequestRemoveUtterance>({
    mutationFn: postRemoveRecentQuestion,
    onSuccess: async (data, _, __) => {
      if (data.success) {
        const response = await postRecentQuestions({
          userId: user?.userId || ''
        })
        if (response.success) {
          setRecentQuestions(response.body)
        }
      }
    }
  })
}

export { useRecentQuestionMutation, useRemoveRecentQuestionMutation }
