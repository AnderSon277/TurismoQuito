export interface Place {
  name: string;
  description: string;
  type: string;
  ubication: {
    lat: number;
    lng: number;
  };
}
