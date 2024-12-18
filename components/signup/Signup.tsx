import 'react-phone-input-2/lib/style.css'
import PhoneInput, { CountryData } from "react-phone-input-2";
import { SizeBox } from "../SizeBox";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import OTPInput from "react-otp-input";
import { DevicePhoneMobileIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface AuthFlowContextProps {
  onOpen: () => void;
}

const AuthFlowContext = React.createContext<AuthFlowContextProps | undefined>(undefined);

export const AuthFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loginDisclosure = useDisclosure();
  const otpDisclosure = useDisclosure();

  const onOpen = () => {
    loginDisclosure.onOpen();
  };

  return (
    <AuthFlowContext.Provider
      value={{ onOpen }}
    >
      {children}
      <>
        <Modal
          placement="bottom"
          isOpen={loginDisclosure.isOpen}
          onOpenChange={loginDisclosure.onOpenChange}
        >
          <ModalContent className="p-10">
            <Signup onClick={() => {
              otpDisclosure.onOpen();
            }} />
          </ModalContent>
        </Modal>
        <OTPModal
          isOpen={otpDisclosure.isOpen}
          onClose={otpDisclosure.onClose}
          phoneNumber="+1234567890"
        />
      </>
    </AuthFlowContext.Provider>
  );
};

export const useAuthFlow = (): AuthFlowContextProps => {
  const context = React.useContext(AuthFlowContext);
  if (!context) {
    throw new Error("useAuthFlow must be used within an AuthFlowProvider");
  }
  return context;
};

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

function OTPModal({ isOpen, onClose, phoneNumber }: OTPModalProps): JSX.Element {
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
            inputType="number"
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
                  // type="number"
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


function Signup({ onClick }: { onClick: () => void }) {
  const [phone, setPhone] = React.useState('');


  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-2xl">Log in / Sign Up</h1>
      <SizeBox height="6px" />
      <p className=" text-base text-gray-500">Get tickets to unmissable events</p>
      <SizeBox height="20px" />
      <p className=" text-xs">Enter your number to find or create your DICE account.</p>
      <SizeBox height="20px" />
      <PhoneInput
        placeholder="Mobile Number"
        enableSearch={true}
        containerClass="!w-full"
        inputClass=' !w-full'
        inputProps={{
          autocomplete: "tel",
        }}
      // value={phone}
      // onChange={(value: string, data: CountryData, event: React.ChangeEvent<HTMLInputElement>) => {
      //   event.preventDefault();
      //   setPhone(value);
      // }}
      />
      <SizeBox height="20px" />
      <footer className=" text-xs">
        By signing up you accept our
        <a target="_blank" rel="noreferrer" href="https://dice.fm/terms_and_conditions.html">terms of use </a>
        and
        <a target="_blank" rel="noreferrer" href="https://dice.fm/privacy_policy.html">privacy policy</a>
        . We’ll text you a code to verify your account (usual rates may apply). We’ll also text you if you opt into text updates about events (frequency varies). To opt out of texts, reply STOP to any of them. For help, go to
        <a target="_blank" rel="noreferrer" href="https://dice.fm/help/account">dice.fm/help/account</a>.
      </footer>
      <SizeBox height="20px" />
      <button onClick={onClick} className=" self-start bg-black text-white py-2 px-4 rounded-full">
        Next
      </button>
    </div>
  );
}