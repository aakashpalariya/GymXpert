"use client";
import { useEffect, useState } from 'react'
import PlanCard from '@/components/plan/PlanCard'
import { getPlanDetails } from "@/app/_services/plan.service";

export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadPlans = async () => {
        try {
            const plan = await getPlanDetails();
            setPlans(plan);
        } catch (err) {
            setError("Failed to load gym details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlans();
    }, [])
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div className="text-gray-900 dark:text-gray-100 transition">
            <div className="mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Available Plans</h1>

                <div className="flex flex-col space-y-6">
                    {plans.map((plan) => (
                        <PlanCard key={plan.planId} plan={plan} />
                    ))}
                </div>
            </div>
        </div>
    )
}
