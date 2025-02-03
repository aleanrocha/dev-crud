interface TitleProps {
  title: string
}

export const Title = ({ title }: TitleProps) => {
  return (
    <h1 className='text-3xl text-center font-bold p-4 text-gray-800'>
      {title}
    </h1>
  )
}
