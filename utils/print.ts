import { environment } from "./environment/serverEnvironment";

export default function println(message?: any, ...optionalParams: any[]): void {
  if (environment.env === "development") {
    console.log("ST", message, ...optionalParams);
    console.log(
      "-----------------------------------------------------------------"
    );
  }
}
