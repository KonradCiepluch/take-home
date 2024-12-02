import { useEffect, useCallback } from "react";
import { useGetListData } from "../api/getListData";
import { useStore } from "../store";
import { ToggleButton } from "./Buttons";
import { List } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
  const {
    visibleCards,
    deletedCards,
    isRevealed,
    error,
    isPersist,
    deleteCard,
    setCards,
    revealCards,
    setError,
    refresh,
    expandCard,
  } = useStore();

  const query = useGetListData(isPersist);

  useEffect(() => {
    if (query.isSuccess && !isPersist) return setCards(query.data);
    else if (query.isError)
      setError("We encountered an error, please refresh the page");
  }, [query.isLoading, query.isError, query.isSuccess, isPersist]);

  const refreshData = useCallback(async () => {
    refresh();
    await query.refetch();
  }, []);

  if (query.isFetching)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center">
        {error}
        <ToggleButton
          onClick={refreshData}
          className="text-white text-sm  bg-black rounded px-3 py-1 ml-2"
        >
          Refresh
        </ToggleButton>
      </div>
    );

  return (
    <div className="flex gap-x-16 justify-center flex-wrap xl:flex-nowrap">
      <List
        cards={visibleCards}
        deleteCard={deleteCard}
        expandCard={expandCard}
      >
        <h1 className="mb-3 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
      </List>
      <List cards={isRevealed ? deletedCards : []}>
        <div className="flex items-center mt-3 xl:mt-0">
          <h2 className="mb-3 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h2>
          <ToggleButton
            disabled={isRevealed || deletedCards.length === 0}
            onClick={revealCards}
            className="text-white text-sm  disabled:bg-slate-400 bg-black rounded px-3 py-1 ml-2 "
          >
            Reveal
          </ToggleButton>
          <ToggleButton
            onClick={refreshData}
            className="text-white text-sm bg-black rounded px-3 py-1 ml-2"
          >
            Refresh
          </ToggleButton>
        </div>
      </List>
    </div>
  );
};
