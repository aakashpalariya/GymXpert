"use client"
import { addGymDetails } from "@/app/_services/gym.service";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Radio from "@/components/form/input/Radio";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { CalenderIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

export default function AddGym() {

    const [address, setAddress] = useState("");
    const [planOption, setPlanOption] = useState<string>("Free");

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [contactNumber, setContact] = useState("");
    const [email, setEmail] = useState("");

    const [gender, setGender] = useState("");
    const [fName, setFirstName] = useState("");
    const [mName, setMiddleName] = useState("");
    const [lName, setLastName] = useState("");
    const [dob, setDOB] = useState<Date | null | string>("");
    const [mobileNumber, setMobile] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const planChange = (value: string) => {
        setPlanOption(value);
    };

    const states = [
        { value: "Uttarakhand", label: "Uttarakhand" },
        { value: "Delhi", label: "Delhi" },
        { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    ];

    const genders = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const gym: Gym = {
            gymId: 0,
            name: name,
            address: address,
            city: city,
            state: state,
            contactNumber: contactNumber,
            email: email,
            isActive: true,
            isDeleted: false,
            joinedDate: null
        };
        const gymId = await addGymDetails(gym);
        if (gymId > 0) {
            toast.success('Gym details added successfully!');
        } else {
            toast.error('Failed to add gym details!');
        }
    };

    const handleSelectState = (value: string) => {
        setState(value);
    };

    function handleGenderState(value: string): void {
        setGender(value);
    }

    return (
        <div>

            <ComponentCard title="Add Gym">
                <Form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div>
                                <Label htmlFor="gymName">Gym Name</Label>
                                <Input type="text" value={name} placeholder="Your gym name" id="gymName" onChange={(e) => setName(e.target.value)} />
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
                                <Input type="text" value={city} placeholder="City" id="city" onChange={(e) => setCity(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-12">
                            <div className="grid gap-6 sm:col-span-7">
                                <div>
                                    <div>
                                        <Label>Address</Label>
                                        <TextArea
                                            value={address}
                                            onChange={(value) => setAddress(value)}
                                            rows={6}
                                            placeholder="Enter description about the Gym"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6 sm:col-span-5">
                                <div>
                                    <Label htmlFor="contact">Contact Number</Label>
                                    <Input type="text" value={contactNumber} placeholder="9876543210" id="contact" onChange={(e) => setContact(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="text" value={email} placeholder="info@yourgym.com" id="email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                        </div>


                        <div className="grid gap-6 sm:grid-cols-12">
                            <div className="grid gap-6 sm:col-span-12">
                                <div className="flex items-center gap-3 col-span-full">
                                    <Label className="m-0">Select Plan:</Label>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <Radio
                                            id="Free"
                                            name="planSelect"
                                            value="Free"
                                            label="Free"
                                            checked={planOption === "Free"}
                                            onChange={planChange}
                                        />
                                        <Radio
                                            id="Base"
                                            name="planSelect"
                                            value="Base"
                                            label="Base"
                                            checked={planOption === "Base"}
                                            onChange={planChange}
                                        />
                                        <Radio
                                            id="Ragular"
                                            name="planSelect"
                                            value="Ragular"
                                            label="Ragular"
                                            checked={planOption === "Ragular"}
                                            onChange={planChange}
                                        />
                                        <Radio
                                            id="Premium"
                                            name="planSelect"
                                            value="Premium"
                                            label="Premium"
                                            checked={planOption === "Premium"}
                                            onChange={planChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="grid gap-6 sm:grid-cols-12">
                            <div className="grid gap-6 sm:col-span-12">
                                <h3 className="text-2xl font-medium text-gray-800 dark:text-white/90">Gym Admin</h3>
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-4">
                            <div>
                                <Label htmlFor="gymFirstName">First Name</Label>
                                <Input type="text" value={fName} placeholder="First name" id="gymFirstName" onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="gymMName">Middle Name</Label>
                                <Input type="text" value={mName} placeholder="First name" id="gymMName" onChange={(e) => setMiddleName(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="gymLName">Last Name</Label>
                                <Input type="text" value={lName} placeholder="First name" id="gymLName" onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    options={genders}
                                    placeholder="--Select Gender--"
                                    onChange={handleGenderState}
                                    defaultValue={gender}
                                    className="bg-gray-50 dark:bg-gray-800"
                                />
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div>
                                <Label htmlFor="datePicker">Date of Birth</Label>
                                <div className="relative">
                                    {/* <Flatpickr
                                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                        value={dob || undefined}
                                        placeholder="Date of birth"
                                        onChange={(selectedDate) => setDOB(selectedDate[0])}
                                        options={{ dateFormat: 'd M, Y' }}
                                    /> */}
                                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                        <CalenderIcon />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="contact">Mobile Number</Label>
                                <Input type="text" value={mobileNumber} placeholder="9876543210" id="contact" onChange={(e) => setMobile(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" value={userEmail} placeholder="info@yourgym.com" id="email" onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-12">
                            <div className="grid gap-6 sm:col-span-12">
                                <div className="flex gap-3 justify-end">
                                    <Button size="sm">Save Changes</Button>
                                    <Link className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300" href={"/gyms"} >Back </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </Form>
            </ComponentCard>
            <Toaster />
        </div>

    )
}
