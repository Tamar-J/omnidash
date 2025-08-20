import { Modal } from 'react-native'

import { FeedArticleView } from '../FeedArticleView'

import { FeedArticleProps } from '../../types'

type Props = {
  isModalVisible: boolean
  data: FeedArticleProps
  closeModal: () => void
}

export function ModalFeedScreen({ isModalVisible, data, closeModal }: Props) {
  return (
    <Modal visible={isModalVisible} transparent animationType="slide" onRequestClose={closeModal}>
      <FeedArticleView data={data} goBack={closeModal} />
    </Modal>
  )
}
