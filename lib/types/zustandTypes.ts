export type formType = "Login" | "Register";
export type authFormType = {
  formType: formType;
  setFormType: (newFormType: formType) => void;
};

export type toggleTableType = {
  toggle: boolean;
  setToggle: (newToggle: boolean) => void;
};

export type diagnoseFileType = {
  url: string;
  setUrl: (newUrl: string) => void;
};

export type ResultType = {
  result: string;
  confidence: string;
  setResult: (newResult: string) => void;
  setConfidence: (newConfidence: string) => void;
};
