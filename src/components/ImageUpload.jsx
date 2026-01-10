import { useRef } from "react";

export default function ImageUpload({
  label,
  file,
  setFile,
  preview,
  setPreview,
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>

      <div
        onClick={() => inputRef.current.click()}
        className="w-32 h-32 border-2 border-dashed rounded flex items-center justify-center cursor-pointer bg-gray-50"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <span className="text-gray-400 text-sm">Click to upload</span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </div>
  );
}
