export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TYPEORM_CONNECTION: "mysql" | "mariadb";
    }
  }
  interface TestType {
        id: string;
  }
}