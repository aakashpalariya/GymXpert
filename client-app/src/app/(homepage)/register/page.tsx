'use client';

import { useState } from 'react';
import Wizard from '@/components/wizard/Wizard';
import Form from '@/components/form/Form';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import Radio from '@/components/form/input/Radio';
import Checkbox from '@/components/form/input/Checkbox';

export default function HomePage() {
  // const [wizard, setWizardData] = useState<{ [key: string]: any }>({});
  // const [wizard, setWizardData] = useState<RegisterWizard>();
  const [state, setState] = useState("");

  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };
  const [wizard, setWizardData] = useState<DeepPartial<RegisterWizard>>({});
  const states = [
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "Delhi", label: "Delhi" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  ];

  const handleSelectState = (value: string) => {
    setState(value);
  };

  const handleFinish = () => {
    console.log('Collected Form Data:', wizard);
    console.log('Collected Form Data:', wizard.operatingDetails);
  };

  const stepLabels = ['Personal Info', 'Gym Details', 'Operating Details', 'Facilities & Services', 'Documents', 'Review'];

  const canFinish =
    !!wizard?.personalInfo?.firstName?.trim() &&
    !!wizard.operatingDetails?.fee;

  const steps = [
    // Step 1: Personal Info
    <div key="1">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Personal Info</h2>

      <Form onSubmit={handleFinish}>
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
      </Form>
    </div>,

    // Step 2: Gym Details
    <div key="2">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Gym Details</h2>
      <Form onSubmit={handleFinish}>
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
        </div>
      </Form>
    </div>,

    // Step 3: Operating Details
    <div key="3">
      <h2 className="text-2xl font-semibold mb-4">Step 3: Operating Details</h2>
      <Form onSubmit={handleFinish}>
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

          {/* Morning Timing */}
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <Label htmlFor="morningOpen">Morning Open</Label>
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
            </div>
            <div>
              <Label htmlFor="morningClose">Morning Close</Label>
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
            </div>
          </div>

          {/* Evening Timing */}
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <Label htmlFor="eveningOpen">Evening Open</Label>
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
            </div>
            <div>
              <Label htmlFor="eveningClose">Evening Close</Label>
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
      </Form>
    </div>,

    // Step 4: Facilities & Services
    <div key="4">
      <h2 className="text-2xl font-semibold mb-4">Step 4: Facilities & Services</h2>
      <Form onSubmit={handleFinish}>
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
      </Form>
    </div>,

    // Step 5: Documents
    <div key="5">
      <h2 className="text-2xl font-semibold mb-4">Step 5: Upload Documents</h2>
      <form className="space-y-4">
        <div>
          <label>Gym Logo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setWizardData({
                ...wizard,
                gymDoc: {
                  ...wizard.gymDoc,
                  gymLogo: e.target.files?.[0],
                },
              })
            }
          />
        </div>
        <div>
          <label>GST IN Document:</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) =>
              setWizardData({
                ...wizard,
                gymDoc: {
                  ...wizard.gymDoc,
                  gstDoc: e.target.files?.[0],
                },
              })
            }
          />
        </div>
      </form>
    </div>,

    // Step 6: Review
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

        <h3 className="font-medium mt-4">Operating Details</h3>
        <p><strong>Days Open:</strong> {(wizard.operatingDetails?.days || []).join(', ')}</p>
        <p><strong>Morning Timing:</strong> {wizard.operatingDetails?.morningOpen} - {wizard.operatingDetails?.morningClose}</p>
        <p><strong>Evening Timing:</strong> {wizard.operatingDetails?.eveningOpen} - {wizard.operatingDetails?.eveningClose}</p>
        <p><strong>Monthly Fee:</strong> ₹{wizard.operatingDetails?.fee}</p>

        <h3 className="font-medium mt-4">Facilities & Services</h3>
        <p><strong>Facilities:</strong> {(wizard.facilitiesServices?.facilities || []).join(', ')}</p>
        <p><strong>Additional Services:</strong> {(wizard.facilitiesServices?.services || []).join(', ')}</p>

        <h3 className="font-medium mt-4">Documents</h3>
        <p><strong>Gym Logo:</strong> {wizard.gymDoc?.gymLogo?.name || 'Not uploaded'}</p>
        <p><strong>GST Doc:</strong> {wizard.gymDoc?.gstDoc?.name || 'Not uploaded'}</p>

        <p className="italic text-gray-500 dark:text-gray-400">* Please verify all details before submitting.</p>
      </div>
    </div>,
  ];

  return (
    <main className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors min-h-screen p-10">
      <Wizard<RegisterWizard>
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

    </main>
  );
}
