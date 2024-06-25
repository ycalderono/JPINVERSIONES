import WallpaperCard from './/WallpaperCard';
import { Wallpaper } from '../utils/wallpaperData';

type WallpaperGridProps = {
  wallpapers: Wallpaper[];
};

export default function WallpaperGrid({ wallpapers }: WallpaperGridProps) {
  const rows = wallpapers.reduce<Wallpaper[][]>((acc, wallpaper, index) => {
    if (index % 2 === 0) acc.push([wallpaper]);
    else acc[acc.length - 1].push(wallpaper);
    return acc;
  }, []);

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-4 mb-4">
          {row.map((wallpaper, index) => (
            <WallpaperCard key={index} wallpaper={wallpaper} />
          ))}
        </div>
      ))}
    </div>
  );
}