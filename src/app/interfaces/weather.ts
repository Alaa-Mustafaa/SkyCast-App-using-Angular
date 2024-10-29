export interface Weather {

        day: string;
        summary: string;
        icon: number;
        weather: string;
        temperature: number;
        temperature_max: number;
        temperature_min: number;
        cloud_cover: {
          total: number;
        };
        precipitation: {
          total: number;
          type: string;
        };
        wind: {
          speed: number;
          dir: string;
          angle: number;
        };
        morning: null | string;
        afternoon: null | string;
        evening: null | string;
            
}
