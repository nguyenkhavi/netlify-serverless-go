type LocationDetail =
  | {
      ip: string;
      country_code: string;
      country_name: string;
      region_code: string;
      region_name: string;
      city: string;
      zip_code: string;
      time_zone: string;
      latitude: number;
      longitude: number;
      metro_code: number;
    }
  | {
      status: boolean;
      msg: string;
    };

declare module 'ip-to-location' {
  export function fetch(ip: string): Promise<LocationDetail>;
}
