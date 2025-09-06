import { create } from "zustand";

type UIState = {
  cursors: Record<string, { x: number; y: number }>;
  setCursor: (id: string, pos: { x:number; y:number }) => void;
};

export const useRoomStore = create<UIState>((set) => ({
  cursors: {},
  setCursor: (id, pos) => set(s => ({ cursors: { ...s.cursors, [id]: pos } }))
}));
