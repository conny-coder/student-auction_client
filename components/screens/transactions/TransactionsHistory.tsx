import StyledText from "@/components/ui/StyledText"
import { FlatList, View } from "react-native"
import { useGetTransactionsHistory } from "./useGetTransactionsHistory"
import Loader from "@/components/loaders/Loader"
import TransactionsHistoryItem from "./TransactionsHistoryItem"
import { useCallback, useState } from "react"

const TransactionsHistory = () => {
  const { data, isLoading, refetch } = useGetTransactionsHistory()
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if(isLoading) return <Loader />
  if(!data) return <StyledText>TransactionsHistory not found</StyledText>;

  return (
    <FlatList
      className="px-4 pt-2"
      data={[...data].reverse()}            
      keyExtractor={item => item._id}                  
      renderItem={( { item } ) => (
        <TransactionsHistoryItem
          amount={item.amount}
          createdAt={item.createdAt}
          type={item.type}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshing={refreshing}
      onRefresh={() => {
        refetch()
      }}
    />
  )
}
export default TransactionsHistory