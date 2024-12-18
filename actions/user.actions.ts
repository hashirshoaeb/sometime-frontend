import { Exception } from "@/utils/exceptions";
import { fetchWrapper } from "@/utils/fetchWrapper";


// Action to send phone number
export const sendPhoneNumber = async (phoneNumber: string) => {
  try {
    const response = await fetchWrapper.post({
      endpoint: "auth-send",
      data: { phoneNumber },
    });
    return response.response!;
  } catch (error: any) {
    throw new Exception(error);
  }
};

// Action to verify phone number with code
export const verifyPhoneNumber = async (phoneNumber: string, code: string) => {
  try {
    const response = await fetchWrapper.post({
      endpoint: 'auth-verify',
      data: { phoneNumber, code },
    });
    return response.response!;
  } catch (error: any) {
    throw new Exception(error);
  }
};