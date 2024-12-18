import { LoginUser } from "@/types/ResponseTypes";
import { Exception } from "@/utils/exceptions";
import { fetchWrapper } from "@/utils/fetchWrapper";


// Action to send phone number
export async function sendPhoneNumber(phoneNumber: string): Promise<LoginUser> {
  // try {
  //   const response = await fetchWrapper.post({
  //     endpoint: "auth-send",
  //     data: { phoneNumber },
  //   });
  //   return response.response!;
  // } catch (error: any) {
  //   throw new Exception(error);
  // }
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    id: 1,
    phone: phoneNumber,
    isVerified: false,
  };
}

// Action to verify phone number with code
export async function verifyPhoneNumber(phoneNumber: string, code: string): Promise<LoginUser> {
  // try {
  //   const response = await fetchWrapper.post({
  //     endpoint: 'auth-verify',
  //     data: { phoneNumber, code },
  //   });
  //   return response.response!;
  // } catch (error: any) {
  //   throw new Exception(error);
  // }
  await new Promise(resolve => setTimeout(resolve, 1500));
  const otp = "4321";
  if (otp === code) {
    return {
      id: 1,
      phone: phoneNumber,
      isVerified: true
    }
  } else {
    throw new Exception("Invalid OTP");
  }
}

export async function resendOtp(phoneNumber: string): Promise<LoginUser> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    id: 1,
    phone: phoneNumber,
    isVerified: false,
  };
}