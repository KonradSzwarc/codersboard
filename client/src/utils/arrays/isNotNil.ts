/**
 * Checks if value is not null or undefined.
 * @param value Value to check.
 */
export const isNotNil = <TValue>(value: TValue | null | undefined): value is TValue => {
  return value !== null && value !== undefined;
};
