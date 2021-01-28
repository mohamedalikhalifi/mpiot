export interface User {
  id: string;
  firstName: string;
  lastName: string;
  access: boolean;
  dateCreated: string;
  imagePath:string;
}

// this is the user model inside mongo
export interface _User {
  _id: string;
  firstName: string;
  lastName: string;
  access: boolean;
  dateCreated: string;
  imagePath:string;
}
