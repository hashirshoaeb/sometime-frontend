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
      <h1 className="text-4xl font-bold text-center">Hello, World!</h1>
      <EventQueue uid={uid} />
    </div>
  );
}
