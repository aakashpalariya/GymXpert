// components/MasterList.tsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import Badge from '../ui/badge/Badge';
import { useModal } from "../../hooks/useModal";
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import Switch from '../form/switch/Switch';

interface MasterListProps {
    title: string;
    data: MasterItem[];
    onDelete: (id: number) => void;
    onEdit: (item: MasterItem) => void;
}

const MasterList: React.FC<MasterListProps> = ({ title, data, onDelete, onEdit }) => {
    const { isOpen, openModal, closeModal } = useModal();
    const [editItem, setEditItem] = useState<MasterItem | null>(null);

    const handleEditClick = (item: MasterItem) => {
        setEditItem(item);
        openModal();
    };
    const handleSave = () => {
        console.log("Saving changes...");
        if (editItem) {
            onEdit(editItem);
        }
        closeModal();
    };
    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-800 text-start text-theme-xs dark:text-gray-200"
                                    >
                                        {title} Code
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-800 text-start text-theme-xs dark:text-gray-200"
                                    >
                                        {title} Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-800 text-start text-theme-xs dark:text-gray-200"
                                    >
                                        Is Active
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-800 text-start text-theme-xs dark:text-gray-200"
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {data.map(item => (
                                    <TableRow key={`${item.id}`}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.code}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {item.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <Badge
                                                size="sm"
                                                color={
                                                    item.isActive === true
                                                        ? "success"
                                                        : "error"
                                                }
                                            >
                                                {item.isActive === true ? "Active" : "InActive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <div className="flex">
                                                <div className="px-2 py-2">
                                                    <svg onClick={() => handleEditClick(item)} className="cursor-pointer hover:fill-error-500 dark:hover:fill-error-500 fill-gray-700 dark:fill-gray-400" width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill=""></path>
                                                    </svg>
                                                </div>
                                                <div className="px-2 py-2">
                                                    <svg onClick={() => onDelete(item.id)} className="cursor-pointer hover:fill-error-500 dark:hover:fill-error-500 fill-gray-700 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.54142 3.7915C6.54142 2.54886 7.54878 1.5415 8.79142 1.5415H11.2081C12.4507 1.5415 13.4581 2.54886 13.4581 3.7915V4.0415H15.6252H16.666C17.0802 4.0415 17.416 4.37729 17.416 4.7915C17.416 5.20572 17.0802 5.5415 16.666 5.5415H16.3752V8.24638V13.2464V16.2082C16.3752 17.4508 15.3678 18.4582 14.1252 18.4582H5.87516C4.63252 18.4582 3.62516 17.4508 3.62516 16.2082V13.2464V8.24638V5.5415H3.3335C2.91928 5.5415 2.5835 5.20572 2.5835 4.7915C2.5835 4.37729 2.91928 4.0415 3.3335 4.0415H4.37516H6.54142V3.7915ZM14.8752 13.2464V8.24638V5.5415H13.4581H12.7081H7.29142H6.54142H5.12516V8.24638V13.2464V16.2082C5.12516 16.6224 5.46095 16.9582 5.87516 16.9582H14.1252C14.5394 16.9582 14.8752 16.6224 14.8752 16.2082V13.2464ZM8.04142 4.0415H11.9581V3.7915C11.9581 3.37729 11.6223 3.0415 11.2081 3.0415H8.79142C8.37721 3.0415 8.04142 3.37729 8.04142 3.7915V4.0415ZM8.3335 7.99984C8.74771 7.99984 9.0835 8.33562 9.0835 8.74984V13.7498C9.0835 14.1641 8.74771 14.4998 8.3335 14.4998C7.91928 14.4998 7.5835 14.1641 7.5835 13.7498V8.74984C7.5835 8.33562 7.91928 7.99984 8.3335 7.99984ZM12.4168 8.74984C12.4168 8.33562 12.081 7.99984 11.6668 7.99984C11.2526 7.99984 10.9168 8.33562 10.9168 8.74984V13.7498C10.9168 14.1641 11.2526 14.4998 11.6668 14.4998C12.081 14.4998 12.4168 14.1641 12.4168 13.7498V8.74984Z" fill=""></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </div>
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]"></div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Edit {title}
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Update your {title} details.
                        </p>
                    </div>
                    <form className="flex flex-col">
                        <div className="px-2 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div>
                                    <Label>{title} Code</Label>
                                    <Input type="text"
                                        defaultValue={editItem?.code || ''}
                                        onChange={(e) => setEditItem({ ...editItem!, code: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <Label>{title} Name</Label>
                                    <Input type="text" defaultValue="Name"
                                        value={editItem?.name || ''}
                                        onChange={(e) => setEditItem({ ...editItem!, name: e.target.value })} />
                                </div>

                                <div>
                                    <Label className="m-0">Is Active:</Label>
                                    <Switch
                                        label=""
                                        defaultChecked={editItem?.isActive ?? false}
                                        onChange={(checked: boolean) =>
                                            setEditItem({ ...editItem!, isActive: checked })
                                        }
                                    />
                                </div>
                                <div>
                                    <Label className="m-0">Is Deleted:</Label>
                                    <Switch
                                        label=""
                                        defaultChecked={editItem?.isDeleted ?? false}
                                        onChange={(checked: boolean) =>
                                            setEditItem({ ...editItem!, isDeleted: checked })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Close
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default MasterList;
