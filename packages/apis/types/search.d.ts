import { DefaultResponse } from './domain'

interface SearchResult {
  raw_data: TableData[]
  answer: string
  session_id: string
  chain_id: string
  sql_query: string
  analyzed_question?: string
  recommend?: string[]
  is_api: boolean
  is_muryo: boolean
  date_info?: string[]
}

type SearchRequest = {
  utterance: string
  session_id?: string
}
type PendingAnswer = string | null

type TableHeaderType = {
  align: string
  change_title: string
  type: string
}
type TableData = {
  key: { title?: string; subtitle?: string; desc?: string }
  data: Record<string, string>[]
  data_header: TableHeaderType[]
}
export type ReportData = {
  data: Record<string, string>[]
  data_header: TableHeaderType[]
  answer: string
  key: string
}

type AICFOResultType = {
  utterance: string
  answer: PendingAnswer | string
  table_data?: TableData[]
  sql_query?: string
  session_id?: string
  chain_id?: string
  is_api: boolean
  is_muryo: boolean
  date_info?: string[]
}

type SearchSubmitType = ({ utterance, session_id }: SearchRequest) => void

interface SearchAnswerResponse extends DefaultResponse {
  body: SearchResult
}

export type {
  TableData,
  TableHeaderType,
  SearchResult,
  AICFOResultType,
  SearchRequest,
  SearchSubmitType,
  SearchAnswerResponse
}
