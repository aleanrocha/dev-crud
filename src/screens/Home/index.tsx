import { FormContainer } from '../../components/FormContainer'
import { Title } from '../../components/Title'

export const Home = () => {
  return (
    <section className='w-full max-w-lg m-auto'>
      <Title title='Crie seu projeto aqui :)'></Title>
      <FormContainer />
    </section>
  )
}
