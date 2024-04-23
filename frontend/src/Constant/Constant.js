export const BASE_URL = "http://127.0.0.1:5001";

export const roles = (id) => {
  if (id == "1") {
    return "Admin";
  } else if (id == "2") {
    return "Ward management team";
  } else if (id == "3") {
    return "Medical team";
  } else {
    return "";
  }
};
