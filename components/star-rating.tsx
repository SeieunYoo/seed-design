"use client";

import * as React from "react";
import { Field as SeedField, VisuallyHidden } from "@seed-design/react";
import type { FieldLabelVariantProps } from "@seed-design/css/recipes/field-label";

interface StarProps {
  filled: boolean;
  half?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  onMouseEnter?: () => void;
  disabled?: boolean;
}

const StarIcon = ({ filled, half, size = "medium", onClick, onMouseEnter, disabled }: StarProps) => {
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
        {half ? (
          <>
            <defs>
              <linearGradient id={`half-gradient-${iconSize}`}>
                <stop offset="50%" stopColor="var(--seed-color-warning, #FF9500)" />
                <stop offset="50%" stopColor="var(--seed-color-gray-200, #E5E5EA)" />
              </linearGradient>
            </defs>
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill={`url(#half-gradient-${iconSize})`}
            />
          </>
        ) : (
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={filled ? "var(--seed-color-warning, #FF9500)" : "var(--seed-color-gray-200, #E5E5EA)"}
            style={{
              transition: "fill 0.2s ease",
            }}
          />
        )}
      </svg>
    </button>
  );
};

export interface StarRatingProps {
  /** Current rating value (0-5) */
  value?: number;
  /** Default rating value */
  defaultValue?: number;
  /** Callback when rating changes */
  onValueChange?: (value: number) => void;
  /** Number of stars */
  max?: number;
  /** Size of stars */
  size?: "small" | "medium" | "large";
  /** Whether the rating is disabled */
  disabled?: boolean;
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Label for the field */
  label?: React.ReactNode;
  /** Label weight */
  labelWeight?: FieldLabelVariantProps["weight"];
  /** Indicator text */
  indicator?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** Error message */
  errorMessage?: React.ReactNode;
  /** Whether the field is invalid */
  invalid?: boolean;
  /** Whether to show required indicator */
  showRequiredIndicator?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Field name */
  name?: string;
}

/**
 * StarRating component for collecting user ratings
 * @see Follows seed-design patterns
 */
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
      labelWeight,
      indicator,
      description,
      errorMessage,
      invalid,
      showRequiredIndicator,
      required,
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

    const renderHeader = label || indicator;
    const renderDescription = !!description;
    const renderErrorMessage = errorMessage && invalid;
    const renderFooter = renderDescription || renderErrorMessage;

    return (
      <SeedField.Root
        name={name}
        disabled={disabled}
        invalid={invalid}
        readOnly={readOnly}
        required={required}
        ref={ref}
      >
        {renderHeader && (
          <SeedField.Header>
            <SeedField.Label weight={labelWeight}>
              {label}
              {showRequiredIndicator && <SeedField.RequiredIndicator />}
              {indicator && <SeedField.IndicatorText>{indicator}</SeedField.IndicatorText>}
            </SeedField.Label>
          </SeedField.Header>
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
          <VisuallyHidden>
            <input
              type="hidden"
              name={name}
              value={value}
            />
          </VisuallyHidden>
        </div>
        {renderFooter && (
          <SeedField.Footer>
            {renderDescription &&
              (renderErrorMessage ? (
                <VisuallyHidden asChild>
                  <SeedField.Description>{description}</SeedField.Description>
                </VisuallyHidden>
              ) : (
                <SeedField.Description>{description}</SeedField.Description>
              ))}
            {renderErrorMessage && (
              <SeedField.ErrorMessage>
                {errorMessage}
              </SeedField.ErrorMessage>
            )}
          </SeedField.Footer>
        )}
      </SeedField.Root>
    );
  },
);
StarRating.displayName = "StarRating";
