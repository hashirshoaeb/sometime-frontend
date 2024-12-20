import { Event } from "@/types/ResponseTypes";
import Link from "next/link";

export function EventQueueCard({ id, event }: { id: string; event: Event }) {
  return (
    <Link href={`/${event.id}`}>
      <div
        id={id}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-md"
      >
        <div className=" flex flex-col">
          <div className=" bg-slate-200 h-96"></div>
          <h2 className="text-lg font-semibold">{event.title}</h2>
        </div>
      </div>
    </Link>
  );
}
