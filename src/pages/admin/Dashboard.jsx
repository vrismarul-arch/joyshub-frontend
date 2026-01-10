import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import {
  fetchRegistrations,
  updateRegistration,
  deleteRegistration,
} from "../../api/axios"
import toast from "react-hot-toast"
import "./dashboardDrawer.css"

/* ================= HELPERS ================= */

function formatDate(date) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/* ================= DASHBOARD ================= */

export default function Dashboard() {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("adminToken")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const data = await fetchRegistrations(token)
      setList(Array.isArray(data) ? data : [])
    } catch {
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="dashboard-wrapper">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Apartment</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r._id}>
                  <td>{r.registerNo}</td>
                  <td>{r.name}</td>
                  <td>{r.phone}</td>
                  <td>{r.apartmentName}</td>
                  <td>{formatDate(r.createdAt)}</td>
                  <td>
                    <button onClick={() => setSelected(r)}>View</button>
                    <button onClick={() => setDeleteId(r._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* DRAWER */}
        {selected && (
          <Drawer
            data={selected}
            onClose={() => setSelected(null)}
            onStatusChange={async (id, status) => {
              await updateRegistration(id, { status }, token)
              toast.success("Status Updated")
              loadData()
            }}
          />
        )}

        {/* DELETE */}
        {deleteId && (
          <div className="delete-modal">
            <div className="delete-box">
              <p>Delete this record?</p>
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                className="danger"
                onClick={async () => {
                  await deleteRegistration(deleteId, token)
                  toast.success("Deleted")
                  setDeleteId(null)
                  loadData()
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

/* ================= DRAWER ================= */

function Drawer({ data, onClose, onStatusChange }) {
  return (
    <div className="drawer-overlay">
      <div className="drawer-backdrop" onClick={onClose}></div>

      <div className="drawer-panel">
        <div className="drawer-header">
          <h2>Registration Details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          <Section title="Basic Info">
            <Detail label="Register No" value={data.registerNo} />
            <Detail label="Name" value={data.name} />
            <Detail label="Gender" value={data.gender} />
            <Detail label="DOB" value={formatDate(data.dob)} />
            <Detail label="Marital Status" value={data.maritalStatus} />
          </Section>

          <Section title="Contact">
            <Detail label="Phone" value={data.phone} />
            <Detail label="Address" value={data.address} />
            <Detail label="City" value={data.city} />
            <Detail label="Country" value={data.country} />
          </Section>

          <Section title="Identity">
            <Detail label="Aadhar" value={data.aadhar} />
            <Detail label="Guardian" value={data.guardian} />
          </Section>

          <Section title="Stay Details">
            <Detail label="Apartment" value={data.apartmentName} />
            <Detail label="Apartment Address" value={data.apartmentAddress} />
            <Detail label="Check-in Date" value={formatDate(data.checkinDate)} />
            <Detail label="Vehicle" value={data.vehicle} />
            <Detail label="Company" value={data.company} />
          </Section>

          <Section title="Reference">
            {data.reference?.length
              ? data.reference.map((r, i) => (
                  <span key={i} className="ref-badge">{r}</span>
                ))
              : "—"}
          </Section>

          <Section title="Documents">
            <div className="media-grid">
              {data.photoUrl && <img src={data.photoUrl} alt="Photo" />}
              {data.signatureUrl && <img src={data.signatureUrl} alt="Sign" />}
            </div>
          </Section>

          <Section title="Status">
            <select
              value={data.status}
              onChange={(e) =>
                onStatusChange(data._id, e.target.value)
              }
              className="status-select"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </Section>
        </div>
      </div>
    </div>
  )
}

/* ================= SMALL COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div className="drawer-section">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <span>{value || "—"}</span>
    </div>
  )
}
