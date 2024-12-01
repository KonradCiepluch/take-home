import { FC } from "react";
import { Card } from "./Card";
import { ListItem } from "../api/getListData";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type ListProps = {
  cards: ListItem[];
  deleteCard?: (id: number) => void;
  expandCard?: (id: number) => void;
  children: React.ReactNode;
};

export const List: FC<ListProps> = ({
  cards,
  deleteCard,
  expandCard,
  children,
}) => {
  const [parent] = useAutoAnimate();
  return (
    <div className="w-full max-w-xl flex-shrink-0">
      {children}
      <ul className="flex flex-col gap-y-3" ref={parent}>
        {cards.map(({ id, title, description, isExpanded }) => (
          <Card
            key={id}
            title={title}
            description={description}
            isExpanded={isExpanded}
            deleteCard={deleteCard ? () => deleteCard(id) : undefined}
            expandCard={expandCard ? () => expandCard(id) : undefined}
          />
        ))}
      </ul>
    </div>
  );
};
