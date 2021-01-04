/*  
  this fields related to user
  exists only in redis database
  which is shared between microservices
*/
export interface RedisUser {
  role?: string;
  confirmed?: string;
  count?: number;
  refreshtoken?: string;
  confirmtoken?: string;
  codetoken?: string;
  changepasstoken?: string;
}
