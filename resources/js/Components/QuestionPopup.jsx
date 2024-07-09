// src/components/Popup.js
import { useState,Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const QuestionPopup = ({isOpen,question,onAccept,onCancel}) => {

  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onCancel != undefined? onCancel:() => {console.log("")}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   { question}

                  </Dialog.Title>
                  <div className="mt-4">
                    { onCancel != undefined && (
                    <button
                      type="button"
                      className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                      onClick={onCancel}
                    >
                      Cancelar
                    </button>
                    )}
                    { onAccept != undefined && (
                    <button
                      type="button"
                      className="ml-2 px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                      onClick={onAccept}
                    >

                     Aceptar 
                    </button>)
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default QuestionPopup;
