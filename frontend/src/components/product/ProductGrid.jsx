import ProductCard from './ProductCard';
import Skeleton from '../ui/Skeleton';

function ProductGrid({ products, loading, error }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px] p-4">
                <div className="text-center">
                    <p className="text-red-600 text-lg font-medium mb-2">Error loading products</p>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px] p-4">
                <p className="text-gray-600 text-lg">No products found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductGrid;