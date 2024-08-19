export enum UserRole {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

export enum Chart {
  CHART_ONE = "CHART_ONE",
  CHART_TWO = "CHART_TWO",
}

export type Ttransport = {
  service?: string | undefined;
  auth: {
    user: string;
    pass: string;
  };
};
