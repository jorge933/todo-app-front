interface Error {
  message: string;
  updateConstantly: boolean;
  propertiesToTransform?: Record<string, any>;
}

export interface Errors {
  [key: string]: Error;
}
