import React from 'react';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
import StyledText from '@/components/ui/StyledText';

interface ReusableModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}

const MyModal: React.FC<ReusableModalProps> = ({
  visible,
  title,
  onClose,
  onConfirm
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay} className="items-center justify-center">
        <View className="rounded-2xl p-4 max-w-md shadow-lg" style={{ backgroundColor: '#272930' }}>
          <StyledText className="text-xl text-center font-opensmedium" style={{ marginBottom: 40 }}>
            {title}
          </StyledText>
          <View className="flex-row justify-around gap-4">
            <Pressable
              onPress={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-green rounded-lg"
              style={{width: 140}}
            >
              <StyledText className="text-base text-gray-800 text-center">Підтвердити</StyledText>
            </Pressable>
            <Pressable
              onPress={onClose}
              className="px-4 py-2 bg-red rounded-lg flex-row justify-center"
              style={{width: 140}}
            >
              <StyledText className="text-base text-gray-800 text-center">Закрити</StyledText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default MyModal;
