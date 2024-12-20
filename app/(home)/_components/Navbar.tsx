import { useAuthFlow } from "@/components/signup/Signup";
import { useSession } from "next-auth/react";
import { LoginButton } from "./LoginButton";

export function Navbar() {
  return (
    <nav className=" p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" text-lg font-semibold">ST</div>
        <div>
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}
