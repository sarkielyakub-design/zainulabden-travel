import Image from "next/image";

interface PackageCardProps {
  title: string;
  location: string;
  price: number;
  duration: string;
  image: string;
}

export default function PackageCard({
  title,
  location,
  price,
  duration,
  image,
}: PackageCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-64 w-full">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">

        <p className="text-sm text-green-600">
          {location}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <div className="mt-6 flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Duration
            </p>

            <h4 className="font-semibold">
              {duration}
            </h4>
          </div>

          <div className="text-right">

            <p className="text-sm text-slate-500">
              Starting From
            </p>

            <h4 className="text-xl font-bold text-green-600">
              ₦{price.toLocaleString()}
            </h4>
          </div>

        </div>
      </div>
    </div>
  );
}