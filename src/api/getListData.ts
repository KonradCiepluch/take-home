import { useQuery } from "@tanstack/react-query";
import mockJson from "./mock.json";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
  isExpanded: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

export const useGetListData = (isPersist: boolean) => {
  const query = useQuery({
    enabled: !isPersist,
    queryKey: ["list"],
    queryFn: async () => {
      await sleep(1000);

      if (getRandom() > 85) {
        console.error("An unexpected error occurred!");
        throw new Error("👀");
      }

      const mockData = mockJson as Omit<
        ListItem,
        "isVisible" | "isDeleted" | "isExpanded"
      >[];

      return shuffle(mockData).map((item) => {
        return {
          ...item,
          isVisible: getRandom() > 50,
          isExpanded: false,
        };
      });
    },
    retry: false,
  });

  return query;
};

const getRandom = () => Math.floor(Math.random() * 100);

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const shuffle = <T extends unknown[]>(array: T): T => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
