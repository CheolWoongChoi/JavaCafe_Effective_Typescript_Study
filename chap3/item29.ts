{
  // GeoJSON 기능을 지원, 처음 예제
  {
    interface CameraOptions {
      center?: LngLat;
      zoom?: number;
      bearing?: number;
      pitch?: number;
    }
    type LngLat =
      | { lng: number; lat: number }
      | { lon: number; lat: number }
      | [number, number];

    declare function setCamera(camera: CameraOptions): void;
    declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;

    type LngLatBounds =
      | { northeast: LngLat; southwest: LngLat }
      | [LngLat, LngLat]
      | [number, number, number, number];

    // GeoJSON 기능을 지원
    {
      type Feature = any;
      const calculateBoundingBox = (f: Feature): LngLatBounds => {
        return {
          northeast: f.geometry.coordinates[0],
          southwest: f.geometry.coordinates[1],
        };
      };

      function focusOnFeature(f: Feature) {
        const bounds = calculateBoundingBox(f);
        const camera = viewportForBounds(bounds);
        setCamera(camera);

        const {
          center: { lat, lng },
          zoom,
        } = camera;

        zoom;
        window.location.search = `?v=@$${lat},${lng}z${zoom}`;
      }
    }
  }

  // 개선한 예제
  {
    interface LngLat {
      lng: number;
      lat: number;
    }
    type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];

    interface Camera {
      center: LngLat;
      zoom: number;
      bearing: number;
      pitch: number;
    }
    interface CameraOptions extends Omit<Partial<Camera>, "center"> {
      center?: LngLatLike;
    }
    type LngLatBounds =
      | { northeast: LngLatLike; southwest: LngLatLike }
      | [LngLatLike, LngLatLike]
      | [number, number, number, number];

    declare function setCamera(camera: CameraOptions): void;
    declare function viewportForBounds(bounds: LngLatBounds): Camera;

    // GeoJSON 기능을 지원
    {
      type Feature = any;
      const calculateBoundingBox = (f: Feature): LngLatBounds => {
        return {
          northeast: f.geometry.coordinates[0],
          southwest: f.geometry.coordinates[1],
        };
      };

      function focusOnFeature(f: Feature) {
        const bounds = calculateBoundingBox(f);
        const camera = viewportForBounds(bounds);
        setCamera(camera);
        const {
          center: { lat, lng },
          zoom,
        } = camera;

        zoom;
        window.location.search = `?v=@$${lat},${lng}z${zoom}`;
      }
    }
  }
}
