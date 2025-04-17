'use client';

import { useState } from 'react';
import Wizard from '@/components/wizard/Wizard';

export default function HomePage() {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleFinish = () => {
    console.log('Collected Form Data:', formData);
  };

  const stepLabels = ['Personal Info', 'Contact Info', 'Review'];

  const canFinish =
    !!formData.step1?.username?.trim() &&
    !!formData.step2?.email?.trim();

  const steps = [
    <div key="1">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Personal Info</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.step1?.fullName || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              step1: {
                ...formData.step1,
                fullName: e.target.value,
              },
            })
          }
          className="input-style"
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.step1?.username || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              step1: {
                ...formData.step1,
                username: e.target.value,
              },
            })
          }
          className="input-style"
        />
      </form>
    </div>,

    <div key="2">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Contact Info</h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={formData.step2?.email || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              step2: {
                ...formData.step2,
                email: e.target.value,
              },
            })
          }
          className="input-style"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.step2?.phone || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              step2: {
                ...formData.step2,
                phone: e.target.value,
              },
            })
          }
          className="input-style"
        />
      </form>
    </div>,

    <div key="3">
      <h2 className="text-2xl font-semibold mb-4">Step 3: Review & Submit</h2>
      <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
        <p><strong>Full Name:</strong> {formData.step1?.fullName}</p>
        <p><strong>Username:</strong> {formData.step1?.username}</p>
        <p><strong>Email:</strong> {formData.step2?.email}</p>
        <p><strong>Phone:</strong> {formData.step2?.phone}</p>
        <p className="italic text-gray-500 dark:text-gray-400">* This is just a preview.</p>
      </div>
    </div>,
  ];

  return (
    <main className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors min-h-screen p-10">
      <Wizard
        steps={steps}
        stepLabels={stepLabels}
        canFinish={canFinish}
        formData={formData}
        setFormData={setFormData}
        onFinish={handleFinish}
      />
    </main>
  );
}
