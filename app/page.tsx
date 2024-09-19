import { EventQueue } from "./pageClient";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center">Hello, World!</h1>
      <EventQueue />
    </div>
  );
}
