export interface CountryItemT {
  name: string;
  flag: string;
}

export interface CountryT {
  status: "SUCCESS" | "LOADING" | "FAILED" | null;
  list: CountryItemT[];
}

export interface RootState {
  countries: CountryT;
}
