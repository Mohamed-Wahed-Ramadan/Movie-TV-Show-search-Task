'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { Check, X } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const isDestructive = (props as any).variant === 'destructive'
        const icon = isDestructive ? <X className="w-4 h-4 text-white" /> : <Check className="w-4 h-4 text-white" />
        return (
          <Toast
            key={id}
            {...props}
            style={{
              background: 'linear-gradient(90deg, var(--color-background) 20%, rgba(var(--primary-rgb), 1) 100%)',
              border: '1px solid rgba(0,0,0,0.04)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
                {icon}
              </div>
              <div className="grid gap-0">
                {title && <ToastTitle className="text-[color:var(--color-foreground)]">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-[color:var(--color-muted-foreground)]">{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
