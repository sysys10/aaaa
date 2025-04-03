import CustomIcons from '@components/common/CustomIcons'

export default function AdminScreen({
  isAdminLoading,
  adminUrl,
  handleCloseAdmin
}: {
  isAdminLoading: boolean
  adminUrl: string
  handleCloseAdmin: () => void
}) {
  return (
    <div className='relative w-full h-full flex flex-col'>
      <div className='w-full p-1'>
        <div className='w-full rounded-lg py-2 bg-background-sidebar flex items-center justify-between px-4'>
          <div className='text-sm text-aicfo'>사용설정</div>
          <div>
            <CustomIcons
              name='close'
              onClick={handleCloseAdmin}
              className='w-4 h-4 text-gray-500'
            />
          </div>
        </div>
      </div>
      {isAdminLoading ? (
        <div className='w-full flex-1 flex flex-col items-center justify-center gap-4'>
          <div className='flex items-center justify-center gap-2'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='w-4 h-4 rounded-full bg-aicfo animate-bounce'
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
          <p className='text-sm text-gray-500'>사용설정을 불러오는 중입니다.</p>
        </div>
      ) : (
        <iframe src={adminUrl} className='w-full flex-1 border-0' />
      )}
    </div>
  )
}
