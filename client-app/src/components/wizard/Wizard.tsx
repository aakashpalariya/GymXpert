'use client';

import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';

interface WizardProps {
    steps: ReactNode[];
    stepLabels?: string[];
    canFinish?: boolean;
    formData: { [key: string]: any };
    setFormData: (data: { [key: string]: any }) => void;
    onFinish: () => void;
}


const Wizard: React.FC<WizardProps> = ({ steps, stepLabels = [], canFinish = false }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    const goToStep = (index: number) => {
        setCurrentStep(index);
    };

    return (
            <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-xl p-8 transition-colors">
                {/* Step Indicators */}
                <div className="relative flex items-center justify-between mb-10">
                    {steps.map((_, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center relative">
                            {/* Connector Line to the next step */}
                            {index !== steps.length - 1 && (
                                <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-300 dark:bg-gray-700 z-0" />
                            )}

                            {/* Circle */}
                            <button
                                onClick={() => goToStep(index)}
                                className={classNames(
                                    'relative z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 mb-1',
                                    {
                                        'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-110': index === currentStep,
                                        'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600':
                                            index !== currentStep,
                                    }
                                )}
                            >
                                {index + 1}
                            </button>

                            {/* Step Label */}
                            <span className="text-xs text-center text-gray-700 dark:text-gray-300 max-w-[80px]">
                                {stepLabels[index] ?? `Step ${index + 1}`}
                            </span>
                        </div>
                    ))}
                </div>


                {/* Step Content */}
                <div className="transition-opacity duration-300 ease-in-out mb-8">
                    {steps[currentStep]}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                        disabled={isFirstStep}
                        className="px-5 py-2 rounded-lg font-medium text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-40 transition"
                    >
                        ← Back
                    </button>

                    <button
                        onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                        disabled={isLastStep ? !canFinish : false}
                        className="px-6 py-2 rounded-lg font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-40"
                    >
                        {isLastStep ? 'Finish' : 'Next →'}
                    </button>
                </div>
            </div>
    );
};

export default Wizard;
