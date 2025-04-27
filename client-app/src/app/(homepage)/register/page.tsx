'use client';

import { useEffect, useRef, useState } from 'react';
import Wizard from '@/components/wizard/Wizard';
import Form from '@/components/form/Form';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import Checkbox from '@/components/form/input/Checkbox';
import { CalenderIcon, TimeIcon } from '@/icons';
import "flatpickr/dist/flatpickr.min.css"; // Import styles
import FileInput from '@/components/form/input/FileInput';
import TextArea from '@/components/form/input/TextArea';
import { addGymDetails, registerAsGym, registerGym } from '@/app/_services/gym.service';


export default function HomePage() {
  // const [wizard, setWizardData] = useState<{ [key: string]: any }>({});
  // const [wizard, setWizardData] = useState<RegisterWizard>();
  const [state, setState] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined); // State for date
  const [time, setTime] = useState<Date | undefined>(undefined); // State for time
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);


  const [wizard, setWizardData] = useState<RegisterWizard>({
    personalInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      mobileNumber: '',
      email: '',
    },
    gymInfo: {
      gymName: '',
      address: '',
      city: '',
      state: '',
      contactNumber: '',
      email: '',
    },
    operatingDetails: {
      days: [],
      morningOpen: '',
      morningClose: '',
      eveningOpen: '',
      eveningClose: '',
      fee: '',
    },
    facilitiesServices: {
      facilities: [],
      services: [],
    },
    gymDoc: {
      gymLogo: null,
      gstDoc: null,
    },

  });
  const states = [
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "Delhi", label: "Delhi" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  ];

  const handleSelectState = (value: string) => {
    setState(value);
  };

  const handleFinish = async () => {
    if (canFinish) {
      // const formData = new FormData();
      // formData.append('personalInfo', JSON.stringify(wizard.personalInfo)); // Add personalInfo as a JSON string
      // formData.append('gymInfo', JSON.stringify(wizard.gymInfo)); // Similarly for other objects
      // formData.append('operatingDetails', JSON.stringify(wizard.operatingDetails)); // Similarly for other objects
      // formData.append('facilitiesServices', JSON.stringify(wizard.facilitiesServices)); // Similarly for other objects
      // if (wizard.gymDoc?.gymLogo) {
      //   formData.append('gymDoc[gstDoc]', wizard.gymDoc.gymLogo);
      // }
      // if (wizard.gymDoc?.gstDoc) {
      //   formData.append('gymDoc[gstDoc]', wizard.gymDoc.gstDoc);
      // }
      const formData = new FormData();

// Personal Info
formData.append('personalInfo.FirstName', wizard.personalInfo.firstName);
// formData.append('MiddleName', wizard.personalInfo.middleName || "");
formData.set('personalInfo.MiddleName', wizard.personalInfo.middleName || "");  // Force "" even if it's empty
formData.append('personalInfo.LastName', wizard.personalInfo.lastName);
formData.append('personalInfo.Gender', "wizard.personalInfo.gender");
formData.append('personalInfo.MobileNumber', wizard.personalInfo.mobileNumber);
formData.append('personalInfo.Email', wizard.personalInfo.email);

// Gym Info
formData.append('gymInfo.GymName', wizard.gymInfo.gymName);
formData.append('gymInfo.Address', wizard.gymInfo.address);
formData.append('gymInfo.City', wizard.gymInfo.city);
formData.append('gymInfo.State', "wizard.gymInfo.state");
formData.append('gymInfo.ContactNumber', wizard.gymInfo.contactNumber);
formData.append('gymInfo.Email', wizard.gymInfo.email);

// Operating Details
formData.append('operatingDetails.Fee', wizard.operatingDetails.fee.toString());
formData.append('operatingDetails.MorningOpen', wizard.operatingDetails.morningOpen);
formData.append('operatingDetails.MorningClose', wizard.operatingDetails.morningClose);
formData.append('operatingDetails.EveningOpen', wizard.operatingDetails.eveningOpen);
formData.append('operatingDetails.EveningClose', wizard.operatingDetails.eveningClose);

// Handling Days (List)
wizard.operatingDetails.days.forEach(day => {
  formData.append('operatingDetails.Days', day); // Use 'Days[]' to handle list correctly
});

// Facilities and Services
wizard.facilitiesServices.facilities.forEach(facility => {
  formData.append('facilitiesServices.Facilities', facility); // Use 'Facilities[]'
});
wizard.facilitiesServices.services.forEach(service => {
  formData.append('facilitiesServices.Services', service); // Use 'Services[]'
});

// Documents (Files)
if (wizard.gymDoc.gymLogo) {
  formData.append('gymDoc.GymLogo', wizard.gymDoc.gymLogo);  // For files, no need for [] here
}
if (wizard.gymDoc.gstDoc) {
  formData.append('gymDoc.GstDoc', wizard.gymDoc.gstDoc);  // For files, no need for [] here
}


      // const response = await fetch('/api/your-endpoint', {
      //   method: 'POST',
      //   body: formData,
      // });
      //console.log("personalInfo " + JSON.stringify(wizard.personalInfo));
      //console.log("fullWizard " + JSON.stringify(wizard));
      //console.log("formData " + JSON.stringify(formData));
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      // const data = await registerGym(fullWizard);
      // const data2 = await registerAsGym(formData);
      // const response = await fetch('https://localhost:5001/api/gym/register', {
      //   method: 'POST',
      //   body: formData, // FormData is passed here
      // });
      console.log("jai ho!");
       const res = await registerAsGym(formData);
    }
  };

  const stepLabels = ['Personal Info', 'Gym Details', 'Operating Details', 'Facilities & Services', 'Documents', 'Review'];

  const canFinish =
    !!wizard?.personalInfo?.firstName?.trim() &&
    !!wizard.operatingDetails?.fee;

  const handleDateChange = (selectedDates: Date[]) => {
    console.log('Selected date(s):', selectedDates);
    setSelectedDate(selectedDates[0]);
  };
  // const handleGymLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     console.log("Selected file:", file.name);
  //   }
  // };
  const handleGymLogo = (event: React.ChangeEvent<HTMLInputElement>) => {    // Now, you can use the file object to update your state or do other operations.
    const file = event.target.files?.[0];  // For single file uploads

    if (file) {    // Update state if needed
      console.log('Uploaded file:', file);  // Log or process the file here

      setWizardData({
        ...wizard,
        gymDoc: {
          ...wizard.gymDoc,
          gymLogo: file,  // Assuming you're storing the file object in gymLogo
        },
      });
    }
  };

  const handleGSTInDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];  // For single file uploads

    if (file) {    // Update state if needed
      console.log('Uploaded file:', file);  // Log or process the file here

      setWizardData({
        ...wizard,
        gymDoc: {
          ...wizard.gymDoc,
          gstDoc: file,  // Assuming you're storing the file object in gymLogo
        },
      });
    }
  };

  const steps = [

    <div key="1">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Personal Info</h2>

      <div className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={wizard?.personalInfo?.firstName || ''}
              onChange={(e) =>
                setWizardData({
                  ...wizard,
                  personalInfo: {
                    ...wizard?.personalInfo,
                    firstName: e.target.value,
                  },
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={wizard?.personalInfo?.lastName || ''}
              onChange={(e) =>
                setWizardData({
                  ...wizard,
                  personalInfo: {
                    ...wizard?.personalInfo,
                    lastName: e.target.value,
                  },
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Contact Email"
              value={wizard?.personalInfo?.email || ''}
              onChange={(e) =>
                setWizardData({
                  ...wizard,
                  personalInfo: {
                    ...wizard.personalInfo,
                    email: e.target.value,
                  },
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="mobileNumber">Phone Number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="Phone Number"
              value={wizard?.personalInfo?.mobileNumber || ''}
              onChange={(e) =>
                setWizardData({
                  ...wizard,
                  personalInfo: {
                    ...wizard.personalInfo,
                    mobileNumber: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>,

    <div key="2">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Gym Details</h2>
      <div className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="gymName">Gym Name</Label>
            <Input type="text" value={wizard.gymInfo?.gymName} placeholder="Your gym name" id="gymName" onChange={(e) =>
              setWizardData({
                ...wizard,
                gymInfo: {
                  ...wizard.gymInfo,
                  gymName: e.target.value,
                },
              })
            } />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Select
              options={states}
              placeholder="--Select State--"
              onChange={handleSelectState}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input type="text" value={wizard.gymInfo?.city} placeholder="City" id="city" onChange={(e) =>
              setWizardData({
                ...wizard,
                gymInfo: {
                  ...wizard.gymInfo,
                  city: e.target.value,
                },
              })
            } />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-12">
          <div className="grid gap-6 sm:col-span-7">
            <div>
              <Label htmlFor="Address">Address</Label>
              <TextArea
                value={wizard.gymInfo?.address}
                onChange={(value: string) => {
                  setWizardData({
                    ...wizard,
                    gymInfo: {
                      ...wizard.gymInfo,
                      address: value,
                    },
                  });
                }}
                rows={6}
                placeholder="Enter description about the Gym"
              />


            </div>
          </div>
          <div className="grid gap-6 sm:col-span-5">
            <div>
              <Label htmlFor="cnumber">Contact Number</Label>
              <Input type="text" value={wizard.gymInfo?.contactNumber} placeholder="Gym contact number" id="cnumber" onChange={(e) =>
                setWizardData({
                  ...wizard,
                  gymInfo: {
                    ...wizard.gymInfo,
                    contactNumber: e.target.value,
                  },
                })
              } />
            </div>
            <div>
              <Label htmlFor="gymemail">Gym Email</Label>
              <Input type="text" value={wizard.gymInfo?.email} placeholder="Gym email" id="gymemail" onChange={(e) =>
                setWizardData({
                  ...wizard,
                  gymInfo: {
                    ...wizard.gymInfo,
                    email: e.target.value,
                  },
                })
              } />
            </div>
          </div>

        </div>
      </div>
    </div>,

    <div key="3">
      <h2 className="text-2xl font-semibold mb-4">Step 3: Operating Details</h2>
      <div className="grid gap-6">

        {/* Days Open */}
        <div>
          <Label className="font-medium">Days Open</Label>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
              const selected = wizard.operatingDetails?.days || [];
              const isChecked = selected.includes(day);

              return (
                <Checkbox
                  key={day}
                  id={`facility-${day}`}
                  label={day}
                  checked={isChecked}
                  onChange={(checked: boolean) => {
                    const selected = wizard.operatingDetails?.days || [];
                    const updated = checked
                      ? [...selected, day]
                      : selected.filter((s) => s !== day);

                    setWizardData({
                      ...wizard,
                      operatingDetails: {
                        ...wizard.operatingDetails,
                        days: updated,
                      },
                    });
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Timing */}
        <div className="grid gap-2 sm:grid-cols-4">
          <div>
            <Label htmlFor="morningOpen">Morning Open</Label>
            <div className="relative">
              <Input
                id="morningOpen"
                type="time"
                value={wizard.operatingDetails?.morningOpen || ''}
                onChange={(e) =>
                  setWizardData({
                    ...wizard,
                    operatingDetails: {
                      ...wizard.operatingDetails,
                      morningOpen: e.target.value,
                    },
                  })
                }
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon />
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="morningClose">Morning Close</Label>
            <div className="relative">
              <Input
                id="morningClose"
                type="time"
                value={wizard.operatingDetails?.morningClose || ''}
                onChange={(e) =>
                  setWizardData({
                    ...wizard,
                    operatingDetails: {
                      ...wizard.operatingDetails,
                      morningClose: e.target.value,
                    },
                  })
                }
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon />
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="eveningOpen">Evening Open</Label>
            <div className="relative">
              <Input
                id="eveningOpen"
                type="time"
                value={wizard.operatingDetails?.eveningOpen || ''}
                onChange={(e) =>
                  setWizardData({
                    ...wizard,
                    operatingDetails: {
                      ...wizard.operatingDetails,
                      eveningOpen: e.target.value,
                    },
                  })
                }
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon />
              </span>
            </div>



          </div>
          <div>
            <Label htmlFor="eveningClose">Evening Close</Label>
            <div className="relative">
              <Input
                id="eveningClose"
                type="time"
                value={wizard.operatingDetails?.eveningClose || ''}
                onChange={(e) =>
                  setWizardData({
                    ...wizard,
                    operatingDetails: {
                      ...wizard.operatingDetails,
                      eveningClose: e.target.value,
                    },
                  })
                }
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon />
              </span>
            </div>
          </div>
        </div>

        {/* Subscription Fee */}
        <div>
          <Label htmlFor="fee">Monthly Subscription Fee</Label>
          <Input
            id="fee"
            type="number"
            placeholder="Monthly Subscription Fee"
            value={wizard.operatingDetails?.fee || ''}
            onChange={(e) =>
              setWizardData({
                ...wizard,
                operatingDetails: {
                  ...wizard.operatingDetails,
                  fee: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
    </div>,

    <div key="4">
      <h2 className="text-2xl font-semibold mb-4">Step 4: Facilities & Services</h2>
      <div className="grid gap-6">

        {/* Facilities */}
        <div>
          <Label className="font-medium">Facilities</Label>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            {[
              "Weight Training",
              "Cardio",
              "Group Classes",
              "Swimming pool",
              "Sauna",
              "Steam bath",
              "Locker",
            ].map((item) => {
              const selected = wizard.facilitiesServices?.facilities || [];
              const isChecked = selected.includes(item);

              return (
                <Checkbox
                  key={item}
                  id={`facility-${item}`}
                  label={item}
                  checked={isChecked}
                  onChange={(checked: boolean) => {
                    const selected = wizard.facilitiesServices?.facilities || [];
                    const updated = checked
                      ? [...selected, item]
                      : selected.filter((s) => s !== item);

                    setWizardData({
                      ...wizard,
                      facilitiesServices: {
                        ...wizard.facilitiesServices,
                        facilities: updated,
                      },
                    });
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <Label className="font-medium">Additional Services</Label>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            {['Personal Training', 'Nutrition Counseling', 'Physiotherapy'].map((item) => {
              const selected = wizard.facilitiesServices?.services || [];
              const isChecked = selected.includes(item);
              return (
                <Checkbox
                  key={item}
                  id={`service-${item}`}
                  label={item}
                  checked={isChecked}
                  onChange={(checked: boolean) => {
                    const selected = wizard.facilitiesServices?.services || [];

                    const updated = checked
                      ? [...selected, item]
                      : selected.filter((s) => s !== item);

                    setWizardData({
                      ...wizard,
                      facilitiesServices: {
                        ...wizard.facilitiesServices,
                        services: updated,
                      },
                    });
                  }}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>,

    <div key="5">
      <h2 className="text-2xl font-semibold mb-4">Step 5: Upload Documents</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label>Gym Logo:</Label>
          <FileInput onChange={handleGymLogo} className="custom-class" />
          {wizard.gymDoc?.gymLogo && (
            <Label>Uploaded file: <span className="mt-2 text-xs text-center text-gray-700 dark:text-gray-300 max-w-[90px]">{wizard.gymDoc.gymLogo.name}</span></Label>
          )}
        </div>
        <div>
          <Label>GST IN Document:</Label>
          <FileInput onChange={handleGSTInDoc} className="custom-class" />
          {wizard.gymDoc?.gstDoc && (
            <Label>Uploaded file: <span className="mt-2 text-xs text-center text-gray-700 dark:text-gray-300 max-w-[90px]">{wizard.gymDoc.gstDoc.name}</span></Label>
          )}
        </div>
      </div>
    </div>,

    <div key="6">
      <h2 className="text-2xl font-semibold mb-4">Step 6: Review & Submit</h2>
      <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
        <h3 className="font-medium">Personal Info</h3>
        <p><strong>First Name:</strong> {wizard.personalInfo?.firstName}</p>
        <p><strong>Last Name:</strong> {wizard.personalInfo?.lastName}</p>
        <p><strong>Email:</strong> {wizard.personalInfo?.email}</p>
        <p><strong>Phone:</strong> {wizard.personalInfo?.mobileNumber}</p>

        <h3 className="font-medium mt-4">Gym Details</h3>
        {/* {[
          'gymName', 'gymAddress', 'gymContact', 'city', 'state', 'pinCode', 'website', 'gst', 'email', 'pan'
        ].map((key) => (
          <p key={key}>
            <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {wizard.gymInfo?.[key]}
          </p>
        ))} */}

        {/* <h3 className="font-medium mt-4">Operating Details</h3>
        <p><strong>Days Open:</strong> {(wizard.operatingDetails?.days || []).join(', ')}</p>
        <p><strong>Morning Timing:</strong> {wizard.operatingDetails?.morningOpen} - {wizard.operatingDetails?.morningClose}</p>
        <p><strong>Evening Timing:</strong> {wizard.operatingDetails?.eveningOpen} - {wizard.operatingDetails?.eveningClose}</p>
        <p><strong>Monthly Fee:</strong> ₹{wizard.operatingDetails?.fee}</p> */}

        <h3 className="font-medium mt-4">Facilities & Services</h3>
        <p><strong>Facilities:</strong> {(wizard.facilitiesServices?.facilities || []).join(', ')}</p>
        <p><strong>Additional Services:</strong> {(wizard.facilitiesServices?.services || []).join(', ')}</p>

        {/* <h3 className="font-medium mt-4">Documents</h3>
        <p><strong>Gym Logo:</strong> {wizard.gymDoc?.gymLogo?.name || 'Not uploaded'}</p>
        <p><strong>GST Doc:</strong> {wizard.gymDoc?.gstDoc?.name || 'Not uploaded'}</p> */}

        <p className="italic text-gray-500 dark:text-gray-400">* Please verify all details before submitting.</p>
      </div>
    </div>,

  ];

  return (
    <main className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors min-h-screen p-10">
      <Form isEncType={true} encTypeVal='multipart/form-data'>

      <Wizard
          steps={steps}
          stepLabels={stepLabels}
          canFinish={canFinish}
          formData={wizard}
          setFormData={(data) => {
            setWizardData((prev) => ({
              ...(prev ?? {}),
              ...data,
            }));
          }}
          onFinish={handleFinish}
        />
      </Form>

    </main>
  );
}
