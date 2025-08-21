export const ERROR_ROUTES = {
   500: "/500",
  404: "/404",
  default: (path: string) => {
    return `/${path}`
  }, 
} as const;
