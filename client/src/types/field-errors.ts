export type FieldErrors = {
  firstname?: string;
  lastname?: string;
  street?: string;
  zip_code?: string;
  city?: string;
  country?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export type FieldError = {
  field: keyof FieldErrors;
  message: string;
};
