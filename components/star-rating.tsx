"use client";

import * as React from "react";

interface StarIconProps {
  filled: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  onMouseEnter?: () => void;
  disabled?: boolean;
}

const StarIcon = ({ filled, size = "medium", onClick, onMouseEnter, disabled }: StarIconProps) => {
  const sizeMap = {
    small: 20,
    medium: 28,
    large: 36,
  };

  const iconSize = sizeMap[size];

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      disabled={disabled}
      style={{
        background: "none",
        border: "none",
        padding: "2px",
        cursor: disabled ? "default" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.15s ease",
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "all 0.2s ease",
        }}
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill={filled ? "#FF9500" : "#E5E5EA"}
          style={{
            transition: "fill 0.2s ease",
          }}
        />
      </svg>
    </button>
  );
};

export interface StarRatingProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  readOnly?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  invalid?: boolean;
  showRequiredIndicator?: boolean;
  required?: boolean;
  name?: string;
}

export const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onValueChange,
      max = 5,
      size = "medium",
      disabled = false,
      readOnly = false,
      label,
      description,
      errorMessage,
      invalid,
      showRequiredIndicator,
      name,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const value = controlledValue ?? internalValue;
    const displayValue = hoverValue ?? value;

    const handleClick = (rating: number) => {
      if (disabled || readOnly) return;
      
      const newValue = rating === value ? 0 : rating;
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    const handleMouseEnter = (rating: number) => {
      if (disabled || readOnly) return;
      setHoverValue(rating);
    };

    const handleMouseLeave = () => {
      setHoverValue(null);
    };

    return (
      <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {label && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <label style={{ 
              fontSize: "14px", 
              fontWeight: 600, 
              color: "#1a1a1a" 
            }}>
              {label}
              {showRequiredIndicator && (
                <span style={{ color: "#FF3B30", marginLeft: "2px" }}>*</span>
              )}
            </label>
          </div>
        )}
        
        <div
          role="radiogroup"
          aria-label={typeof label === "string" ? label : "별점"}
          onMouseLeave={handleMouseLeave}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
            <StarIcon
              key={rating}
              filled={rating <= displayValue}
              size={size}
              onClick={() => handleClick(rating)}
              onMouseEnter={() => handleMouseEnter(rating)}
              disabled={disabled || readOnly}
            />
          ))}
          <input type="hidden" name={name} value={value} />
        </div>

        {description && !invalid && (
          <p style={{ fontSize: "12px", color: "#8E8E93", margin: 0 }}>
            {description}
          </p>
        )}
        
        {errorMessage && invalid && (
          <p style={{ fontSize: "12px", color: "#FF3B30", margin: 0 }}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
StarRating.displayName = "StarRating";
