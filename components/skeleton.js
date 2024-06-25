import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonPlate = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-screen-lg">
                <div className="w-2/3 mx-auto">
                    <Skeleton className="w-full h-28 rounded-full flex justify-center" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <Skeleton className="w-full h-16 rounded-full" />
                    <Skeleton className="w-full h-16 rounded-full" />
                    <Skeleton className="w-full h-16 rounded-full" />
                    <Skeleton className="w-full h-16 rounded-full" />
                </div>
                  <div className="flex justify-between mt-8">
                    <Skeleton className="w-1/4 h-16 rounded-full" />
                    <Skeleton className="w-1/4 h-16 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonPlate;
