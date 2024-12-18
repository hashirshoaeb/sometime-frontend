import { events } from "@/database/events";
import { Event } from "@/types/ResponseTypes";
import { Exception } from "@/utils/exceptions";
import { fetchWrapper } from "@/utils/fetchWrapper";

export async function getEvents(): Promise<Event[]> {
  // try {
  //   const response = await fetchWrapper.get({ endpoint: 'event' });
  //   return response.response;
  // } catch (error: any) {
  //   throw new Exception(error);
  // }
  await new Promise(resolve => setTimeout(resolve, 1500));
  return events;
}