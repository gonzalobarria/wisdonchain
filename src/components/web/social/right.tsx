import { cn } from "@/lib/utils"

type RightProps = {
  className?: string
}

const Right = ({ className }: RightProps) => {
  return (
    <div
      className={cn(
        "flex h-[600px] flex-col p-4 md:p-8 max-w-4xls bg-background shadow-lg rounded-lg gap-y-5 md:sticky md:top-24",
        className,
      )}
    >
      <h1>el right2</h1>
    </div>
  )
}

export default Right
