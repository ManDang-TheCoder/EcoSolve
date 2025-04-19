import { CheckCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VerificationBadgeProps {
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
}

export function VerificationBadge({ size = "md", showTooltip = true }: VerificationBadgeProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const badge = <CheckCircle className={`${sizeClasses[size]} fill-emerald-500 text-white`} />

  if (!showTooltip) {
    return badge
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{badge}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Verified Environmental Expert</p>
          <p className="text-xs text-muted-foreground">Credentials and expertise verified by LocalEcoSolve</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
