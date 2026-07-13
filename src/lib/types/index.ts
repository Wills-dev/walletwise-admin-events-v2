import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

export interface TabType {
  value: string;
  label: string;
  content: React.ReactElement;
}

export interface TableWrapperProps<TData = unknown> {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
  prevPage: () => void;
  nextPage: (totalPages: number) => void;
  goToLastPage: (totalPages: number) => void;
  goToFirstPage: () => void;
  isFirstPage: () => boolean;
  isLastPage: (totalPages: number) => boolean;
  limit: number;
  setLimit: (limit: number) => void;
  isLoading?: boolean;
}

export interface LoginProps {
  email: string;
  password: string;
}

interface ApiErrorData {
  message?: string;
  errors?: { message?: string }[];
}

export interface ApiErrorResponse {
  response?: {
    data?: ApiErrorData;
  };
}

export const promiseErrorFunction = (error: ApiErrorResponse) => {
  const { response } = error || {};
  const { data } = response || {};
  const { errors, message } = data || {};

  if (Array.isArray(errors) && errors.length > 0 && errors[0]?.message) {
    return toast.error(errors[0].message);
  }

  if (message) {
    return toast.error(message);
  }

  return toast.error("Internal Server Error! Please contact support.");
};

export interface optionsType {
  label: string;
  value: string;
}

export interface User {
  uniqueId: string;
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  mobile?: string;
  languages?: string[];
  houseAddress?: string;
  state?: string;
  city?: string;
  country?: string;
  bio?: string;
  image?: string;
  profileComplete: boolean;
  emailVerified: boolean;
  role: "user";
}
