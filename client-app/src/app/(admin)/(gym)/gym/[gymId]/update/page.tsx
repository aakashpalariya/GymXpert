"use client"
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Radio from "@/components/form/input/Radio";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import "../../../../../styles.css"
import { useRouter } from "next/navigation";
import { getGymDetailById, updateGymDetails } from "@/app/_services/gym.service";
import Switch from "@/components/form/switch/Switch";
import toast, { Toaster } from 'react-hot-toast';


export default function UpdateGym({
    params
}: {
    params: Promise<{ gymId: string }>;
}) {
    const { gymId } = use(params);
    const [gym, setGym] = useState<Gym>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const gymIdNumber = Number(gymId);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [contactNumber, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState(Boolean);
    const [isDeleted, setIsDeleted] = useState(Boolean);
    const [joinedDate, setJoinedDate] = useState<Date | null>(null);
    const [planOption, setPlanOption] = useState<string>("Free");

    useEffect(() => {
    }, [gym]);

    useEffect(() => {
        const loadGym = async () => {
            try {
                const data = await getGymDetailById(gymId);
                setGym(data);
                setName(data.name);
                setAddress(data.address);
                setCity(data.city);
                setState(data.state);
                setContact(data.contactNumber);
                setEmail(data.email);
                setIsActive(data.isActive);
                setIsDeleted(data.isDeleted);
                setJoinedDate(data.joinedDate ? new Date(data.joinedDate) : null);
            } catch (err) {
                setError("Failed to load gym details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadGym();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    const planChange = (value: string) => {
        setPlanOption(value);
    };

    const states = [
        { value: "Uttarakhand", label: "Uttarakhand" },
        { value: "Delhi", label: "Delhi" },
        { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    ];

    const handleSelectState = (value: string) => {
        setState(value);
    };

    const handleIsActiveChange = (checked: boolean) => {
        setIsActive(checked ? true : false);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedGym = { gymId: gymIdNumber, name, address, email, isActive, isDeleted, state, city, contactNumber, joinedDate };

        setGym(updatedGym);
        const isUpdated = await updateGymDetails(updatedGym); // Call the update function

        if (isUpdated) {
            toast.success('Gym details updated successfully!', {
                className: 'toast-base toast-success',
            });
        } else {
            toast.error('Failed to update gym details!',{
                className:'toast-base toast-error'
            });
        }
    };

    return (
        <div>
            <ComponentCard title="Update Gym">
                <Form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div>
                                <Label htmlFor="gymName">Gym Name</Label>
                                <Input type="text" value={name} placeholder="Your gym name" id="gymName" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="state">State {state}</Label>
                                <Select
                                    options={states}
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
                            <div className="grid gap-6 sm:col-span-10">
                                <div className="flex items-center gap-3 col-span-full">
                                    {/* <Label className="m-0">Membership:</Label>
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
                                    </div> */}
                                </div>
                                <div className="flex items-center gap-3 col-span-full">
                                    <Label className="m-0">Is Active:</Label>
                                    <Switch
                                        label=""
                                        defaultChecked={isActive}
                                        onChange={handleIsActiveChange}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-6 sm:col-span-2">
                                <div className="flex items-center gap-3 col-span-full">
                                    <div className="flex gap-3 justify-end">
                                        <Button size="sm">Save Changes</Button>
                                        <Link className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300" href={"/gyms"} >Back </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Form>
            </ComponentCard>
            <Toaster />
        </div>
    );
}