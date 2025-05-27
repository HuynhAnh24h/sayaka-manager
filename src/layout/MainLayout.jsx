import { Header, Sidebar } from '../components'

const MainLayout = ({ children }) => {
    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-4 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default MainLayout