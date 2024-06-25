import WallpaperGrid from './components/WallpaperGrid';
import { wallpapers } from './utils/wallpaperData';

export default function WallpapersPage() {
  return (
    <div>
      <div className="flex justify-center mb-4">
        <h1 className="text-xl font-bold text-center">Fondos de pantalla exclusivos para ti</h1>
      </div>
      <WallpaperGrid wallpapers={wallpapers} />
    </div>
  );
}