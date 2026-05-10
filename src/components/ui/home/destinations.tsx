import {
  MapPin,
} from "lucide-react";

const destinations = [
  {
    title: "Makkah",
    image:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1200&auto=format&fit=crop",
    packages: "24 Packages",
    price: "From ₦1.8M",
  },

  {
    title: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    packages: "18 Packages",
    price: "From ₦2.2M",
  },

  {
    title: "Turkey",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1200&auto=format&fit=crop",
    packages: "12 Packages",
    price: "From ₦2.5M",
  },
];

export default function Destinations() {
  return (
    <section className="py-24">
      <div className="container-custom">

        {/* Header */}
        <div className="mb-14">
          <p className="font-medium text-green-600">
            Popular Destinations
          </p>

          <h2 className="mt-3 text-4xl font-bold text-black">
            Explore Top Travel Locations
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {destinations.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Content */}
              <div className="p-6">

                <div className="flex items-center gap-2 text-green-600">
                  <MapPin size={18} />
                  <span className="font-medium">
                    {item.title}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      {item.packages}
                    </p>

                    <h4 className="mt-1 text-lg font-bold text-black">
                      {item.price}
                    </h4>
                  </div>

                  <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700">
                    Explore
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}