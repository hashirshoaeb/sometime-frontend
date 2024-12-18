export type Response<T> = {
  response?: T;
  message: string;
  statusCode: number;
};

export type LoginUser = {
  id: number;
  phone: string;
  isVerified: boolean;
};

export type Event = {
  id: string;
  title: string;
};