import { create } from "zustand";

interface UIState {
  rightPanelOpen: boolean;
  sidebarOpen: boolean;
  toggleRightPanel: () => void;
  setRightPanel: (v: boolean) => void;
  toggleSidebar: () => void;
  setSidebar: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  rightPanelOpen: false,
  sidebarOpen: false,
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  setRightPanel: (v) => set({ rightPanelOpen: v }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebar: (v) => set({ sidebarOpen: v }),
}));