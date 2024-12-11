"use client";

import { events } from "@/database/events";
import { EventQueueCard } from "./_components/EventQueueCard";
import { useEffect, useState } from "react";
import { Signup } from "@/components/signup/Signup";
import { Modal, Button, useDisclosure, ModalContent } from "@nextui-org/react";
import { OTPModal } from "@/components/signup/OTP";

export function EventQueue({ uid }: { uid?: string }) {

  const loginDisclosure = useDisclosure();
  const otpDisclosure = useDisclosure();



  useEffect(() => {
    if (uid) {
      const element = document.getElementById(uid);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [uid]);

  return (
    <div
    >
      <Navbar onClick={() => {
        console.log("Open Modal")
        loginDisclosure.onOpen();
      }} />
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
      <div
        className=" container flex flex-col gap-4"
      >
        {events.map((event) => (
          <EventQueueCard id={event.id} key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}


function Navbar({ onClick }: { onClick: () => void }) {
  return (
    <nav className=" p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" text-lg font-semibold">
          ST
        </div>
        <div>
          <button onClick={onClick} className="bg-black text-white py-2 px-4 rounded-full">
            Login / Signup
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;