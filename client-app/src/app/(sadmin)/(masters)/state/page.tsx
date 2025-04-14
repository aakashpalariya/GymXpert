"use client";
import { useEffect, useState } from 'react';
import MasterList from '@/components/masters/MasterList';
import ComponentCard from '@/components/common/ComponentCard';
import { getStates, updateState } from '@/app/_services/master.service';
import { toast } from 'react-hot-toast';

export default function State() {
  const [data, setData] = useState<MasterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const states = await getStates();
      setData(states);
    } catch (err) {
      setError("Failed to load gym states.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    console.log("id to delete: " + id);
  };

  const handleEdit = async (item: MasterItem) => {
    console.log("upated values: " + JSON.stringify(item));

    const isUpdated = await updateState(item);

    if (isUpdated) {
      toast.success('Gym details updated successfully!', {
        className: 'toast-base toast-success',
      });
    } else {
      toast.error('Failed to update gym details!', {
        className: 'toast-base toast-error'
      });
    }
  };

  return (
    <ComponentCard title="State Details">
      <MasterList
        title="State"
        data={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </ComponentCard>
  );
}
