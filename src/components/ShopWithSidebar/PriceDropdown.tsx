import { useState, useEffect } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Product } from '@/types/product';

interface PriceDropdownProps {
  products: Product[];
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
}

const PriceDropdown = ({ products, priceRange, onPriceRangeChange }: PriceDropdownProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);

  // find maximum product price dynamically
  const maxProductPrice = products.length > 0 ? Math.max(...products.map(p => p.discountedPrice || p.price)) : 1000;

  const [selectedPrice, setSelectedPrice] = useState({
    from: 0,
    to: priceRange.max,
  });

  // Sync selectedPrice with priceRange prop changes
  useEffect(() => {
    setSelectedPrice({
      from: 0,
      to: priceRange.max,
    });
  }, [priceRange]);

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className="cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5"
      >
        <p className="text-dark">Price</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setToggleDropdown(!toggleDropdown);
          }}
          id="price-dropdown-btn"
          aria-label="button for price dropdown"
          className={`text-dark ease-out duration-200 ${toggleDropdown && 'rotate-180'}`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {/* dropdown menu */}
      <div className={`p-6 border-t border-gray-2 ${toggleDropdown ? 'block' : 'hidden'}`}>
        <div id="pricingOne">
          <div className="price-range">
            <RangeSlider
              id="range-slider-gradient"
              className="margin-lg"
              min={0}
              max={maxProductPrice}
              step={1}
              value={[selectedPrice.from, selectedPrice.to]}
              onInput={(values) => {
                if (Array.isArray(values) && values.length === 2) {
                  const newRange = {
                    from: Math.floor(Number(values[0])),
                    to: Math.ceil(Number(values[1])),
                  };
                  setSelectedPrice(newRange);
                  onPriceRangeChange({ min: newRange.from, max: newRange.to });
                }
              }}
            />

            <div className="price-amount flex items-center justify-between pt-4">
              <div className="text-custom-xs text-dark-4 flex rounded border border-gray-3/80">
                <span className="block border-r border-gray-3/80 px-2.5 py-1.5 bg-gray-1">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  max={selectedPrice.to - 1}
                  value={selectedPrice.from}
                  onChange={(e) => {
                    const newFrom = Math.max(0, Math.min(Number(e.target.value), selectedPrice.to - 1));
                    const newRange = { from: newFrom, to: selectedPrice.to };
                    setSelectedPrice(newRange);
                    onPriceRangeChange({ min: newRange.from, max: newRange.to });
                  }}
                  className="block px-3 py-1.5 w-20 bg-transparent border-0 outline-none text-center"
                />
              </div>

              <div className="text-custom-xs text-dark-4 flex rounded border border-gray-3/80">
                <span className="block border-r border-gray-3/80 px-2.5 py-1.5 bg-gray-1">
                  $
                </span>
                <input
                  type="number"
                  min={selectedPrice.from + 1}
                  max={maxProductPrice}
                  value={selectedPrice.to}
                  onChange={(e) => {
                    const newTo = Math.max(selectedPrice.from + 1, Math.min(Number(e.target.value), maxProductPrice));
                    const newRange = { from: selectedPrice.from, to: newTo };
                    setSelectedPrice(newRange);
                    onPriceRangeChange({ min: newRange.from, max: newRange.to });
                  }}
                  className="block px-3 py-1.5 w-20 bg-transparent border-0 outline-none text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for the range slider */}
        <style jsx>{`
          :global(.range-slider) {
            margin: 20px 0;
          }
          
          :global(.range-slider .range-slider__track) {
            background: #e5e7eb;
            height: 4px;
            border-radius: 2px;
          }
          
          :global(.range-slider .range-slider__range) {
            background: #3b82f6;
            height: 4px;
            border-radius: 2px;
          }
          
          :global(.range-slider .range-slider__thumb) {
            background: white;
            border: 2px solid #3b82f6;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            cursor: grab;
          }
          
          :global(.range-slider .range-slider__thumb:active) {
            cursor: grabbing;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PriceDropdown;
