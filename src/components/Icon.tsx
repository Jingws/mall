/**
 * 线性 SVG 图标库 —— 与原模板的 emoji 形成视觉对比
 * 统一 24×24 viewBox，stroke 走 currentColor，外部用 color 控制颜色
 */
import type { CSSProperties } from 'react'

export type IconName =
  | 'home'
  | 'grid'
  | 'cart'
  | 'user'
  | 'back'
  | 'close'
  | 'search'
  | 'message'
  | 'check'
  | 'plus'
  | 'minus'
  | 'trash'
  | 'store'
  | 'package'
  | 'truck'
  | 'refund'
  | 'star'
  | 'heart'
  | 'location'
  | 'headset'
  | 'settings'
  | 'help'
  | 'wallet'
  | 'ticket'
  | 'footprint'
  | 'arrow-right'
  | 'chevron-right'
  | 'bolt'
  | 'sparkle'
  | 'fire'
  | 'shield'
  | 'pad'
  | 'cpu'
  | 'cube'
  | 'mech'
  | 'audio'
  | 'light'
  | 'keyboard'
  | 'qrcode'
  | 'card'
  | 'edit'

interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
  style?: CSSProperties
}

export default function Icon({
  name,
  size = 22,
  strokeWidth = 1.6,
  className,
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const paths: Record<IconName, JSX.Element> = {
  home: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v9h5v-6h4v6h5v-9" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5L7 14.5h11L20 7H7" />
      <circle cx="9" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 5-6.5 8-6.5s6.5 2 8 6.5" />
    </>
  ),
  back: <path d="M15 5l-7 7 7 7" />,
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  message: (
    <>
      <path d="M4 5h16v11H8l-4 4z" />
      <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  check: <path d="M4 12.5l5 5 11-11" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </>
  ),
  store: (
    <>
      <path d="M3 8l1.5-4h15L21 8" />
      <path d="M5 8c0 2-1 3-2 3 0 0 1.5 1.5 3.5 0.5 1 1.5 3 1.5 4 0 1 1.5 3 1.5 4 0 1 1.5 3 1.5 4 0 1.5 1.5 3.5 0 3.5-0.5C21 11 20 10 20 8" />
      <path d="M5 11v9h14v-9" />
    </>
  ),
  package: (
    <>
      <path d="M4 7l8-4 8 4-8 4-8-4z" />
      <path d="M4 7v10l8 4 8-4V7" />
      <path d="M12 11v10" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h12v9H3z" />
      <path d="M15 9h4l2 3v3h-6" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  refund: (
    <>
      <path d="M4 12a8 8 0 0 1 14-5" />
      <path d="M18 4v3h-3" />
      <path d="M20 12a8 8 0 0 1-14 5" />
      <path d="M6 20v-3h3" />
    </>
  ),
  star: (
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
  ),
  heart: (
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  ),
  location: (
    <>
      <path d="M12 21s-6-6-6-11a6 6 0 1 1 12 0c0 5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h3v6H4z" />
      <path d="M17 14h3v6h-3z" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9.5a3 3 0 1 1 4.5 2.6c-1 0.5-1.5 1.2-1.5 2.4" />
      <path d="M12 17.5v0.5" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4z" />
      <path d="M4 7V5h12v2" />
      <circle cx="16" cy="13" r="1.4" />
    </>
  ),
  ticket: (
    <>
      <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
      <path d="M14 6v12" strokeDasharray="2 2" />
    </>
  ),
  footprint: (
    <>
      <ellipse cx="9" cy="13" rx="2.4" ry="3.6" />
      <ellipse cx="15" cy="9" rx="1.8" ry="2.6" />
      <circle cx="6" cy="20" r="1" />
      <circle cx="11" cy="20" r="1" />
      <circle cx="13" cy="5" r="0.8" />
      <circle cx="17" cy="5" r="0.8" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6z" />,
  sparkle: (
    <>
      <path d="M12 4v6M12 14v6M4 12h6M14 12h6" />
      <path d="M7 7l3 3M14 14l3 3M7 17l3-3M14 10l3-3" strokeDasharray="0 6 1 0" />
    </>
  ),
  fire: (
    <path d="M12 3s-1 2-1 4 1.2 3 1.2 4.5S10 14 9 14c-2 0-4-1.5-4-4 0-1 .5-2 1-2 0 4 4 4 4 0 0-3 2-5 2-5zM7 19a5 5 0 1 0 10 0c0-2-1-3.5-2.5-4.5 0 2-2 3-2 1 0-1 .5-2 .5-2-3 1-6 3-6 5.5z" />
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  pad: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="3" />
      <path d="M7 12h3M8.5 10.5v3" />
      <circle cx="15" cy="11" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  cube: (
    <>
      <path d="m12 3 9 5v8l-9 5-9-5V8z" />
      <path d="m3 8 9 5 9-5" />
      <path d="M12 13v8" />
    </>
  ),
  mech: (
    <>
      <path d="M8 3h8v4l2 2v3l-2 1v6l-3 3h-2l-3-3v-6l-2-1V9l2-2z" />
      <circle cx="10" cy="11" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14" cy="11" r="0.8" fill="currentColor" stroke="none" />
      <path d="M10 16h4" />
    </>
  ),
  audio: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h2.5a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 6.5 20H5a1 1 0 0 1-1-1z" />
      <path d="M20 14h-2.5a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5H19a1 1 0 0 0 1-1z" />
    </>
  ),
  light: (
    <>
      <rect x="6" y="3" width="12" height="14" rx="2" />
      <circle cx="9" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="9" cy="13" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="0.8" fill="currentColor" stroke="none" />
      <path d="M10 17v3M14 17v3" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M5 9.5h.01M8 9.5h.01M11 9.5h.01M14 9.5h.01M17 9.5h.01M19 9.5h.01" />
      <path d="M5 13h.01M8 13h.01M11 13h.01M14 13h.01M17 13h.01M19 13h.01" />
      <path d="M7 16h10" />
    </>
  ),
  qrcode: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h3v3M20 14v3M14 18v3h3M17 17h0.01M20 20h.01" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </>
  ),
  edit: (
    <>
      <path d="M5 19h3l9-9-3-3-9 9z" />
      <path d="m14 7 3 3" />
    </>
  ),
}
