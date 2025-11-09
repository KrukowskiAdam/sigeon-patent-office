import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function NewsSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="overflow-hidden shadow-md bg-gray-50 border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* Image skeleton */}
            <div className="md:w-1/3 flex items-center justify-center bg-gray-50 p-8">
              <div className="relative w-[80%] aspect-video">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="md:w-2/3 flex flex-col">
              <CardHeader className="pt-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-20" /> {/* Badge */}
                    <Skeleton className="h-6 w-3/4" /> {/* Title */}
                    <Skeleton className="h-4 w-24" /> {/* Date */}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="mt-4">
                  <Skeleton className="h-10 w-32" /> {/* Button */}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export function HomepageNewsSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="overflow-hidden shadow-md bg-gray-50 border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* Image skeleton - smaller for homepage */}
            <div className="md:w-1/3 flex items-center justify-center bg-gray-50 p-8">
              <div className="relative w-[64%] aspect-video">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="md:w-2/3 flex flex-col">
              <CardHeader className="pt-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-3/4" /> {/* Smaller title for homepage */}
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="mt-4">
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}