export interface RedisUserI {
  role?: string;
  confirmed?: string;
  count?: number;
  refreshtoken?: string;
  confirmtoken?: string;
  codetoken?: string;
  changepasstoken?: string;
}
