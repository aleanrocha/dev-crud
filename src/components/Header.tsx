import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-around items-center font-osw">
      <h3 className="uppercase text-xl border-b border-gray-400">Dev-<span className="text-gray-400">CRUD</span></h3>
      <nav className="flex gap-4 transition-all uppercase text-sm">
        <Link to='/' className=" hover:text-gray-300">Home</Link>
        <Link to='/projetos' className=" hover:text-gray-300">Projetos</Link>
        <Link to='/desenvolvedores' className=" hover:text-gray-300">Devs</Link>
      </nav>
    </header>
  )
}
