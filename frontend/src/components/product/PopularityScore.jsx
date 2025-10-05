import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

function PopularityScore({ score, showStars = true }) {
    const displayScore = (score * 5).toFixed(1);
    const outOf5 = score * 5;
    const fullStars = Math.floor(outOf5);
    const hasHalfStar = (outOf5 % 1) >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-2">
            {showStars && (
                <div className="flex gap-0.5">
                    {/* Full Stars */}
                    {[...Array(fullStars)].map((_, i) => (
                        <FaStar
                            key={`full-${i}`}
                            className="w-4 h-4 text-yellow-400"
                        />
                    ))}

                    {/* Half Star */}
                    {hasHalfStar && (
                        <FaStarHalfAlt className="w-4 h-4 text-yellow-400" />
                    )}

                    {/* Empty Stars */}
                    {[...Array(Math.max(0, emptyStars))].map((_, i) => (
                        <FaRegStar
                            key={`empty-${i}`}
                            className="w-4 h-4 text-gray-300"
                        />
                    ))}
                </div>
            )}

            {/* Score Text */}
            <span className="font-avenir font-normal text-[14px] text-gray-950">
                {displayScore}/5
            </span>
        </div>
    );
}

export default PopularityScore;