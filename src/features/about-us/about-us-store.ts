import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { AboutUsUIState, AboutUsUIActions } from './types';

export const useAboutUsStore = create<AboutUsUIState & AboutUsUIActions>()(
  immer((set) => ({
    selectedMemberId: null,

    selectMember: (id) =>
      set((state) => {
        state.selectedMemberId = id;
      }),
  }))
);
