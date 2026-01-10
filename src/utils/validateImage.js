import { Upload } from "antd";

export const validateImage = (file) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowed.includes(file.type)) {
    alert("Only JPG / PNG allowed");
    return Upload.LIST_IGNORE;
  }

  if (file.size / 1024 / 1024 > 2) {
    alert("Image must be below 2MB");
    return Upload.LIST_IGNORE;
  }

  return false; // stop auto upload
};
