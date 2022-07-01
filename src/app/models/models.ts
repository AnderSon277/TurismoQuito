export interface Place {
  name: string;
  description: string;
  type: string;
  ubication: {
    lat: number;
    lng: number;
  };
}

export interface UserI {
  uid: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  rol: string;
}
