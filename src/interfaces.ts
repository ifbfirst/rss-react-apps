export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confPassword: string;
  gender: string;
  country: string;
  agreement: boolean;
  image: FileList;
}

export interface DataStore {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  image: string;
}
