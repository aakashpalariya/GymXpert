'use client';

import { useEffect, useRef, useState } from 'react';
import Wizard from '@/components/wizard/Wizard';
import Form from '@/components/form/Form';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import Radio from '@/components/form/input/Radio';
import Checkbox from '@/components/form/input/Checkbox';
import { CalenderIcon, TimeIcon } from '@/icons';
import "flatpickr/dist/flatpickr.min.css"; // Import styles
import FileInput from '@/components/form/input/FileInput';
import TextArea from '@/components/form/input/TextArea';
import { addGymDetails, registerAsGym, registerGym } from '@/app/_services/gym.service';


export default function HomePage() {
  const [wizard, setWizardData] = useState<TempWizard>({
    operatingDetails: {
      days: [],
      morningOpen: '',
      morningClose: '',
      eveningOpen: '',
      eveningClose: '',
      fee: '',
    },
    gymDoc: {
      gymLogo: null,
    }
  });
  const [state, setState] = useState("");

  const handleSelectState = (value: string) => {
    setState(value);
  };

  const handleDayToggle = (day: string, checked: boolean) => {
    setWizardData((prev) => {
      const days = new Set(prev?.operatingDetails?.days ?? []);
      if (checked) {
        days.add(day);
      } else {
        days.delete(day);
      }
      return {
        ...prev,
        operatingDetails: {
          ...prev?.operatingDetails,
          days: Array.from(days),
        },
      };
    });
  };


  const handleFinish = async () => {
    if (canFinish) {

      const formData = new FormData();

      formData.append('fee', wizard.operatingDetails.fee.toString());
      wizard.operatingDetails.days.forEach(day => {
        formData.append('Days', day);  // 'Days' is the field name in C#
      });
      formData.append('morningOpen', wizard.operatingDetails.morningOpen);
      formData.append('morningClose', wizard.operatingDetails.morningClose);

      if (wizard.gymDoc.gymLogo) {
        formData.append('gymLogo', wizard.gymDoc.gymLogo);
      }

      //Debug: log keys and values
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch('https://localhost:5001/api/gym/register', {
        method: 'POST',
        body: formData,
      });

    }
  };

  const stepLabels = ['Operating Details', 'Documents'];

  const canFinish = !!wizard.operatingDetails.fee && !!wizard.gymDoc.gymLogo;

  const handleGymLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setWizardData((prev) => ({
        ...prev,
        gymDoc: {
          ...prev?.gymDoc,
          gymLogo: file,
        },
      }));
    }
  };


  const steps = [


    <div key="3">
      <h2 className="text-2xl font-semibold mb-4">Step 3: Operating Details</h2>
      <div className="grid gap-6">

        {/* Days Open */}
        <div>
          <Label className="font-medium">Days Open</Label>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {

              return (
                <Checkbox
                  key={day}
                  label={day}
                  checked={wizard?.operatingDetails?.days.includes(day) ?? false}
                  onChange={(checked) => handleDayToggle(day, checked)}
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
                value={wizard?.operatingDetails?.morningOpen ?? ''}
                onChange={(e) =>
                  setWizardData((prev) => ({
                    ...prev,
                    operatingDetails: {
                      ...prev?.operatingDetails,
                      morningOpen: e.target.value,
                    },
                  }))
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
                value={wizard?.operatingDetails?.morningClose ?? ''}
                onChange={(e) =>
                  setWizardData((prev) => ({
                    ...prev,
                    operatingDetails: {
                      ...prev?.operatingDetails,
                      morningClose: e.target.value,
                    },
                  }))
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
            value={wizard?.operatingDetails?.fee ?? ''}
            onChange={(e) =>
              setWizardData((prev) => ({
                ...prev,
                operatingDetails: {
                  ...prev?.operatingDetails,
                  fee: e.target.value,
                },
              }))
            }
          />

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
      </div>
    </div>,

  ];

  return (
    <main className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors min-h-screen p-10">
      <Form onSubmit={handleFinish} isEncType={true} encTypeVal='multipart/form-data'>

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
