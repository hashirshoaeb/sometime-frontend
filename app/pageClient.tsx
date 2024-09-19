"use client";

import { events } from "@/database/events";
import { EventQueueCard } from "./_components/EventQueueCard";

export function EventQueue() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventQueueCard key={event.id} {...event} />
      ))}
    </div>
  );
}