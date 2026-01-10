import { useNavigate } from "react-router-dom"
import "./thankYou.css"

export default function ThankYou() {
  const navigate = useNavigate()

  return (
    <div className="thankyou-wrapper">
      <div className="thankyou-card">
        <div className="success-ring">
          <span>✓</span>
        </div>

        <h1>Registration Successful</h1>

        <p>
          Thank you for registering.  
          Our team will contact you shortly with further details.
        </p>

        <div className="thankyou-actions">
          <button onClick={() => navigate("/")}>
            Register Another
          </button>
        </div>
      </div>
    </div>
  )
}
