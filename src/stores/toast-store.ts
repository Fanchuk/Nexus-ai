import { create } from "zustand";
import { nanoid } from "nanoid";

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastState = {
  toasts: Toast[];
  add: (type: ToastType, message: string) => void;
  remove: (id: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  add: (type, message) => {
    const id = nanoid();
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
    setTimeout(() => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })), 3500);
  },

  remove: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export const toast = {
  success: (message: string) => useToastStore.getState().add("success", message),
  error: (message: string) => useToastStore.getState().add("error", message),
  info: (message: string) => useToastStore.getState().add("info", message),
};