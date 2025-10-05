function Skeleton() {
    return (
        <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-300 h-64 w-full"></div>

            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-12 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>

                <div className="flex gap-2 justify-center mt-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

export default Skeleton;