import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

function Input({
  className,
  ...props
}: InputPrimitive.Props) {
  return (
    <InputPrimitive
      data-slot="input"
      className={cn(
        "flex h-8 w-full min-w-0 rounded-md border border-[#dfe4dc] bg-white px-2 text-[11px] text-[#263b31] outline-none transition placeholder:text-[#69766d] focus-visible:border-[#54836c] focus-visible:ring-2 focus-visible:ring-[#54836c]/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-[#1d3029] dark:text-[#eef3ec] dark:placeholder:text-[#9cae9e]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
