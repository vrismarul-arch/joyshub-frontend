import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { uploadFile } from "../utils/fileStorage";
import ImageUpload from "./ImageUpload";
import './form.css';

export default function RegistrationForm({ selectedLocation }) {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FILES STATE ================= */
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [signFile, setSignFile] = useState(null);
  const [signPreview, setSignPreview] = useState(null);

  const [aadhaarFile, setAadhaarFile] = useState(null);

  /* ================= AADHAAR NUMBER STATE ================= */
  const [aadhaar, setAadhaar] = useState(Array(12).fill(""));

  /* ================= FORM DATA STATE ================= */
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    bloodGroup: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    address: "",
    parentName: "",
    parentContact: "",
    nationality: "",
    checkinDate: "",
    lockIn: "",
    companyName: "",
    companyAddress: "",
    vehicleType: "",
    vehicleNumber: "",
    guardianName: "",
    guardianContact: "",
    reference: [],
  });

  /* ================= HANDLERS ================= */
  const handleAadhaar = (val, i) => {
    if (!/^[0-9]?$/.test(val)) return;
    const copy = [...aadhaar];
    copy[i] = val;
    setAadhaar(copy);
    // Auto-focus next input
    if (val && i < 11) {
      const next = document.getElementById(`aadhaar-${i + 1}`);
      next?.focus();
    }
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  /* ================= SUBMIT LOGIC ================= */
  const handleSubmit = async () => {
    if (loading) return;
    
    try {
      if (!agree) return toast.error("Please accept Terms & Conditions");

      const aadhaarNo = aadhaar.join("");
      if (aadhaarNo.length !== 12)
        return toast.error("Enter valid 12-digit Aadhaar number");

      if (!photoFile || !signFile || !aadhaarFile)
        return toast.error("Upload Photo, Signature & Aadhaar Card");

      setLoading(true);
      const uploadToastId = toast.loading("Uploading files...");

      // Uploading all 3 files to Supabase/Storage
      const photoUrl = await uploadFile(photoFile, "joyshub/photos");
      const signatureUrl = await uploadFile(signFile, "joyshub/signatures");
      const aadhaarUrl = await uploadFile(aadhaarFile, "joyshub/aadhaar");

      toast.dismiss(uploadToastId);

      if (!photoUrl || !signatureUrl || !aadhaarUrl) {
        setLoading(false);
        return toast.error("File upload failed. Try again.");
      }

      const submitToastId = toast.loading("Submitting your registration...");

      // Sending COMPLETE data to Backend
      await api.post("/register", {
        ...form, // Sends all fields (name, mobile, email, parentName, etc.)
        aadhar: aadhaarNo,
        aadhaarUrl,
        photoUrl,
        signatureUrl,
        apartmentName: selectedLocation?.name || "N/A",
        apartmentAddress: selectedLocation?.address || "N/A",
        agreedToTerms: true,
      });

      toast.dismiss(submitToastId);
      toast.success("Registration Successful 🎉");
      
      setTimeout(() => navigate("/thank-you"), 1500);
    } catch (err) {
      setLoading(false);
      toast.dismiss();
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl max-w-6xl mx-auto my-8">
      {/* HEADER */}
      <div className="reg-header flex justify-between items-start mb-8">
        <div className="reg-header-text">
          <h2 className="text-3xl font-bold text-gray-800">REGISTRATION FORM</h2>
          <p className="font-semibold text-lg mt-2 text-blue-600">JOY&apos;S HUB HOME STAYS</p>
          <p className="text-gray-500 italic mt-1">A home away from home.</p>
        </div>
        <div className="reg-header-image">
          <ImageUpload
            label="Upload Photo"
            file={photoFile}
            setFile={setPhotoFile}
            preview={photoPreview}
            setPreview={setPhotoPreview}
          />
        </div>
      </div>

      <hr className="my-6" />

      {/* AADHAAR SECTION */}
      <div className="mb-8">
        <label className="font-bold text-gray-700 block mb-2">12-Digit Aadhaar Number</label>
        <div className="flex gap-2 mb-4 flex-wrap">
          {aadhaar.map((v, i) => (
            <input
              key={i}
              id={`aadhaar-${i}`}
              maxLength={1}
              value={v}
              onChange={(e) => handleAadhaar(e.target.value, i)}
              className="w-10 h-12 border-2 border-gray-300 text-center rounded-lg text-xl font-bold focus:border-blue-500 outline-none"
            />
          ))}
        </div>
        <label className="font-bold text-gray-700 block mb-2">Upload Aadhaar Card (Image/PDF)</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setAadhaarFile(e.target.files[0])}
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Field label="Full Name" value={form.name} onChange={(v) => handleInputChange("name", v)} />
        <Field label="Mobile Number" value={form.mobile} onChange={(v) => handleInputChange("mobile", v)} />
        <Field label="Email Address" value={form.email} onChange={(v) => handleInputChange("email", v)} />
        <Field label="Blood Group" value={form.bloodGroup} onChange={(v) => handleInputChange("bloodGroup", v)} />
        <Field type="date" label="Date of Birth" value={form.dob} onChange={(v) => handleInputChange("dob", v)} />
        <Field label="Nationality" value={form.nationality} onChange={(v) => handleInputChange("nationality", v)} />

        <div className="flex gap-4">
          <Gender onChange={(v) => handleInputChange("gender", v)} />
        </div>
          <MaritalStatus onChange={(v) => handleInputChange("maritalStatus", v)} />

        <Field label="Parent / Guardian Name" value={form.parentName} onChange={(v) => handleInputChange("parentName", v)} />
        <Field label="Parent / Guardian Contact" value={form.parentContact} onChange={(v) => handleInputChange("parentContact", v)} />
        
        <Field type="date" label="Check-in Date" value={form.checkinDate} onChange={(v) => handleInputChange("checkinDate", v)} />
        
        <div className="form-control">
          <label className="label"><span className="label-text font-bold">Lock-in Period</span></label>
          <select 
            className="select select-bordered w-full" 
            value={form.lockIn}
            onChange={(e) => handleInputChange("lockIn", e.target.value)}
          >
            <option value="">Select Period</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>9 Months</option>
            <option>12 Months</option>
          </select>
        </div>

        <Field label="Company/College Name" value={form.companyName} onChange={(v) => handleInputChange("companyName", v)} />
        <Field label="Vehicle Type (e.g. Car/Bike)" value={form.vehicleType} onChange={(v) => handleInputChange("vehicleType", v)} />
        <Field label="Vehicle Number" value={form.vehicleNumber} onChange={(v) => handleInputChange("vehicleNumber", v)} />
        
        <Field label="Local Guardian Name" value={form.guardianName} onChange={(v) => handleInputChange("guardianName", v)} />
        <Field label="Local Guardian Contact" value={form.guardianContact} onChange={(v) => handleInputChange("guardianContact", v)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TextArea label="Permanent Address" value={form.address} onChange={(v) => handleInputChange("address", v)} />
        <TextArea label="Company/College Address" value={form.companyAddress} onChange={(v) => handleInputChange("companyAddress", v)} />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <Reference onChange={(v) => handleInputChange("reference", v)} />
      </div>

      {/* TERMS & SIGNATURE */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="checkbox "
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className="text-sm">
            I hereby declare that the details furnished above are true and correct to the best of my knowledge. 
            I agree to the <a href="/terms" target="_blank" className="text-blue-600 underline">Terms & Conditions</a>.
          </span>
        </div>

        <div className="w-full md:w-auto">
          <ImageUpload
            label="Resident Signature"
            file={signFile}
            setFile={setSignFile}
            preview={signPreview}
            setPreview={setSignPreview}
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="text-center mt-12">
        <button 
          className={`btn btn-lg px-20 text-white ${loading ? 'btn-disabled' : 'btn-success'}`} 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "PROCESSING..." : "SUBMIT REGISTRATION"}
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE SMALL COMPONENTS ================= */

const Field = ({ label, onChange, value, type = "text" }) => (
  <div className="form-control w-full">
    <label className="label"><span className="label-text font-bold">{label}</span></label>
    <input
      type={type}
      value={value}
      placeholder={`Enter ${label}`}
      className="input input-bordered w-full focus:border-blue-400"
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div className="form-control w-full">
    <label className="label"><span className="label-text font-bold">{label}</span></label>
    <textarea
      value={value}
      className="textarea textarea-bordered h-24"
      placeholder={`Enter ${label}`}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Gender = ({ onChange }) => (
  <div className="form-control">
    <label className="label font-bold">Gender</label>
    <div className="flex gap-4 mt-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="gender" className="radio radio-primary" onChange={() => onChange("Male")} /> Male
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="gender" className="radio radio-primary" onChange={() => onChange("Female")} /> Female
      </label>
    </div>
  </div>
);

const MaritalStatus = ({ onChange }) => (
  <div className="form-control">
    <label className="label font-bold">Marital Status</label>
    <div className="flex gap-4 mt-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="marital" className="radio radio-secondary" onChange={() => onChange("Married")} /> Married
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="marital" className="radio radio-secondary" onChange={() => onChange("Unmarried")} /> Single
      </label>
    </div>
  </div>
);

const Reference = ({ onChange }) => {
  const options = ["Friends", "Social Media", "Website", "Walk-in", "Google Search"];
  const [selected, setSelected] = useState([]);

  const handleCheck = (opt) => {
    const updated = selected.includes(opt) 
      ? selected.filter(s => s !== opt) 
      : [...selected, opt];
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div>
      <label className="font-bold mb-3 block text-gray-700">How did you hear about us?</label>
      <div className="flex flex-wrap gap-4">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1 rounded-full border">
            <input type="checkbox" className="checkbox checkbox-sm" onChange={() => handleCheck(opt)} />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};