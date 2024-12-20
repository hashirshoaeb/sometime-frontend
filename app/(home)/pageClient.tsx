"use client";

import { EventQueueCard } from "./_components/EventQueueCard";
import { useEffect, useState } from "react";
import { useAuthFlow } from "@/components/signup/Signup";
import { Event } from "@/types/ResponseTypes";

export function EventQueue({ uid, events }: { uid?: string; events: Event[] }) {
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
      <div className=" container flex flex-col gap-4">
        {events.map((event) => (
          <EventQueueCard id={event.id} key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
