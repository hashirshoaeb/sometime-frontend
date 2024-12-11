import React, { useState, useEffect } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import OTPInput from "react-otp-input";
import { DevicePhoneMobileIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

export function OTPModal({ isOpen, onClose, phoneNumber }: OTPModalProps): JSX.Element {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (isOpen) {
      setTimer(30); // Reset the timer when modal opens
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval); // Cleanup timer
    }
    return () => { }; // Return an empty cleanup function when isOpen is false
  }, [isOpen]);

  const handleChange = (value: string) => setOtp(value);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
      hideCloseButton={true}
      placement="center"
    >
      <ModalContent className="p-10">
        <span className="text-center text-gray-700 text-sm leading-none">
          We have sent a code to <span className="font-semibold">{phoneNumber}</span>.
        </span>
        <span className="text-center text-gray-700 mt-4 text-sm leading-none">Enter it here</span>

        <div className="flex justify-center mt-6">
          <OTPInput
            value={otp}
            onChange={handleChange}
            numInputs={4}
            // isInputNum
            shouldAutoFocus={true}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 0.5rem",
              fontSize: "1.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
            renderInput={(inputProps, index) => {
              return (
                <input
                  {...inputProps}
                  type="number"
                  placeholder="0"
                  maxLength={1}
                  key={index}
                />
              );
            }}
          // focusStyle={{
          //   border: "1px solid #4f46e5",
          // }}
          />
        </div>

        <div className="mt-6 flex items-center justify-start space-x-2">
          <DevicePhoneMobileIcon className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">
              Didn’t receive the code?{" "}
            </p>
            <div>
              {timer > 0 ? (
                <span className="text-red-500">Available in {timer} seconds</span>
              ) : (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setTimer(30)} // Reset timer for demonstration
                >
                  Resend
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="flex items-center justify-start space-x-2">
          <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />
          <p className="text-sm text-gray-500">Need help?</p>
        </div>
      </ModalContent>
    </Modal>
  );
};
