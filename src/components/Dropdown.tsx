import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DropdownProps {
  value?: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown = ({ value, placeholder, options, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const displayValue = value || placeholder;
  const hasValue = Boolean(value);

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <button
        type="button"
        className={`
          w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          hover:border-gray-400 transition-colors duration-150
          ${!hasValue ? "text-gray-500" : "text-gray-900"}
        `}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setFocusedIndex(-1);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
      >
        <span className="block truncate">{displayValue}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul
            role="listbox"
            className="py-1 max-h-60 overflow-auto focus:outline-none"
            tabIndex={-1}
          >
            {options.map((option, index) => {
              const isSelected = option === value;
              const isFocused = index === focusedIndex;

              return (
                <li
                  key={option}
                  role="option"
                  aria-selected={isSelected}
                  className={`
                    relative cursor-pointer select-none py-2 pl-3 pr-9
                    ${isFocused ? "bg-blue-100 text-blue-900" : "text-gray-900"}
                    ${isSelected ? "bg-blue-50" : ""}
                    hover:bg-blue-100 hover:text-blue-900
                  `}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <span
                    className={`block truncate ${
                      isSelected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option}
                  </span>
                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
