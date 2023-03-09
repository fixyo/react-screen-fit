import { Drawer } from 'antd'

export const ProjectModal = (props: {
  projectModalOpen: boolean
  onClose: () => void
}) => {
  const { projectModalOpen, onClose } = props
  return (
    <Drawer onClose={onClose} width="100%" visible={projectModalOpen}>
      JJJ
    </Drawer>
  )
}
