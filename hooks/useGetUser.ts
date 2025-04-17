import { UserService } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = (id: string) => {
  const {data, isLoading} = useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => UserService.getById(id),
    select: ({ data }) => data
  })

  return { data, isLoading }
}