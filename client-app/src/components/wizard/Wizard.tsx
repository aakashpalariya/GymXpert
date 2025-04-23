'use client';

import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';
import Button from '../ui/button/Button';

interface WizardProps<T = { [key: string]: any }> {
    steps: ReactNode[];
    stepLabels: string[];
    canFinish?: boolean;
    formData?: T;
    setFormData?: (data: T) => void;
    onFinish: () => void;
}

const Wizard = <T,>({ steps, stepLabels, canFinish, formData, setFormData, onFinish }: WizardProps<T>) => {
    const [currentStep, setCurrentStep] = useState(0);

    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    const goToStep = (index: number) => {
        setCurrentStep(index);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
            {/* Step Indicators */}
            <div className="relative flex items-center justify-between mb-12">
                {/* Progress Bar Background */}
                {/* Progress Bar Background */}
                <div
                    className="absolute top-5 z-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                    style={{
                        left: `calc((100% / ${steps.length}) / 2)`,
                        width: `calc(100% - (100% / ${steps.length}))`,
                    }}
                />

                {/* Active Progress Fill */}
                <div
                    className="absolute top-5 z-10 h-1 bg-blue-600 rounded-full transition-all duration-500"
                    style={{
                        left: `calc((100% / ${steps.length}) / 2)`,
                        width: `calc((100% / ${steps.length}) * ${currentStep})`,
                    }}
                />


                {/* Step Circles */}
                {steps.map((_, index) => (
                    <div key={index} className="z-20 flex flex-col items-center w-full">
                        <button
                            onClick={() => goToStep(index)}
                            className={classNames(
                                'w-10 h-10 flex items-center justify-center rounded-full border-4 text-sm font-semibold transition-all duration-300',
                                {
                                    // Active step
                                    'bg-blue-600 text-white border-blue-600 shadow-lg': index === currentStep,

                                    // Completed steps
                                    'bg-green-500 text-white border-blue-600': index < currentStep,

                                    // Future steps
                                    'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600': index > currentStep,
                                }
                            )}
                        >

                            {index + 1}
                        </button>
                        <span className="mt-2 text-xs text-center text-gray-700 dark:text-gray-300 max-w-[90px]">
                            {stepLabels[index] ?? `Step ${index + 1}`}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="transition-opacity duration-300 ease-in-out mb-10">
                {steps[currentStep]}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
                <Button size="sm"
                    onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                    disabled={isFirstStep}
                >
                    Back
                </Button>
                <Button
                    onClick={() => {
                        if (isLastStep) {
                            if (canFinish) onFinish();
                        } else {
                            setCurrentStep((prev) => prev + 1);
                        }
                    }}
                    disabled={isLastStep ? !canFinish : false}
                >
                    {isLastStep ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>

    );
};

export default Wizard;
