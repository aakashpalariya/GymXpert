interface TempWizard {
    operatingDetails: OperatingDetails;
    gymDoc: GymDocument;
  }
  interface OperatingDetails {
    days: string[]; // e.g. ['Monday', 'Wednesday']
    morningOpen: string; // time format 'HH:MM'
    morningClose: string;
    fee: string | number; // monthly subscription fee
  }
  
  
  interface GymDocument {
    gymLogo: File | null;
  }