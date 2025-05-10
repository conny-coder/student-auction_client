import LabeledInput from "@/components/ui/LabeledInput"
import StyledButton from "@/components/ui/StyledButton"
import StyledText from "@/components/ui/StyledText"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { useTransactions } from "./useTransactions"
import { TouchableOpacity } from "react-native"
import GooglePayIcon from "@/components/icons/GooglePayIcon"
import { useState } from "react"
import DepositModal from "./DepositModal"

interface IWithdrawForm {
  amount: string
  card: string
}

const TransactionOperations = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<IWithdrawForm>({
    defaultValues: {
      amount: "",
      card: ''
    }
  })
  const [isDepositModalVisible, setDepositModalVisible] = useState(false)

  const { mutateDeposit, mutateWithdrawal } = useTransactions();

  const onSubmit = (data: IWithdrawForm) => {
    mutateWithdrawal({type: 'withdrawal', amount: +data.amount});
    reset()
  }

  const amount = watch('amount');

  return (
    <View className="px-4 pt-2">
      <DepositModal onCancel={() => setDepositModalVisible(false)} visible={isDepositModalVisible} onConfirm={mutateDeposit} />

      <View className="pb-5">
        <StyledText className="text-xl mb-6">Поповнити</StyledText>

        <TouchableOpacity onPress={() => setDepositModalVisible( true )} className="flex-row items-center gap-2 px-4 py-3 rounded-xl" style={{ backgroundColor: 'rgba(21, 22, 22, 0.6)', boxShadow: '0px 0px 8px rgba(204, 204, 204, 0.3)', width: 240 }}>
          <StyledText className="text-lg">Оплатити через</StyledText>
          <GooglePayIcon />
        </TouchableOpacity>
      </View>

      <View className="h-0.5 bg-gray-30p mb-4" />

      <View>
        <StyledText className="text-xl mb-6">Вивести</StyledText>

        <Controller
          control={control}
          name="amount"
          rules={{ required: "Поле є обов'язковим", min: { value: 100, message: "Мінімальна сума 100 грн." } }}
          render={( { field: { onChange, onBlur, value } } ) => (
            <LabeledInput
              // className="mb-2"
              label="Вкажіть суму (грн.)"
              placeholder="0"
              keyboardType="numeric"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.amount?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="card"
          rules={{
            required: "Поле є обов'язковим",
            pattern: {
              value: /^(\d{4} \d{4} \d{4} \d{4})$/,
              message: "Неправильний формат номера картки",
            },
          }}
          render={( { field: { onChange, onBlur, value } } ) => (
            <LabeledInput
              label="Номер картки"
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#C5C6C7"
              keyboardType="numeric"
              maxLength={19}
              value={value}
              onBlur={onBlur}
              onChangeText={( text: string ) =>
              {
                const digitsOnly = text.replace( /\D/g, '' );

                const withSpaces = digitsOnly
                  .match( /.{1,4}/g )
                  ?.join( ' ' )
                  .trim() || '';
                onChange( withSpaces );
              }}
              errorMessage={errors.card?.message}
            />
          )}
        />

        <StyledButton className="mt-6" color="red" handlePress={handleSubmit(onSubmit)}>Вивести {amount || 0} грн</StyledButton>
      </View>
    </View>
  )
}
export default TransactionOperations