import { Modal } from 'react-native'

import { BoxSafe, TouchableBox } from '../Box/boxStyles'

type ModalContainerProps = {
  type?: 'bottom' | 'center'
  children: React.ReactNode
  isModalVisible: boolean
  onRequestClose: () => void
}
export function ModalContainer({ type = 'center', children, onRequestClose, isModalVisible }: ModalContainerProps) {
  const animation = type === 'bottom' ? 'slide' : 'fade'
  const justifyOnType = type === 'bottom' ? 'flex-end' : 'center'

  return (
    <Modal visible={isModalVisible} transparent animationType={animation} onRequestClose={onRequestClose}>
      <BoxSafe backgroundColor="translucentBlack" justifyContent={justifyOnType} alignItems="center">
        <TouchableBox height={'100%'} width={'100%'} position="absolute" zIndex={-1} onPress={onRequestClose} />
        {children}
      </BoxSafe>
    </Modal>
  )
}
