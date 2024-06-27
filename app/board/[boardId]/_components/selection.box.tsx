"use client";

import { useSelectionBounds } from '@/hooks/use-selection-bound';
import { LayerType, Side, XYWH } from '@/types/canvas';
import { useSelf, useStorage } from '@liveblocks/react/suspense';
import React, { memo } from 'react'

type Props = {
    onResizeHandlePointDown: (cordner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8

const SelectionBox = memo(({ onResizeHandlePointDown }: Props) => {
  const soleLayerId = useSelf(me => me.presence.selection.length === 1 ? me.presence.selection[0] : null)

  const isShowingHandles = useStorage(root => {
    return soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
  })

  const bounds = useSelectionBounds();

  if(!bounds){
    return null;
  }

  return (
    <>
        <rect
            className='fill-transparent stroke-blue-500 stroke-1 pointer-events-none'
            style={{
                transform: `translateX(${bounds.x}px) translateY(${bounds.y}px)`
            }}
            x={0}
            y={0}
            height={bounds.height}
            width={bounds.width}
        />

        {isShowingHandles && (
            <>
                {/* Top-Left */}
                <rect
                    className='fill-white stroke-1 stroke-blue-500'
                    x={0}
                    y={0}
                    style={{
                        cursor: "nwse-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH/2}px, ${bounds.y - HANDLE_WIDTH/2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onResizeHandlePointDown(Side.Top + Side.Left, bounds)
                    }}
                />

                {/* Top-Center */}
                <rect
                    className='fill-white stroke-1 stroke-blue-500'
                    x={0}
                    y={0}
                    style={{
                        cursor: "ns-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x + (bounds.width - HANDLE_WIDTH)/2}px, ${bounds.y - HANDLE_WIDTH/2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onResizeHandlePointDown(Side.Top, bounds)
                    }}
                />

                {/* Top-Right */}
                <rect
                    className='fill-white stroke-1 stroke-blue-500'
                    x={0}
                    y={0}
                    style={{
                        cursor: "nesw-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH/2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH/2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onResizeHandlePointDown(Side.Top + Side.Right, bounds)
                    }}
                />

                {/* Right-Center */}
                <rect
                    className='fill-white stroke-1 stroke-blue-500'
                    x={0}
                    y={0}
                    style={{
                        cursor: "ew-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH/2 + bounds.width}px, ${bounds.y + bounds.height/2 - HANDLE_WIDTH/2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onResizeHandlePointDown(Side.Right, bounds)
                    }}
                />

                {/* Bottom-Right */}
                <rect
                    className='fill-white stroke-1 stroke-blue-500'
                    x={0}
                    y={0}
                    style={{
                        cursor: "nwse-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH/2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH/2 + bounds.height}px)`
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onResizeHandlePointDown(Side.Bottom + Side.Right, bounds)
                    }}
                />

                {/* Bottom-Center */}
                <rect
                    className='fill-white stroke-1 stroke-blue-500'
                    x={0}
                    y={0}
                    style={{
                        cursor: "ns-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x + (bounds.width - HANDLE_WIDTH)/2}px, ${bounds.y + bounds.height - HANDLE_WIDTH/2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onResizeHandlePointDown(Side.Bottom, bounds)
                    }}
                />

                {/* Bottom-Left */}
                <rect
                    className='fill-white stroke-1 stroke-blue-500'
                    x={0}
                    y={0}
                    style={{
                        cursor: "nesw-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x + - HANDLE_WIDTH/2}px, ${bounds.y + bounds.height - HANDLE_WIDTH/2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onResizeHandlePointDown(Side.Bottom + Side.Left, bounds)
                    }}
                />

                {/* Left-Center */}
                <rect
                    className='fill-white stroke-1 stroke-blue-500'
                    x={0}
                    y={0}
                    style={{
                        cursor: "ew-resize",
                        width: `${HANDLE_WIDTH}px`,
                        height: `${HANDLE_WIDTH}px`,
                        transform: `translate(${bounds.x - HANDLE_WIDTH/2}px, ${bounds.y + bounds.height/2 - HANDLE_WIDTH/2}px)`
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onResizeHandlePointDown(Side.Left, bounds)
                    }}
                />
            </>
        )}
    </>
  )
});

export default SelectionBox

SelectionBox.displayName = "SelectionBox"