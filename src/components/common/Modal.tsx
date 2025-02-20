"use client";

import { Dialog, Transition } from "@headlessui/react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {pathname == "/" && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white rounded-xl shadow-xl w-full max-w-md">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <SparklesIcon className="w-6 h-6 text-indigo-600" />
                      <Dialog.Title className="text-xl font-bold text-gray-900">
                        Welcome!
                      </Dialog.Title>
                    </div>

                    <Dialog.Description className="text-gray-600 mb-6">
                      Experience AI-powered text processing with smart
                      summarization, detection and translation capabilities.
                    </Dialog.Description>

                    <button
                      onClick={closeModal}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Get Started
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
