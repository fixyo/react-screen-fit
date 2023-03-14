import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { range, shuffle } from 'lodash-es'
import {
  ListBox,
  ButtonGroup,
  Button,
  SquareBox,
  SquareItem,
} from 'components/styled-component'
const initData = range(10)
const createChildElementRectMap = (nodes: HTMLElement | null | undefined) => {
  if (!nodes) {
    return new Map()
  }
  const elements = Array.from(nodes.childNodes) as HTMLElement[]

  return new Map(elements.map((node) => [node, node.getBoundingClientRect()]))
}

export default function Shuffle() {
  const [data, setData] = useState(initData)
  const listRef = useRef<HTMLDivElement>(null)

  const lastRectRef = useRef<Map<HTMLElement, DOMRect>>(new Map())

  useLayoutEffect(() => {
    const currentRectMap = createChildElementRectMap(listRef.current)
    lastRectRef.current.forEach((prevRect, node) => {
      const currentRect = currentRectMap.get(node)

      const invert = {
        left: prevRect.left - currentRect.left,
        top: prevRect.top - currentRect.top,
      }
      console.log(invert)
      console.log(node)

      const keyFrames = [
        { transform: `translate(${invert.left}px, ${invert.top}px)` },
        { transform: 'translate(0,0)' },
      ]

      node.animate(keyFrames, {
        duration: 400,
        easing: `cubic-bezier(0.25, 0.8, 0.25, 1)`,
      })
    })
  }, [data])

  const add = () => {
    setData((prev) => range(prev.length, prev.length + 10).concat(prev))
    lastRectRef.current = createChildElementRectMap(listRef.current)
  }

  const shuffleList = () => {
    setData(shuffle)
    lastRectRef.current = createChildElementRectMap(listRef.current)
  }

  return (
    <ListBox title="demo of ">
      <ButtonGroup>
        <Button onClick={add}>add</Button>
        <Button onClick={shuffleList}>shuffle</Button>
      </ButtonGroup>
      <SquareBox ref={listRef}>
        {data.map((item) => {
          return <SquareItem key={item}>{item}</SquareItem>
        })}
      </SquareBox>
    </ListBox>
  )
}
