/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";

export async function sendPrivateMessage(credentials: {
  message: string;
  receiver_id: number;
}) {
  try {
    const response = await api.post(`/realtime/private`, credentials);

    return {
      success: response.data.success,
      message: response.data.message,
      status: response.status,
      data: response.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data.message,
      status: err.response?.status,
    };
  }
}
export async function sendPublicMessage(credentials: { message: string }) {
  try {
    const response = await api.post(`/realtime/public`, credentials);

    return {
      success: response.data.success,
      message: response.data.message,
      status: response.status,
      data: response.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data.message,
      status: err.response?.status,
    };
  }
}
