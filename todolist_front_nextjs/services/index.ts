import axios, { AxiosResponse } from "axios";
import { z, ZodSchema } from 'zod';

const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export type ServerResponse<T> = Promise<
  | { success: true; data: T }
  | { success: false; data: unknown }
>;

async function serverResponse<T>(
  axiosCall: Promise<AxiosResponse>,
  schema: ZodSchema<T>
): ServerResponse<T> {

  try {

    const response = await axiosCall;
    const parsed = schema.safeParse(response.data);

    if (parsed.success) return { success: true, data: parsed.data };
    else return { success: false, data: parsed.error };

  } catch (err) {
    if(typeof err === "object" && err !== null && "response" in err && typeof (err as any).response === "object" && (err as any).response !== null && "data" in (err as any).response) {
      return { success: false, data: (err as any).response.data };
    }
    return { success: false, data: err };
  }

}
const statusSchema = z.object({
  message: z.string()
});

export async function status() : ServerResponse<z.infer<typeof statusSchema>> {
  return serverResponse(server.get("/"), statusSchema);
}

const itemSchema = z.object({
  id: z.number(),
  item: z.string(),
  done: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export type Item = z.infer<typeof itemSchema>;

export function getAll(): ServerResponse<Item[]> {
  return serverResponse(server.get("/todolist"), z.array(itemSchema));
}

export function get(id: number): ServerResponse<Item> {
  return serverResponse(server.get(`/todolist/${id}`), itemSchema);
}

export function updateItem(id: number, change: Partial<Item>): ServerResponse<Item> {
  return serverResponse(server.patch(`/todolist/${id}`, change), itemSchema);
}

export function deleteItem(id: number): ServerResponse<z.infer<typeof statusSchema>> {
  return serverResponse(server.delete(`/todolist/${id}`), statusSchema);
}

export function deleteAll(): ServerResponse<z.infer<typeof statusSchema>> {
  return serverResponse(server.delete('/todolist/'), statusSchema);
}

export function createItem(item: string): ServerResponse<Item> {
  return serverResponse(server.post('/todolist/', { item }), itemSchema);
}
