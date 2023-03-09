import { Rate } from 'antd'

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: number
  toggleCheck?: (value: number) => void
}

export const Pin = (props: PinProps) => {
  const { checked, toggleCheck, ...rest } = props
  return (
    <Rate
      count={1}
      value={checked}
      onChange={(num) => toggleCheck?.(num)}
      {...rest}
    />
  )
}
