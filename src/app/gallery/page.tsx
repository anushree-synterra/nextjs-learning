import Image from "next/image";
import flowerPic from "./flower.jpg";
import dearPic from "./dear.jpg";

export default function Gallery() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-sky-400">Gallery</h1>

      {/* Level 4: full-width banner, seen first, so eager */}
      <Image
        src={flowerPic}
        alt="A flower"
        className="mt-6 w-full h-64 object-cover"
        loading="eager"
        placeholder="blur"
        sizes="100vw"
      />

      {/* Level 2: deer from /public, 200px wide */}
      <Image
        src="/dear.jpg"
        alt="A deer"
        width={200}
        height={150}
        className="mt-8"
      />

      {/* Level 3: deer imported, 200px wide, blur, small file */}
      <Image
        src={dearPic}
        alt="A deer"
        placeholder="blur"
        className="mt-8 w-50"
        sizes="200px"
      />

      {/* Level 5: equal product cards */}
      <div className="flex flex-wrap gap-6 mt-8">
        <div>
          <div className="relative w-75 h-50">
            <Image
              src="/cat.png"
              alt="A cat"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <p className="mt-2">Cat</p>
        </div>
        <div>
          <div className="relative w-75 h-50">
            <Image
              src="/flower.jpg"
              alt="A flower"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <p className="mt-2">Flower</p>
        </div>
        <div>
          <div className="relative w-75 h-50">
            <Image
              src="/dear.jpg"
              alt="A deer"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <p className="mt-2">Deer</p>
        </div>
        <div>
          <div className="relative w-75 h-50">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt="A mountain"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <p className="mt-2">Mountain</p>
        </div>
      </div>
    </main>
  );
}
