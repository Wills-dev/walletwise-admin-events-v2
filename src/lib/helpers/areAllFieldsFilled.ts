export const areAllFieldsFilled = <T extends { [K in keyof T]: string }>(
  obj: T
): boolean => {
  return (Object.values(obj) as string[]).every((value) => value.trim() !== "");
};
