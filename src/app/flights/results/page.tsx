import { Suspense } from "react";
import FlightResultsClient from "./flightresultsclient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading Flights...
        </div>
      }
    >
      <FlightResultsClient />
    </Suspense>
  );
}