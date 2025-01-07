import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.py4e.com/api/species/";
const fetchUrl = async (url) => {
  console.log(url);
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl}) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="error">Error! {error.toString()}</div>;
  }

  return <InfiniteScroll
    // 초기 페이지 로드 제거
    initialLoad={false}
    loadMore={() => {
      if (!isFetching) {
        fetchNextPage();
      }
    }}
    hasMore={hasNextPage}
  >
    {data.pages.map((pageData) => {
      return pageData.results.map((species) => {
        return (
          <Species
            key={species.name}
            name={species.name}
            classification={species.classification}
            designation={species.designation}
          />
        );
      });
    })}
    </InfiniteScroll>;
}
