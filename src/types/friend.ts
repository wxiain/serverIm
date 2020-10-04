export interface Apply {
  username: string;
  nickname: string;
  avatar: string;
  age: number;
  gender: string;
  mobile: string;
  message: string;
  apply_id: number;
}
interface key {
  nickname: string;
  username: string;
  avatar: string;
  email: string;
  gender: string;
  age: string;
  address: string;
  id: string;
}
export interface Agree {
  body: {
    status: string;
    apply: key;
    user: key;
    apply_id: string;
    relation_id: string;
  };
  params: {
    id?: string | number;
  };
}
