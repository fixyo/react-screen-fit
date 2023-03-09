import styled from '@emotion/styled'
import { Popover, Typography, List, Divider } from 'antd'
import { useProject } from 'utils/project'
import { ButtonNoPadding } from './lib'

export const ProjectPopover = (props: { openProjectModal: () => void }) => {
  const { data: projects, isLoading, retry } = useProject()

  console.log(projects, 'projects')
  const pined = projects?.filter((project) => project.pin === 1)

  const Content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pined?.map((project) => {
          return (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name} />
            </List.Item>
          )
        })}
      </List>
      <Divider />
      <ButtonNoPadding onClick={props.openProjectModal} type="link">
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )

  const handleVisbleChange = (visible: boolean) => {
    retry()
  }

  return (
    <Popover
      placement="bottom"
      content={Content}
      onVisibleChange={handleVisbleChange}
    >
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
