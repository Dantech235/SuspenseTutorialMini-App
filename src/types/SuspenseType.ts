export interface SuspenseType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface SuspensePostType {
  name: string;
  email: string;
  password: string;
}
export interface SuspensePostsType {
  userId: number;
  id: number;
  title: string;
}
export interface SuccessSuspenseType {
  feedback?: string;
}
export interface SuspenseInfiniteType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
