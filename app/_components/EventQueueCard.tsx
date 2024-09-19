import { Event } from "@/database/events";

export function EventQueueCard(event: Event) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold">{event.title}</h2>
    </div>
  );
}