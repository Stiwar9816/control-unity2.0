export type ExpectedRoute = {
  [key: string]: string
}

export type RouteConfig = {
  store: () => any;  // Aquí deberías especificar el tipo de tu store
  getName: (row: any) => string;  // Aquí deberías especificar el tipo de tu función getName
  checkKey: string;
  uniqueKey: string;
}