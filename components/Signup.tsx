import 'react-phone-input-2/lib/style.css'
import PhoneInput, { CountryData } from "react-phone-input-2";
import { SizeBox } from "./SizeBox";
import React from "react";

export function Signup({ onClick }: { onClick: () => void }) {
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