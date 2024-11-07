import * as React from "react"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import clsx from "clsx"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { onClear?: () => void, allowClear?: boolean, wrapClassName?: string }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onClear, allowClear = true, wrapClassName, ...props }, ref) => {
    return (
      <div className={clsx("relative", wrapClassName)}>
        <input
          type={type}
          className={cn(
            "flex h-[42px] w-full rounded-md border border-input bg-inputBg px-[10px] py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground max-md:placeholder:text-[12px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pr-[20px]",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {props.value && allowClear && <X className="h-[16px] w-[16px] opacity-60 absolute right-[6px] top-1/2 -translate-y-1/2 cursor-pointer" onClick={onClear ||  (() => props.onChange?.({ target: { value: '' } } as any))} />}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
