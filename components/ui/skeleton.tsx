import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { skeletonAnimation } from "@/utils/animations";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  /**
   * Whether to show the pulse animation
   * @default true
   */
  animate?: boolean;
}

const Skeleton = ({
  className,
  animate = true,
  ...props
}: SkeletonProps) => {
  if (animate) {
    return (
      <motion.div
        className={cn(
          "h-5 w-full rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800",
          className
        )}
        variants={skeletonAnimation}
        animate="animate"
        initial="animate"
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "h-5 w-full rounded-md bg-gray-200 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
};

Skeleton.displayName = "Skeleton";

export { Skeleton };

// Common skeleton components for reuse
export const SkeletonCircle = ({ className, ...props }: SkeletonProps) => (
  <Skeleton
    className={cn("aspect-square rounded-full", className)}
    {...props}
  />
);

export const SkeletonText = ({ className, ...props }: SkeletonProps) => (
  <Skeleton
    className={cn("h-4 w-[250px]", className)}
    {...props}
  />
);

export const SkeletonButton = ({ className, ...props }: SkeletonProps) => (
  <Skeleton
    className={cn("h-10 w-[100px] rounded-md", className)}
    {...props}
  />
);

export const SkeletonCard = ({ className, ...props }: SkeletonProps) => (
  <Skeleton
    className={cn("h-[300px] w-full rounded-xl", className)}
    {...props}
  />
);

export const SkeletonAvatar = ({ className, ...props }: SkeletonProps) => (
  <Skeleton
    className={cn("h-12 w-12 rounded-full", className)}
    {...props}
  />
);

export const SkeletonInput = ({ className, ...props }: SkeletonProps) => (
  <Skeleton
    className={cn("h-10 w-full rounded-md", className)}
    {...props}
  />
);

// Loading skeleton for user card
export const SkeletonUserCard = () => (
  <div className="flex flex-col space-y-3 p-4 border rounded-lg shadow-sm">
    <div className="flex items-center space-x-4">
      <SkeletonAvatar />
      <div className="space-y-2">
        <SkeletonText className="h-5 w-[150px]" />
        <SkeletonText className="h-4 w-[100px]" />
      </div>
    </div>
    <SkeletonText className="h-4 w-full" />
    <SkeletonText className="h-4 w-3/4" />
  </div>
);

// Loading skeleton for table
export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="w-full space-y-3">
    <div className="flex w-full space-x-4">
      <SkeletonText className="h-8 w-1/4" />
      <SkeletonText className="h-8 w-1/4" />
      <SkeletonText className="h-8 w-1/4" />
      <SkeletonText className="h-8 w-1/4" />
    </div>
    <div className="space-y-3">
      {Array(rows)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="flex w-full space-x-4">
            <SkeletonText className="h-6 w-1/4" />
            <SkeletonText className="h-6 w-1/4" />
            <SkeletonText className="h-6 w-1/4" />
            <SkeletonText className="h-6 w-1/4" />
          </div>
        ))}
    </div>
  </div>
);

// Loading skeleton for profile
export const SkeletonProfile = () => (
  <div className="space-y-6">
    <div className="flex items-center space-x-4">
      <SkeletonAvatar className="h-20 w-20" />
      <div className="space-y-3">
        <SkeletonText className="h-6 w-[200px]" />
        <SkeletonText className="h-4 w-[150px]" />
      </div>
    </div>
    <div className="space-y-2">
      <SkeletonText className="h-4 w-full" />
      <SkeletonText className="h-4 w-full" />
      <SkeletonText className="h-4 w-3/4" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
    </div>
  </div>
);
