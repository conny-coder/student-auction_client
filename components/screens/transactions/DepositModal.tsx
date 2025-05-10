import React, { FC } from "react"
import { Modal, View, TouchableWithoutFeedback } from "react-native"
import { Controller, useForm } from "react-hook-form"
import LabeledInput from "@/components/ui/LabeledInput"
import StyledButton from "@/components/ui/StyledButton"
import StyledText from "@/components/ui/StyledText"
import { ITransactionForm } from "@/types/transaction.types"

export interface DepositFormData {
  amount: string
  card: string
}

export interface DepositModalProps {
  visible: boolean
  onCancel: () => void
  onConfirm: (data: ITransactionForm) => void
}

const DepositModal: FC<DepositModalProps> = ({ visible, onCancel, onConfirm }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DepositFormData>({
    defaultValues: { amount: '', card: '' }
  })

  const submit = (data: DepositFormData) => {
    onConfirm({ type: 'deposit', amount: +data.amount })
    onCancel()
    reset()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      </TouchableWithoutFeedback>
      <View className="bg-black px-4 pt-5 pb-6 mt-36">
        <StyledText className="text-2xl mb-4">Поповнити рахунок</StyledText>

        <Controller
          control={control}
          name="amount"
          rules={{
            required: 'Поле є обов`язковим',
            min: { value: 50, message: 'Мінімальна сума 50 грн.' }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabeledInput
              label="Сума (грн.)"
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
            required: 'Поле є обов\'язковим',
            pattern: {
              value: /^(\d{4} \d{4} \d{4} \d{4})$/,
              message: 'Неправильний формат номера картки'
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabeledInput
              label="Номер картки"
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#C5C6C7"
              keyboardType="numeric"
              maxLength={19}
              value={value}
              onBlur={onBlur}
              onChangeText={(text: string) => {
                const digits = text.replace(/\D/g, '')
                const withSpaces = digits.match(/.{1,4}/g)?.join(' ').trim() || ''
                onChange(withSpaces)
              }}
              errorMessage={errors.card?.message}
            />
          )}
        />

        <View className="justify-between mt-6 gap-4">
          <StyledButton color="gray" handlePress={onCancel}>
            Скасувати
          </StyledButton>
          <StyledButton color="green" handlePress={handleSubmit(submit)}>
            Підтвердити
          </StyledButton>
        </View>
      </View>
    </Modal>
  )
}

export default DepositModal
