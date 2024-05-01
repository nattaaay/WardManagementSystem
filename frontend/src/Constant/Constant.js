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

export const allWards = [
  { id: "1", ward_number: "1" },
  { id: "2", ward_number: "2" },
  { id: "3", ward_number: "3" },
  { id: "4", ward_number: "4" },
  { id: "5", ward_number: "5" },
  { id: "6", ward_number: "6" },
  { id: "7", ward_number: "7" },
  { id: "8", ward_number: "8" },
  { id: "9", ward_number: "9" },
  { id: "10", ward_number: "10" },
];

export const allBeds = [
  { id: "1", bed_number: "1" },
  { id: "2", bed_number: "2" },
  { id: "3", bed_number: "3" },
  { id: "4", bed_number: "4" },
  { id: "5", bed_number: "5" },
  { id: "6", bed_number: "6" },
  { id: "7", bed_number: "7" },
  { id: "8", bed_number: "8" },
  { id: "9", bed_number: "9" },
  { id: "11", bed_number: "11" },
  { id: "12", bed_number: "12" },
  { id: "13", bed_number: "13" },
  { id: "14", bed_number: "14" },
  { id: "15", bed_number: "15" },
  { id: "16", bed_number: "16" },
  { id: "17", bed_number: "17" },
  { id: "18", bed_number: "18" },
  { id: "19", bed_number: "18" },
  { id: "20", bed_number: "20" },
  { id: "21", bed_number: "21" },
  { id: "22", bed_number: "22" },
  { id: "23", bed_number: "23" },
  { id: "24", bed_number: "24" },
  { id: "25", bed_number: "25" },
  { id: "26", bed_number: "26" },
  { id: "27", bed_number: "27" },
  { id: "28", bed_number: "28" },
  { id: "29", bed_number: "29" },
  { id: "30", bed_number: "30" },
];
