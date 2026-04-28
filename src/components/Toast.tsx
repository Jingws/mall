import { useEffect, useState } from 'react'

let triggerToast: ((msg: string) => void) | null = null

export function showToast(msg: string) {
  triggerToast?.(msg)
}

export default function ToastHost() {
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    triggerToast = (m: string) => {
      setMsg(m)
      setTimeout(() => setMsg(null), 1600)
    }
    return () => {
      triggerToast = null
    }
  }, [])

  if (!msg) return null
  return (
    <div className="toast-host">
      <div className="toast">{msg}</div>
    </div>
  )
}
