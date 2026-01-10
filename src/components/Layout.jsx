import Sidebar from "./Sidebar"
import Topbar from "./Topbaradmin"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
<Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
