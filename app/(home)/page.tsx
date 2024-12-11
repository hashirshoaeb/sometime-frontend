import { EventQueue } from "./pageClient";

export default function Home({

  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const uid = searchParams?.uid as (string | undefined) ?? "";

  return (
    <div className="">
      <EventQueue uid={uid} />
    </div>
  );
}
