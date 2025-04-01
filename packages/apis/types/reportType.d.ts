export type DataHeaderField = Record<
  string,
  {
    change_title: string
    align: 'left' | 'right' | 'center'
    type: string
  }
>

export type AccountRecord = Record<string, string>

export type BankData = Record<string, AccountRecord[]>

export interface BankDataResponse {
  data: Record<string, BankData[]>
  data_header: Record<string, DataHeaderField>
}
export interface DateRangeParams {
  startDate: string
  endDate: string
  option: 'D' | 'W' | 'M' | 'A'
}
