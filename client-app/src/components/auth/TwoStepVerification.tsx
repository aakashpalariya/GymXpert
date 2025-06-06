"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Form from "../form/Form";

export default function TwoStepVerificationForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !inputRefs.current[index]?.value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const otp = inputRefs.current.map((input) => input?.value).join('');
        console.log('Entered OTP:', otp);
        // You can now send this OTP to the server or perform any action
    };

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Two Step Verification
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            A verification code has been sent to your mobile. Please enter it in the field below.
                        </p>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        Type your 6 digits security code
                                    </Label>
                                    <div className="flex gap-2 sm:gap-4" id="otp-container">
                                        {Array.from({ length: 6 }, (_, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength={1}
                                                ref={(el) => {
                                                    inputRefs.current[index] = el; // Assigning ref
                                                }}
                                                className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                                onChange={(e) => handleChange(index, e)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                            />
                                        ))}
                                    </div>
                                    {/* <div className="flex gap-2 sm:gap-4" id="otp-container">
                                        <input type="text" maxLength={1} className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                        <input type="text" maxLength={1} className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                        <input type="text" maxLength={1} className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                        <input type="text" maxLength={1} className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                        <input type="text" maxLength={1} className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                        <input type="text" maxLength={1} className="dark:bg-dark-900 otp-input h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div> */}
                                </div>
                                <div>
                                    <Button className="w-full" size="sm">
                                        Verify My Account
                                    </Button>
                                </div>
                            </div>
                        </Form>

                        <div className="mt-5">
                            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                                Didn't get the Code?
                                <Link
                                    href="/"
                                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    Resend
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
