import { Header, Sidebar } from '../components'

const MainLayout = ({children}) => {
  return (
    <>
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-4'>
          {children}
        </main>
      </div>
    </div>
    </>
  )
}

export default MainLayout