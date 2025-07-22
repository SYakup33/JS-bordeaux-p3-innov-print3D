export type ContactErrors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export type ContactError = {
  field: keyof ContactErrors;
  message: string;
};
