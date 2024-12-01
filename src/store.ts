import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  isRevealed: boolean;
  error: string;
  isPersist: boolean;
};

type Actions = {
  expandCard: (id: number) => void;
  deleteCard: (id: number) => void;
  revealCards: () => void;
  setCards: (cards: ListItem[]) => void;
  setError: (error: string) => void;
  refresh: () => void;
};

export const useStore = create<
  State & Actions,
  [["zustand/persist", State & Actions]]
>(
  persist(
    (set) => {
      return {
        visibleCards: [],
        deletedCards: [],
        isRevealed: false,
        isPersist: false,
        error: "",
        expandCard: (id: number) => {
          set((state) => {
            const card = state.visibleCards.find((item) => item.id === id);
            if (!card) return state;
            card.isExpanded = !card.isExpanded;
            return { visibleCards: [...state.visibleCards] };
          });
        },
        deleteCard: (id: number) => {
          set((state) => {
            const visibleCards = state.visibleCards.filter(
              (item) => item.id !== id
            );
            const deletedCard = state.visibleCards.find(
              (item) => item.id === id
            );
            return {
              visibleCards,
              deletedCards: [...state.deletedCards, deletedCard!],
            };
          });
        },
        revealCards: () => {
          set(() => {
            return { isRevealed: true };
          });
        },
        setCards: (cards: ListItem[]) => {
          set(() => {
            return {
              visibleCards: cards.filter((item) => item.isVisible),
              deletedCards: cards.filter((item) => item.isDeleted),
              error: "",
              isPersist: true,
            };
          });
        },
        setError: (error: string) => {
          set(() => {
            return {
              error,
            };
          });
        },
        refresh: () => {
          set(() => ({
            visibleCards: [],
            deletedCards: [],
            isRevealed: false,
            isPersist: false,
            error: "",
          }));
        },
      };
    },
    { name: "awesome-list" }
  )
);
