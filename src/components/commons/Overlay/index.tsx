import classNames from "classnames"
import { useRef } from "react"

interface OverlayProps {
  children: React.ReactNode,
  className?: string,
  outSideClick?: () => void
}

export const Overlay = ({ children, className, outSideClick }: OverlayProps) => {
  const outSideRef = useRef<any>(null)

  const handleClick = (e: any) => {
    if (outSideRef.current && outSideRef?.current === e?.target) {
      outSideClick?.()
    }
  }

  return (
    <div
      className={classNames(className, "z-99 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50")}
      ref={outSideRef}
      onClick={handleClick}
    >
      <div className="z-100">{children}</div>
    </div>
  )
}