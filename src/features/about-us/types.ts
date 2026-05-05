// --- Server state (owned by React Query) ---
export type TeamMember = {
  id: string;
  name: string;
  role: string;
};

// --- Client UI state (owned by Zustand) ---
export type AboutUsUIState = {
  selectedMemberId: string | null;
};

export type AboutUsUIActions = {
  selectMember: (id: string | null) => void;
};
