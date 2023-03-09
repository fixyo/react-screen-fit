import { useEffect } from 'react'

const handleScreenAuto = (): void => {
  const designWidth = 1920 //设计稿的宽度
  const designHeight = 1080 //设计稿的高度

  const scale =
    document.documentElement.clientWidth /
      document.documentElement.clientHeight <
    designWidth / designHeight
      ? document.documentElement.clientWidth / designWidth
      : document.documentElement.clientHeight / designHeight
  ;(
    document.querySelector('#screen') as any
  ).style.transform = `scale(${scale}) translate(-50%, -50%)`
}
export const useScale = () => {
  useEffect(() => {
    handleScreenAuto()
    window.onresize = () => handleScreenAuto()
    return () => {
      window.onresize = null
    }
  }, [])
}
