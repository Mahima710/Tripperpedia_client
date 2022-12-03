import { useEffect, useState } from "react";

export type SORT_ORDER = "ASCENDING" | "DESCENDING";

export default function useFilters<T extends any[]>({
  data,
  status,
}: {
  data: T;
  status: "error" | "loading" | "success";
}) {
  const [filters, setFilters] = useState({});
  const [sortConfigs, setSortConfigs] = useState<Record<string, SORT_ORDER>>(
    {}
  );
  const [finalData, setFinalData] = useState<T>(data);

  const setData = (data: T) => {
    setFinalData(data);
  };

  useEffect(() => {
    if (status === "success") setData(data);
  }, [status]);

  const applyFilter = (filter: string, value: any) => {
    if (filter !== "price") {
      const existingFilter: T = (filters as any)[filter] || [];
      existingFilter.push(value);

      setFilters({ ...filters, [filter]: existingFilter });
    } else {
      setFilters({ ...filters, [filter]: value });
    }
  };

  const filterData = () => {
    let tempData: any[] = [...data];

    tempData = tempData.filter((item) => {
      let verdict = true;
      for (let filter of Object.keys(filters)) {
        if (filter === "price") {
          if (Array.isArray(item["price"])) {
            verdict = !!(
              item["price"][0].amount >=
                ((filters as any)[filter][0] ?? Number.MIN_VALUE) &&
              item["price"][0].amount <=
                ((filters as any)[filter][1] ?? Number.MAX_VALUE)
            );
          } else {
            verdict = !!(
              item["price"].per_day.amount >=
                ((filters as any)[filter][0] ?? Number.MIN_VALUE) &&
              item["price"].per_day.amount <=
                ((filters as any)[filter][1] ?? Number.MAX_VALUE)
            );
          }
        } else if (Array.isArray((filters as any)[filter])) {
          verdict = ((filters as any)[filter] as any[]).some(
            (f) => item[filter] === f
          );
        }
      }
      return verdict;
    });

    setFinalData(tempData as T);
  };

  const removeFilter = (filter: string) => {
    const temp = filters;

    delete (temp as any)[filter];

    setFilters(temp);
  };

  const removeFilterValue = (filter: string, value: any) => {
    const temp: any[] = ((filters as any)[filter] as any[]).filter(
      (item) => item !== value
    );

    if (temp.length === 0) removeFilter(filter);
    else setFilters({ ...filters, [filter]: temp });
  };

  const applySortFilter = (field: string, order: SORT_ORDER) => {
    setSortConfigs({ ...sortConfigs, [field]: order });
  };

  const resetSort = (resetConfig = true) => {
    const tempData = finalData.sort((a, b) => b.id - a.id);

    if (resetConfig) {
      setSortConfigs({});
      setFinalData(tempData);
    }

    return tempData;
  };

  const sortData = () => {
    // Set the data to initial config before sorting
    const initialData = resetSort(false);

    let tempData = [...initialData];

    Object.keys(sortConfigs).forEach((config) => {
      if (config === "price") {
        console.log("sorting price");
        if (initialData.length > 0 && Array.isArray(finalData[0].price)) {
          tempData =
            sortConfigs[config] === "ASCENDING"
              ? tempData.sort((a, b) => a.price[0].amount - b.price[0].amount)
              : tempData.sort((a, b) => b.price[0].amount - a.price[0].amount);
        } else {
          tempData =
            sortConfigs[config] === "ASCENDING"
              ? tempData.sort(
                  (a, b) => a.price.per_day.amount - b.price.per_day.amount
                )
              : tempData.sort(
                  (a, b) => b.price.per_day.amount - a.price.per_day.amount
                );
        }
      } else {
        tempData =
          sortConfigs[config] === "ASCENDING"
            ? tempData.sort((a, b) => a[config] - b[config])
            : tempData.sort((a, b) => b[config] - a[config]);
      }
    });

    setFinalData(tempData as T);
  };

  const resetData = () => {
    setFilters({});
    setSortConfigs({});
    setFinalData(data);
  };

  return {
    applyFilter,
    removeFilter,
    filterData,
    finalData,
    removeFilterValue,
    sortData,
    applySortFilter,
    sortConfigs,
    resetSort,
    resetData,
  };
}
