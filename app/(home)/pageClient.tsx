"use client";

import { EventQueueCard } from "./_components/EventQueueCard";
import { useEffect, useState } from "react";
import { useAuthFlow } from "@/components/signup/Signup";
import { Event } from "@/types/ResponseTypes";

export function EventQueue({ uid, events }: { uid?: string; events: Event[] }) {
  const { onOpen } = useAuthFlow();

  useEffect(() => {
    if (uid) {
      const element = document.getElementById(uid);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [uid]);

  return (
    <div>
      <Navbar
        onClick={() => {
          console.log("Open Modal");
          onOpen();
        }}
      />

      <div className=" container flex flex-col gap-4">
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
        <div className=" text-lg font-semibold">ST</div>
        <div>
          <button
            onClick={onClick}
            className="bg-black text-white py-2 px-4 rounded-full"
          >
            Login / Signup
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
