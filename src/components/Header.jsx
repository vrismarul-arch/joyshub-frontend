import { PhoneOutlined, MailOutlined, PhoneFilled, MailFilled } from "@ant-design/icons";
import logo from "../assets/logo.png";
import "./header.css";

export default function Header() {
  return (
    <header className="jh-header">
      {/* LEFT SIDE */}
      <div className="jh-left">
        <img
          src={logo}
          alt="Joy's Hub Logo"
          className="jh-logo"
        />

       
      </div>

      {/* RIGHT SIDE */}
     <div className="jh-right">
  <div className="jh-contact">
    <span>8148162481</span>
        <PhoneFilled />

  </div>

  <div className="jh-contact">
   
    <span>joyshub51@gmail.com</span> <MailFilled />
  </div>
</div>

    </header>
  );
}
