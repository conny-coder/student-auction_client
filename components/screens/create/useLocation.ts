import { LocationService } from "@/services/location.service";
import { ILocation } from "@/types/location.types";
import {useQuery} from "@tanstack/react-query";

export const useLocation = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-locations"],
    queryFn: () => LocationService.getAll(),
    select: ({ data }) => data,
  });

  const locations: ILocation[] = data ? data : [];

  return { locations, isLoading };
}
