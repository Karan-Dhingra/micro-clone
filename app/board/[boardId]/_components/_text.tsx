import { cn, colorToCSS } from '@/lib/utils';
import { TextLayer } from '@/types/canvas';
import { useMutation } from '@liveblocks/react/suspense';
import { Kalam } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
}

type props = {
    id: string
    layer: TextLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Text = ({
  layer,
  onPointerDown,
  id,
  selectionColor
}: props) => {
  const {x, y, width, height, fill, value} = layer;

  const updateValue = useMutation(({storage}, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChanges = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      height={height}
      width={width}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : `none`
      }}
    >
        <ContentEditable
          html={value || "Text"}
          onChange={handleContentChanges}
          className={cn(
            "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
            font.className
          )}
          style={{
            fontSize: calculateFontSize(width, height),
            color: fill ? colorToCSS(fill) : "#000"
          }}
        />
    </foreignObject>
  )
}