import { FC } from "react";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ListItem } from "../api/getListData";
import { cx } from "../utils";
import { ChevronDownIcon } from "./icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CardProps = Pick<ListItem, "title" | "description" | "isExpanded"> & {
  deleteCard?: () => void;
  expandCard?: () => void;
};

export const Card: FC<CardProps> = ({
  title,
  description,
  isExpanded,
  deleteCard,
  expandCard,
}) => {
  const [parent] = useAutoAnimate();

  if (!deleteCard || !expandCard)
    return (
      <li className="border border-black px-2 py-1.5 ">
        <div className="flex justify-between mb-0.5">
          <h2 className="font-medium">{title}</h2>
        </div>
      </li>
    );

  return (
    <li className="border border-black px-2 py-1.5" ref={parent}>
      <div className="flex justify-between mb-0.5">
        <h3 className="font-medium">{title}</h3>
        <div className="flex">
          <ExpandButton
            className={cx(
              "transition-transform",
              "duration-300",
              isExpanded && "rotate-180"
            )}
            onClick={expandCard}
          >
            <ChevronDownIcon />
          </ExpandButton>
          <DeleteButton onClick={deleteCard} />
        </div>
      </div>
      {isExpanded && <p className={"text-sm"}>{description}</p>}
    </li>
  );
};
