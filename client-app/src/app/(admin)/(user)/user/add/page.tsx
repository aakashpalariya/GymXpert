"use client"
import { addGymDetails, getGymDDL } from "@/app/_services/gym.service";
import { addMemberDetails } from "@/app/_services/member.service";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Radio from "@/components/form/input/Radio";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { CalenderIcon } from "@/icons";
import { Instance } from "flatpickr/dist/types/instance";
import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker from "react-flatpickr";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import toast, { Toaster } from "react-hot-toast";


export default function AddGym() {
    const [planOption, setPlanOption] = useState<string>("Free");
    const [date, setDate] = useState<Date | null | string>("");

    const [gymSelect, setGymSelect] = useState<SelectItem<string>[]>([]);
    const [gymId, setGym] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isDark, setIsDark] = useState(false);


    // const [show, setShow] = useState <boolean>(false);

    const [fName, setFirstName] = useState("");
    const [mName, setMiddleName] = useState("");
    const [lName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [mobileNumber, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");

    const planChange = (value: string) => {
        setPlanOption(value);
    };


    useEffect(() => {
        const loadGymSelect = async () => {
            try {
                const data = await getGymDDL();
                const items: SelectItem<string>[] = data.map(item => ({
                    label: item.label,
                    value: item.value.toString()
                }));
                setGymSelect(items);
            } catch (err) {
                setError("Failed to load select details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadGymSelect();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    function handleSelectGym(value: string): void {
        console.log(value);
        setGym(value);
    }

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
        const member: Member = {
            memberId: 0,
            firstName: fName,
            lastName: lName,
            middleName: mName,
            userName: "",
            gender: gender,
            city: city,
            state: state,
            mobileNumber: mobileNumber,
            email: email,
            address: address,
            dateOfBirth: date ? new Date(date) : null
        };
        console.log(member);
        const isAdded = await addMemberDetails(member, gymId);
        if (isAdded) {
            toast.success('Member added to gym successfully!');
        } else {
            toast.error('Failed to add member details!');
        }
    };

    const handleSelectState = (value: string) => {
        setState(value);
    };

    function handleGenderState(value: string): void {
        setGender(value);
    }

    function changeDob(value: string): void {
        console.log(value);
    }


    // function handleDateChange(dates: Date[], currentDateString: string, self: Instance, data?: any): void {
    //     console.log(data);
    //     console.log(dates);
    //     console.log(currentDateString);
    //     console.log(self);
    // }

    const handleDateChange = (dates: Date[]) => {
        setSelectedDate(dates);
        console.log('Selected Date:', dates);
    };

    return (
        <div>

            <ComponentCard title="Add Gym User">
                <Form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div>
                                <Label htmlFor="state">Gym</Label>
                                <Select
                                    options={gymSelect}
                                    placeholder="--Select Gym--"
                                    onChange={handleSelectGym}
                                    defaultValue={gymId}
                                    className="bg-gray-50 dark:bg-gray-800"
                                />
                            </div>
                        </div>
                        <hr />
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
                        <div className="grid gap-6 sm:grid-cols-12">
                            <div className="grid gap-6 sm:col-span-5">
                                <div>
                                    <Label htmlFor="state">State</Label>
                                    <Select
                                        options={states}
                                        placeholder="--Select State--"
                                        onChange={handleSelectState}
                                        defaultValue={state}
                                        className="bg-gray-50 dark:bg-gray-800"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input type="text" value={city} placeholder="City" id="city" onChange={(e) => setCity(e.target.value)} />
                                </div>
                            </div>

                            <div className="grid gap-6 sm:col-span-7">
                                <div>
                                    <div>
                                        <Label>Address</Label>
                                        <TextArea
                                            value={address}
                                            onChange={(value) => setAddress(value)}
                                            rows={6}
                                            hint=""
                                            placeholder="Enter description about the Gym"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div>
                                <Label htmlFor="datePicker">Date of Birth</Label>
                                <div className="relative">
                                    {/* <DatePicker
                                        type="date"
                                        id="datePicker"
                                        name="datePicker"
                                        onChange={handleDateChange}
                                        options={{ dateFormat: 'dd-mm-yyyy' }}
                                    /> */}
                                    <Flatpickr
                                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                        value={date || undefined}
                                        placeholder="Date of birth"
                                        onChange={(selectedDate) => setDate(selectedDate[0])}
                                        options={{ dateFormat: 'd M, Y' }}
                                    />
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
                                <Input type="text" value={email} placeholder="info@yourgym.com" id="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-12">
                            <div className="grid gap-6 sm:col-span-12">
                                <div className="flex gap-3 justify-end">
                                    <Button size="sm">Save Changes</Button>
                                    <Link className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300" href={"/users"} >Back </Link>
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
