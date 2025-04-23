interface RegisterWizard {
  personalInfo: PersonalInfo;
  gymInfo: GymInfo;
  operatingDetails: OperatingDetails;
  facilitiesServices: FacilitiesServices;
  gymDoc: GymDocuments;
}

interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  mobileNumber: string;
  email: string;
}

interface GymInfo {
  gymName: string;
  address: string;
  city: string;
  state: string;
  contactNumber: string;
  email: string;
}
interface OperatingDetails {
  days: string[]; // e.g. ['Monday', 'Wednesday']
  morningOpen: string; // time format 'HH:MM'
  morningClose: string;
  eveningOpen: string;
  eveningClose: string;
  fee: string | number; // monthly subscription fee
}

interface FacilitiesServices {
  facilities: string[]; // e.g. ['Cardio', 'Locker']
  services: string[];   // e.g. ['Personal Training']
}

interface GymDocuments {
  gymLogo: File | null;
  gstDoc: File | null;
}