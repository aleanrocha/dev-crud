import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const Layout = () => {
  return (
    <div className='bg-gray-100 flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 flex flex-col justify-center items-center px-4 py-12'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
