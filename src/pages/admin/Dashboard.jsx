import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  fetchRegistrations,
  updateRegistration,
  deleteRegistration,
} from "../../api/axios";
import toast from "react-hot-toast";
import "./dashboardDrawer.css";

/* ================= HELPERS ================= */
const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ================= MAIN DASHBOARD ================= */
export default function Dashboard() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchRegistrations(token);
      setList(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <div>
            <h2>Resident Management</h2>
            <p className="subtitle">Total: {list.length}</p>
          </div>
          <button className="refresh-btn" onClick={loadData}>↻ Refresh</button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner" />
          </div>
        ) : (
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Reg No</th>
                  <th>Resident</th>
                  <th>Apartment</th>
                  <th>Check-in</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r._id}>
                    <td className="reg-badge">#{r.registerNo}</td>
                    <td>
                      <div className="user-cell">
                        <img src={r.photoUrl} className="mini-avatar" />
                        <div>
                          <div className="user-name">{r.name}</div>
                          <div className="user-sub">{r.mobile}</div>
                        </div>
                      </div>
                    </td>
                    <td>{r.apartmentName}</td>
                    <td>{formatDate(r.checkinDate)}</td>
                    <td>
                      <span className={`status-pill ${r.status}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <button className="view-btn" onClick={() => setSelected(r)}>
                        View
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => setDeleteId(r._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* IMAGE ZOOM */}
        {zoomImage && (
          <div className="zoom-overlay" onClick={() => setZoomImage(null)}>
            <img src={zoomImage} className="zoomed-img" />
          </div>
        )}

        {/* DRAWER */}
        {selected && (
          <Drawer
            data={selected}
            onClose={() => setSelected(null)}
            onZoom={setZoomImage}
            reload={loadData}
          />
        )}

        {/* DELETE CONFIRM */}
        {deleteId && (
          <div className="modal-overlay">
            <div className="confirm-box">
              <h3>Delete Resident?</h3>
              <p>This cannot be undone.</p>
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                className="danger-btn"
                onClick={async () => {
                  await deleteRegistration(deleteId, token);
                  toast.success("Deleted");
                  setDeleteId(null);
                  loadData();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

/* ================= DRAWER ================= */
function Drawer({ data, onClose, onZoom, reload }) {
  const token = localStorage.getItem("adminToken");

  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...data });

  useEffect(() => {
    setForm({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const save = async () => {
    try {
      setSaving(true);
      await updateRegistration(data._id, form, token);
      toast.success("Updated successfully");
      setEdit(false);
      reload();
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="drawer-root">
      <div className="drawer-backdrop" onClick={onClose} />

      <div className="drawer-panel">
        <div className="drawer-header-gradient">
          <img
            src={form.photoUrl}
            className="drawer-avatar"
            onClick={() => onZoom(form.photoUrl)}
          />
          <div>
            <h3>{form.name}</h3>
            <span>ID: {form.registerNo}</span>
          </div>
          <div className="drawer-actions">
            {!edit ? (
              <button onClick={() => setEdit(true)}>Edit</button>
            ) : (
              <>
                <button onClick={save} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setForm({ ...data });
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
            <button onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="drawer-scroll-body">
          <Info title="Personal">
            <Input label="Name" name="name" value={form.name} edit={edit} onChange={handleChange} />
            <Input label="Gender" name="gender" value={form.gender} edit={edit} onChange={handleChange} />
            <Input label="DOB" type="date" name="dob" value={form.dob?.slice(0,10)} edit={edit} onChange={handleChange} />
            <Input label="Marital Status" name="maritalStatus" value={form.maritalStatus} edit={edit} onChange={handleChange} />
            <Input label="Blood Group" name="bloodGroup" value={form.bloodGroup} edit={edit} onChange={handleChange} />
            <Input label="Nationality" name="nationality" value={form.nationality} edit={edit} onChange={handleChange} />
          </Info>

          <Info title="Contact">
            <Input label="Mobile" name="mobile" value={form.mobile} edit={edit} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} edit={edit} onChange={handleChange} />
            <Input label="Address" name="address" value={form.address} edit={edit} textarea onChange={handleChange} />
          </Info>

          <Info title="Parent / Guardian">
            <Input label="Parent Name" name="parentName" value={form.parentName} edit={edit} onChange={handleChange} />
            <Input label="Parent Contact" name="parentContact" value={form.parentContact} edit={edit} onChange={handleChange} />
            <Input label="Guardian Name" name="guardianName" value={form.guardianName} edit={edit} onChange={handleChange} />
            <Input label="Guardian Contact" name="guardianContact" value={form.guardianContact} edit={edit} onChange={handleChange} />
          </Info>

          <Info title="Stay">
            <Input label="Apartment Name" name="apartmentName" value={form.apartmentName} edit={edit} onChange={handleChange} />
            <Input label="Apartment Address" name="apartmentAddress" value={form.apartmentAddress} edit={edit} textarea onChange={handleChange} />
            <Input label="Check-in Date" type="date" name="checkinDate" value={form.checkinDate?.slice(0,10)} edit={edit} onChange={handleChange} />
            <Input label="Lock-in" name="lockIn" value={form.lockIn} edit={edit} onChange={handleChange} />
          </Info>

          <Info title="Company">
            <Input label="Company Name" name="companyName" value={form.companyName} edit={edit} onChange={handleChange} />
            <Input label="Company Address" name="companyAddress" value={form.companyAddress} edit={edit} textarea onChange={handleChange} />
          </Info>

          <Info title="Vehicle">
            <Input label="Vehicle Type" name="vehicleType" value={form.vehicleType} edit={edit} onChange={handleChange} />
            <Input label="Vehicle Number" name="vehicleNumber" value={form.vehicleNumber} edit={edit} onChange={handleChange} />
          </Info>

          <Info title="Documents">
            <img src={form.aadhaarUrl} onClick={() => onZoom(form.aadhaarUrl)} />
            <img src={form.signatureUrl} onClick={() => onZoom(form.signatureUrl)} />
          </Info>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */
function Info({ title, children }) {
  return (
    <div className="drawer-card">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function Input({ label, edit, textarea, ...props }) {
  return (
    <div className="detail-row column">
      <span>{label}</span>
      {edit ? (
        textarea ? <textarea {...props} /> : <input {...props} />
      ) : (
        <span>{props.value || "—"}</span>
      )}
    </div>
  );
}
