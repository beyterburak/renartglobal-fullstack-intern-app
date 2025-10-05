import { useState } from 'react';
import ColorPicker from './ColorPicker';
import PopularityScore from './PopularityScore';

function ProductCard({ product }) {
    const [selectedColor, setSelectedColor] = useState('yellow');

    const getMetalTypeName = (color) => {
        const names = {
            yellow: 'Yellow Gold',
            white: 'White Gold',
            rose: 'Rose Gold'
        };
        return names[color] || 'Yellow Gold';
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01] hover:shadow-lg">
            {/* 1. Single Image (changes with color picker) */}
            <div className="w-full aspect-square bg-gray-50 flex items-center justify-center">
                <img
                    src={product.images[selectedColor]}
                    alt={`${product.name} - ${getMetalTypeName(selectedColor)}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />
            </div>

            <div className="p-4">
                {/* 2. Product Title */}
                <h3 className="font-montserrat font-medium text-[15px] text-black">
                    {product.name}
                </h3>

                {/* 3. Price - Close to title */}
                <p className="font-montserrat font-normal text-[15px] text-black mt-1">
                    {product.priceFormatted}
                </p>

                {/* 4. Color Picker - More space after price */}
                <div className="mt-4">
                    <ColorPicker
                        selected={selectedColor}
                        onChange={setSelectedColor}
                    />
                </div>

                {/* 5. Metal Type */}
                <p className="font-avenir font-normal text-[12px] text-black mt-2">
                    {getMetalTypeName(selectedColor)}
                </p>

                {/* 6. Popularity Score - At the bottom, less space */}
                <div className="mt-1">
                    <PopularityScore score={product.popularityScore} />
                </div>
            </div>
        </div>
    );
}

export default ProductCard;