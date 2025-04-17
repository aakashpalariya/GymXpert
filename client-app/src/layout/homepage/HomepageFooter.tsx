"use client";
import { CalenderIcon, GridIcon, ListIcon, PageIcon, TableIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";


type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
};

const navItems: NavItem[] = [
    {
        icon: <GridIcon />,
        name: "Home",
        path: "/",
    },
    {
        icon: <CalenderIcon />,
        name: "About",
        path: "/",
    },
    {
        name: "Communities",
        icon: <ListIcon />,
        path: "/",
    },
    {
        name: "Sign Up",
        icon: <TableIcon />,
        path: "/",
    },
    {
        name: "Contact",
        icon: <PageIcon />,
        path: "/",
    },
];

const HomepageFooter: React.FC = () => {

    return (

        <footer className="bg-gray-800 text-white py-6 mt-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Footer Logo */}
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Image
                                width={154}
                                height={32}
                                src="/images/logo/gym-white.png"
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    {/* Footer Links */}
                    <div className="flex space-x-8 mt-4 lg:mt-0">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path || "#"}
                                className="text-gray-300 hover:text-blue-400 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer Legal Links */}
                <div className="mt-6 text-center space-x-4 text-gray-400 text-sm">
                    <Link href="/privacy-policy" className="hover:text-blue-400 transition">
                        Privacy Policy
                    </Link>
                    <span>|</span>
                    <Link href="/terms" className="hover:text-blue-400 transition">
                        Terms of Service
                    </Link>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-6 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} GymXpert. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default HomepageFooter;
