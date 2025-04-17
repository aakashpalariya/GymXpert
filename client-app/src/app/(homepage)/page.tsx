import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Homepage() {
  return (
    <>
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Manage Your Gym with Ease</h1>
            <p className="text-lg text-gray-300 mb-8">
              All-in-one gym management software to track members, schedule classes, handle payments, and grow your business.
            </p>
            <a
              href="#"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
            >
              Request a Demo
            </a>
          </div>
          <div className="md:w-1/2">
            <Image
              width={700}
              height={1000}

              src="/images/gym/training.jpg"
              className="rounded-lg shadow-lg"
              alt="Gym dashboard preview"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-20">
        <div className="max-w-8xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Powerful Features for Modern Gyms</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition">
              <Image
                width={500}
                height={0}

                src="/images/gym/man.jpg"
                className="rounded-lg shadow-lg"
                alt="Gym dashboard preview"
              />
              <h3 className="text-xl font-semibold mb-2">📅 Class Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily create and manage class schedules. Let members book slots online with live availability.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition">
              <Image
                width={500}
                height={200}

                src="/images/gym/training.jpg"
                className="rounded-lg shadow-lg"
                alt="Gym dashboard preview"
              />
              <h3 className="text-xl font-semibold mb-2">💳 Automated Payments</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Secure recurring billing and one-time payments with built-in tracking and reporting.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition">
              <Image
                width={500}
                height={200}

                src="/images/gym/software-developer.jpg"
                className="rounded-lg shadow-lg"
                alt="Gym dashboard preview"
              />
              <h3 className="text-xl font-semibold mb-2">👥 Member Management</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track attendance, performance, and membership details all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-20">
        <div className="max-w-8xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <Image
              width={700}
              height={1000}

              src="/images/gym/pexels-shvetsa.jpg"
              className="rounded-lg shadow-lg"
              alt="Gym dashboard preview"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Built for Gym Owners & Trainers</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Whether you're running a single gym or multiple branches, our software is designed to streamline your operations and boost member satisfaction.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We empower fitness professionals to focus on training while we handle the backend — scheduling, payments, and performance tracking.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Gym?</h2>
          <p className="text-lg mb-8">
            Try our platform today and see how easy gym management can be.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition"
          >
            Start Free Trial
          </a>
        </div>
      </section>

    </>
  );
}
