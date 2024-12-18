"use server";
import { getEvents } from "@/actions/events.actions";
import { EventQueue } from "./pageClient";

export default async function Home({

  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const uid = searchParams?.uid as (string | undefined) ?? "";
  const events = await getEvents();

  return (
    <div className="">
      <EventQueue uid={uid} events={events} />
    </div>
  );
}
