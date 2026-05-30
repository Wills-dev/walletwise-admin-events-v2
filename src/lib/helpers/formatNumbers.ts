export function numberWithCommas(x: number | string) {
  const num = parseFloat(x.toString());
  return Number.isInteger(num)
    ? num.toLocaleString()
    : num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}

export const formatInputTextNumber = (value: string) => {
  // Remove all non-numeric characters
  return value.replace(/\D/g, "");
};

export const formatInputTextNumberWithCommas = (value: string) => {
  // Remove all non-numeric characters except for the decimal point
  let numericValue = value.replace(/,/g, "").replace(/[^0-9.]/g, "");

  // Ensure only one decimal point is allowed
  const parts = numericValue.split(".");

  if (parts.length > 2) {
    numericValue = parts[0] + "." + parts[1]; // Keep only first decimal
  }

  // Limit decimal places to two
  if (parts[1]?.length > 2) {
    numericValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
  }

  // Format with commas for thousands
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatAmount = (amount: number) => {
  if (amount < 1000) {
    return amount.toString();
  } else if (amount < 1000000) {
    return (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1) + "k";
  } else if (amount < 1000000000) {
    return (amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1) + "m";
  } else if (amount < 1000000000000) {
    return (
      (amount / 1000000000).toFixed(amount % 1000000000 === 0 ? 0 : 1) + "b"
    );
  } else {
    return (
      (amount / 1000000000000).toFixed(amount % 1000000000000 === 0 ? 0 : 1) +
      "t"
    );
  }
};
