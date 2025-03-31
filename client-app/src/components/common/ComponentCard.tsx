import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  showButton?: boolean;
  route?: string; // Route
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  showButton = false,
  route = ""
}) => {
  const router = useRouter();

  function openNew(): void {
    router.push("/" + route);
  }

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="grid gap-6 sm:grid-cols-12">
        <div className="grid gap-6 sm:col-span-9">
          {/* Card Header */}
          <div className="px-6 py-5">
            <h3 className="text-2xl font-medium text-gray-800 dark:text-white/90">
              {title}
            </h3>
            {desc && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {desc}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:col-span-3 justify-end">
          {showButton && (
            <div className="px-6 py-5">
              <Button onClick={openNew} size="sm">Add New</Button>
            </div>
          )}

        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
