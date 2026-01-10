import { useState } from "react";
import "./locationModal.css";

export default function LocationModal({ open, onSelect, onClose }) {
  const [selected, setSelected] = useState(null);

  if (!open) return null;

  const locations = [
    {
      name: "Polaris",
      address:
        "Suriya Apartment, 2nd Floor, Thiru Vee Ka Street, Postal Audit Colony, Saligramam, Chennai - 600093",
    },
    {
      name: "Alphard",
      address:
        "Plot No.10, Second Floor, Manikodi Srinivasan Nagar, Senthil Nagar 1st Street, Perungudi, Chennai - 600096",
    },
    {
      name: "Spica",
      address:
        "Friends Apartment, Block II, F4, First Floor, Chandrashekhar Avenue 1st Cross, Okkiyum Thoraippakkam, Chennai - 600097",
    },
    {
      name: "Canopus",
      address:
        "No.1, Srinath Apartments, 1st Floor, 21st Street, Tansi Nagar, Velachery, Chennai - 600042",
    },
    {
      name: "Aldebaran",
      address:
        "No.3B, Kurinji Nagar, 8th Cross Street, Perungudi, Chennai - 600096",
    },
    {
      name: "Astralis",
      address:
        "Plot No.101, 3rd Floor, Thirumalai Nagar, 3rd Annexe Street, Perungudi, Chennai - 600096",
    },
    {
      name: "Altair",
      address:
        "Friends Apartment, Block II, F3, First Floor, Chandrashekhar Avenue 1st Cross, Okkiyum Thoraippakkam, Chennai - 600097",
    },
  ];

  return (
    <div className="location-backdrop" onClick={onClose}>
      <div className="location-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <header className="location-header">
          <h1>Choose Your Apartment</h1>
          <p>Select the apartment for service delivery</p>
        </header>

        {/* SCROLL AREA */}
        <section className="location-list">
          {locations.map((loc) => (
            <label
              key={loc.name}
              className={`location-card ${
                selected?.name === loc.name ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="location"
                checked={selected?.name === loc.name}
                onChange={() => {
                  setSelected(loc);
                }}
              />

              <div className="location-info">
                <span className="location-name">{loc.name}</span>
                <span className="location-address">{loc.address}</span>
              </div>
            </label>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="location-footer">
          <button
            disabled={!selected}
            onClick={() => {
              onSelect(selected); // PASS OBJECT
              onClose();
            }}
          >
            Confirm Selection
          </button>
        </footer>

      </div>
    </div>
  );
}
