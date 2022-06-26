export interface Place {
  id: string;
  name: string;
  description: string;
  type: string;
  ubication: {
    lat: number;
    lng: number;
  };
}
