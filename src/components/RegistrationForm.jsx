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

  /* ================= FILES ================= */
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [signFile, setSignFile] = useState(null);
  const [signPreview, setSignPreview] = useState(null);

  const [aadhaarFile, setAadhaarFile] = useState(null);

  /* ================= AADHAAR NUMBER ================= */
  const [aadhaar, setAadhaar] = useState(Array(12).fill(""));

  /* ================= FORM DATA ================= */
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
  };

  const handleAadhaarFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAadhaarFile(file);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      if (!agree) return toast.error("Please accept Terms & Conditions");

      const aadhaarNo = aadhaar.join("");
      if (aadhaarNo.length !== 12)
        return toast.error("Enter valid 12-digit Aadhaar number");

      if (!photoFile || !signFile || !aadhaarFile)
        return toast.error("Upload Photo, Signature & Aadhaar Card");

      toast.loading("Uploading files...", { id: "upload" });

      const photoUrl = await uploadFile(photoFile, "joyshub/photos");
      const signatureUrl = await uploadFile(signFile, "joyshub/signatures");
      const aadhaarUrl = await uploadFile(aadhaarFile, "joyshub/aadhaar");

      if (!photoUrl || !signatureUrl || !aadhaarUrl) {
        toast.dismiss("upload");
        return toast.error("File upload failed");
      }

      toast.dismiss("upload");
      toast.loading("Submitting form...", { id: "submit" });

      await api.post("/register", {
        ...form,
        aadhar: aadhaarNo,
        aadhaarUrl,
        photoUrl,
        signatureUrl,
        apartmentName: selectedLocation?.name,
        apartmentAddress: selectedLocation?.address,
        agreedToTerms: true,
      });

      toast.dismiss("submit");
      toast.success("Registration Successful 🎉");

      setTimeout(() => navigate("/thank-you"), 1200);
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 bg-white rounded-xl shadow-xl max-w-6xl mx-auto my-8">

      {/* ================= HEADER ================= */}
      <div className="reg-header">
        <div className="reg-header-text">
          <h2 className="text-2xl font-bold mb-3">REGISTRATION FORM</h2>
          <p className="font-semibold">Dear Residents,</p>
          <p className="text-sm">
            Welcome to <b>JOY&apos;S HUB HOME STAYS</b>.
          </p>
        </div>

        <div className="reg-header-image">
          <ImageUpload
            label="Photo"
            file={photoFile}
            setFile={setPhotoFile}
            preview={photoPreview}
            setPreview={setPhotoPreview}
          />
        </div>
      </div>

      {/* ================= AADHAAR NUMBER ================= */}
      <label className="font-medium">Aadhaar Number</label>
      <div className="flex gap-2 mb-4 flex-wrap">
        {aadhaar.map((v, i) => (
          <input
            key={i}
            maxLength={1}
            value={v}
            onChange={(e) => handleAadhaar(e.target.value, i)}
            className="w-10 h-10 border text-center rounded"
          />
        ))}
      </div>

      {/* ================= AADHAAR UPLOAD ================= */}
      <label className="font-medium">Upload Aadhaar Card</label>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleAadhaarFile}
        className="mb-6"
      />

      {/* ================= FORM FIELDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Full Name" onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Mobile" onChange={(v) => setForm({ ...form, mobile: v })} />
        <Field label="Email" onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Blood Group" onChange={(v) => setForm({ ...form, bloodGroup: v })} />
        <Field type="date" label="DOB" onChange={(v) => setForm({ ...form, dob: v })} />

        <Gender onChange={(v) => setForm({ ...form, gender: v })} />
        <MaritalStatus onChange={(v) => setForm({ ...form, maritalStatus: v })} />

        <TextArea label="Address" onChange={(v) => setForm({ ...form, address: v })} />
        <Field label="Parent Name" onChange={(v) => setForm({ ...form, parentName: v })} />
        <Field label="Parent Contact" onChange={(v) => setForm({ ...form, parentContact: v })} />
        <Field label="Nationality" onChange={(v) => setForm({ ...form, nationality: v })} />

        <Field type="date" label="Check-in Date"
          onChange={(v) => setForm({ ...form, checkinDate: v })} />
          <div><h6>Check-in Date </h6>
        <select 
          className="input input-bordered"
          onChange={(e) => setForm({ ...form, lockIn: e.target.value })}
        >
          <option value="">Lock-in Period</option>
          <option>3 Months</option>
          <option>6 Months</option>
          <option>9 Months</option>
          <option>12 Months</option>
        </select></div>
        

        <Field label="Company Name"
          onChange={(v) => setForm({ ...form, companyName: v })} />

        <TextArea label="Company Address"
          onChange={(v) => setForm({ ...form, companyAddress: v })} />

        <Field label="Vehicle Type"
          onChange={(v) => setForm({ ...form, vehicleType: v })} />

        <Field label="Vehicle Number"
          onChange={(v) => setForm({ ...form, vehicleNumber: v })} />

        <Field label="Local Guardian Name"
          onChange={(v) => setForm({ ...form, guardianName: v })} />

        <Field label="Local Guardian Contact"
          onChange={(v) => setForm({ ...form, guardianContact: v })} />

        <Reference onChange={(v) => setForm({ ...form, reference: v })} />
      </div>

      {/* ================= TERMS ================= */}
      <div className="mt-6 flex gap-2 items-start">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />

        <span className="text-sm">
          I agree to{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold underline"
          >
            Terms & Conditions
          </a>
        </span>
      </div>


      {/* ================= SIGNATURE ================= */}
      <div className="mt-6">
        <ImageUpload
          label="Signature"
          file={signFile}
          setFile={setSignFile}
          preview={signPreview}
          setPreview={setSignPreview}
        />
      </div>

      {/* ================= SUBMIT ================= */}
      <div className="text-center mt-8">
        <button className="btn btn-success px-16" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Field = ({ label, onChange, type = "text" }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <input
      type={type}
      className="input input-bordered w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const TextArea = ({ label, onChange }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <textarea
      className="textarea textarea-bordered w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Gender = ({ onChange }) => (
  <div>
    <label>Gender</label><br />
    <input type="radio" name="gender" onChange={() => onChange("Male")} /> Male
    <input type="radio" name="gender" className="ml-4"
      onChange={() => onChange("Female")} /> Female
  </div>
);

const MaritalStatus = ({ onChange }) => (
  <div>
    <label>Marital Status</label><br />
    <input type="radio" name="marital" onChange={() => onChange("Married")} /> Married
    <input type="radio" name="marital" className="ml-4"
      onChange={() => onChange("Unmarried")} /> Unmarried
  </div>
);

const Reference = ({ onChange }) => {
  const [refs, setRefs] = useState([]);

  const toggle = (v) => {
    const updated = refs.includes(v)
      ? refs.filter(r => r !== v)
      : [...refs, v];
    setRefs(updated);
    onChange(updated);
  };

  return (
    <div>
      <label>Reference</label><br />
      <input type="checkbox" onChange={() => toggle("Friends")} /> Friends<br />
      <input type="checkbox" onChange={() => toggle("Social Media")} /> Social Media <br />
      <input type="checkbox" onChange={() => toggle("Website")} /> Website<br />
      <input type="checkbox" onChange={() => toggle("Walk-in")} /> Walk-in<br />
      <input type="checkbox" onChange={() => toggle("Google Search")} /> Google Search  <br />
    </div>
  );
};
