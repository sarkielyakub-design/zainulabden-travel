"use client";

import { useEffect, useState } from "react";

import PackageCard from "@/src/components/ui/packages/package-card";

import { getPackages } from "@/src/components/ui/services/package-service";

interface PackageType {
  id: number;
  title: string;
  location: string;
  price: number;
  duration: string;
  image: string;
}

export default function PackagesSection() {
  const [packages, setPackages] = useState<
    PackageType[]
  >([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPackages();
  }, []);

  return (
    <section className="py-24">

      <div className="container-custom">

        {/* Header */}
        <div className="mb-14">

          <p className="font-medium text-green-600">
            Featured Packages
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Explore Premium Travel Packages
          </h2>

        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {packages.map((item) => (
            <PackageCard
              key={item.id}
              title={item.title}
              location={item.location}
              price={item.price}
              duration={item.duration}
              image={item.image}
            />
          ))}

        </div>
      </div>
    </section>
  );
}