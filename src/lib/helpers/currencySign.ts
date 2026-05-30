export const getCurrencySign = (currency: string): string => {
  switch (currency.toUpperCase()) {
    case "NGN":
      return "₦";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return "₦";
  }
};
