import React from 'react'

const PlanCard = ({ plan }: { plan: Plan }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                {plan.planName} — ₹{plan.monthlyPrice.toFixed(2)}/mo
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                <div className="flex flex-wrap gap-3 mb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white px-4 py-1 rounded-full text-sm font-medium">
                        👥 Max Members: <strong>{plan.maxMembers}</strong>
                    </div>
                    <div className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-white px-4 py-1 rounded-full text-sm font-medium">
                        🧑‍💼 Gym Admins: <strong>{plan.maxGymAdmins}</strong>
                    </div>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Features:
                    </h3>

                    {plan.features.split(',').map((feature, index) => (
                        <span
                            key={index}
                            className="inline-block bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white px-3 py-1 rounded-full text-xs font-medium hover:brightness-95 dark:hover:brightness-110 transition"
                        >
                            {feature.trim()}
                        </span>
                    ))}
                </div>

            </div>
            <table className="w-full mt-4 text-sm border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <tr>
                        <th className="p-2 text-left">Duration</th>
                        <th className="p-2 text-left">Discount (%)</th>
                        <th className="p-2 text-left">Total Price (₹)</th>
                        <th className="p-2 text-left">Per Month (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {plan.durations.map(d => (
                        <tr key={d.durationId} className="border-t border-gray-200 dark:border-gray-700">
                            <td className="p-2">{d.durationMonths} month(s)</td>
                            <td className="p-2">{d.discountPercent.toFixed(0)}%</td>
                            <td className="p-2">₹{d.totalPrice.toFixed(2)}</td>
                            <td className="p-2">₹{(d.totalPrice / d.durationMonths).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlanCard
