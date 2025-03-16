import {CategoryService} from "@/services/category.service";
import {ICategory} from "@/types/category.types";
import {useQuery} from "@tanstack/react-query";

export const useCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: () => CategoryService.getAll(),
    select: ({ data }) => data,
  });

  const categories: ICategory[] = data ? data : [];

  return { categories, isLoading };
}
