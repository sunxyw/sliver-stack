import { useComposition } from "@/hooks/use-composition";
import { cn } from "@/utils/ui";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

interface InputComposition {
  Icon: typeof InputIcon;
}

const iconVariants = cva(
  "absolute top-3 text-gray-dim group-focus-within:text-gray-normal",
  {
    variants: {
      size: {
        default: "size-6",
      },
      side: {
        left: "left-3",
        right: "right-3",
      },
    },
    defaultVariants: {
      size: "default",
      side: "left",
    },
  },
);

export interface InputIconProps
  extends React.HTMLAttributes<HTMLOrSVGElement>,
    VariantProps<typeof iconVariants> {}

const InputIcon = React.forwardRef<HTMLSlotElement, InputIconProps>(
  ({ children, className, size, side }, ref) => {
    return (
      <Slot
        data-icon
        ref={ref}
        className={cn(iconVariants({ size, side }), className)}
      >
        {children}
      </Slot>
    );
  },
);
InputIcon.displayName = "InputIcon";

const inputVariants = cva(
  "flex w-full h-12 p-3 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-normal placeholder:text-gray-dim focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      composition: {
        true: "px-12",
        false: "px-3",
      },
      variant: {
        surface:
          "bg-gray-ui border border-gray-normal focus-visible:border-gray-9 dark:focus-visible:border-graydark-9",
        soft: "bg-bluea-ui border-bluea-normal",
      },
    },
    defaultVariants: {
      composition: false,
      variant: "surface",
    },
  },
);
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className={className} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

const Root = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, variant, ...props }, ref) => {
    const Icons = useComposition(
      children,
      InputIcon.displayName ?? "InputIcon",
    );

    if (Icons.length > 0) {
      return (
        <div className="relative group">
          {Icons}
          <Input
            ref={ref}
            className={cn(
              inputVariants({ composition: true, variant }),
              className,
            )}
            {...props}
          />
        </div>
      );
    }
    return (
      <Input
        ref={ref}
        className={cn(
          inputVariants({ composition: false, variant }),
          className,
        )}
        {...props}
      />
    );
  },
) as React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> &
  InputComposition;

Root.displayName = "Input";
Root.Icon = InputIcon;

export { Root as Input };
