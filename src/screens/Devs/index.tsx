import { DevLIst } from '../../components/DevList'
import { Title } from '../../components/Title'

export const Devs = () => {
  return (
    <section className='w-full m-auto max-w-7x'>
      <Title title='Encontre aqui os melhores Devs'></Title>
      <div className='w-full flex justify-center gap-8 mt-8 flex-wrap'>
        <DevLIst />
      </div>
    </section>
  )
}
