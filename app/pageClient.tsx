"use client";

import { events } from "@/database/events";
import { EventQueueCard } from "./_components/EventQueueCard";
import { useEffect } from "react";

export function EventQueue({ uid }: { uid?: string }) {

  useEffect(() => {
    if (uid) {
      const element = document.getElementById(uid);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [uid]);

  return (
    <div className=" container flex flex-col gap-4">
      {events.map((event) => (
        <EventQueueCard id={event.id} key={event.id} event={event} />
      ))}
    </div>
  );
}