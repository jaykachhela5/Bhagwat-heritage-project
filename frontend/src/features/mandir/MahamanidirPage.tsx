import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { useApi } from "../../hooks/useApi";
import { mandirApi } from "../../services/api/misc";

export default memo(function MahamanidirPage() {
  const { data } = useApi(() => mandirApi.get());

  return (
    <div>
      <HeroSection title="63-Ft Hanuman Mahamandir" subtitle="Dham Chandrapur, Maharashtra" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">{data?.title ?? "Kast Bhanjan Hanuman"}</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-10">
          {data?.about ??
            "Our 63-foot Hanuman idol is a symbol of devotion and strength. The temple serves as a spiritual center for thousands of devotees and is the home of regular pujas, bhajans, and seva programs."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="font-bold text-[#0d3b66] text-lg mb-2">Morning Darshan</h3>
            <p className="text-gray-600">{data?.morningTime ?? "09:00 AM – 12:00 PM"}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="font-bold text-[#0d3b66] text-lg mb-2">Afternoon</h3>
            <p className="text-gray-600">{data?.afternoonTime ?? "01:00 PM – 03:00 PM"}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="font-bold text-[#0d3b66] text-lg mb-2">Evening Aarti</h3>
            <p className="text-gray-600">{data?.eveningTime ?? "04:00 PM – 09:00 PM"}</p>
          </div>
        </div>
      </section>

      <div className="text-center pb-12">
        <Link to="/mandir/gallery" className="btn-primary mr-4">View Gallery</Link>
        <Link to="/get-involved" className="btn-secondary">Plan a Visit</Link>
      </div>
    </div>
  );
});
