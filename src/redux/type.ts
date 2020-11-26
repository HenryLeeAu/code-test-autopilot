export interface CountryItemT {
  name: string;
  flag: string;
}

export interface CountryT {
  status: string | null;
  list: CountryItemT[];
}

export interface RootState {
  countries: CountryT;
}
