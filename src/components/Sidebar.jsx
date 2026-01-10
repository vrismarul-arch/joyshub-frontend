import { LayoutDashboard, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

  return (
    <aside className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col">
      <div className="p-5 text-xl font-bold border-b border-neutral-800">
        VRISM Admin
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2 rounded bg-neutral-800">
          <LayoutDashboard size={18} />
          Dashboard
        </div>
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-neutral-800"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  )
}
