import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const RideOptionCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-12 w-32 mt-4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-around">
            <div className="text-center">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-4 w-16 mt-2" />
            </div>
            <div className="text-center">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-4 w-16 mt-2" />
            </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
