import { ProjectList } from '../../components/ProjectList'
import { Title } from '../../components/Title'

export const Projects = () => {
  return (
    <section className='w-full max-w-7xl'>
      <Title title='Encontre aqui seus projetos'></Title>
      <div className='w-full flex justify-center flex-wrap items-center gap-8 mt-8'>
        <ProjectList />
      </div>
    </section>
  )
}
