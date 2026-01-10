import { useState } from "react"
import { adminLogin } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const submit = async () => {
    try {
      const data = await adminLogin(email, password)
      localStorage.setItem("adminToken", data.token)
      navigate("/admin/dashboard")
    } catch {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="bg-neutral-800 p-8 rounded-2xl w-full max-w-sm space-y-6">

        <h2 className="text-2xl font-semibold text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD WITH TOGGLE */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* SUBMIT */}
        <button
          onClick={submit}
          className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>

      </div>
    </div>
  )
}
