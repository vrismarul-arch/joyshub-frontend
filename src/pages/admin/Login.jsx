import { useState } from "react"
import { adminLogin } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import "./AdminLogin.css"

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
    <div className="admin-login-page">
      <div className="login-card">

        <h2 className="login-title">Admin Panel</h2>
        <p className="login-subtitle">Secure Access</p>

        {error && <div className="error-box">{error}</div>}

        {/* EMAIL */}
        <div className="input-group">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email Address</label>
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>

          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button className="login-btn" onClick={submit}>
          Sign In
        </button>

      </div>
    </div>
  )
}
