import { Label, Textarea } from '@headlessui/react'
import { useState } from 'react'

export default function Test() {
  const [message, setMessage] = useState('')
  return (
    <div className='flex h-screen w-screen flex-col'>
      <div className='h-[var(--topbar-height)] w-full bg-gradient-to-br from-cyan-200 to-blue-200'>
        네이티브 영역
      </div>
      <div className='flex-1'>
        <p>AI CFO에게 말씀해주세요!</p>
        <Label>문의하기</Label>
        <Textarea
          name={'문의하기'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></Textarea>
      </div>
    </div>
  )
}
