const COLOR_CONFIG = {
    yellow: { hex: '#E6CA97', label: 'Yellow Gold' },
    white: { hex: '#D9D9D9', label: 'White Gold' },
    rose: { hex: '#E1A4A9', label: 'Rose Gold' }
};

function ColorPicker({ selected, onChange }) {
    return (
        <div className="flex gap-2 justify-start mt-2">
            {Object.entries(COLOR_CONFIG).map(([key, { hex, label }]) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={`
            w-5 h-5 
            rounded-full 
            border-[1px] 
            transition-all
            hover:scale-110
            ${selected === key
                            ? 'ring-1 ring-offset-1 ring-black'
                            : 'border-gray-300'
                        }
          `}
                    style={{ backgroundColor: hex }}
                    aria-label={`Select ${label}`}
                    title={label}
                />
            ))}
        </div>
    );
}

export default ColorPicker;