import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (error && "data" in error) {
    return (error.data as { error: string }).error;
  }
  return "";
};
