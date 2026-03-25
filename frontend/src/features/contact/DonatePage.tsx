import { memo, useEffect } from "react";
import { EXTERNAL_RAZORPAY_DONATE_URL } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

export default memo(function DonatePage() {
  usePageMeta("Donate", "Redirecting to payment link.");

  useEffect(() => {
    window.open(EXTERNAL_RAZORPAY_DONATE_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section className="min-h-[45vh] flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-[#123753] font-semibold mb-3">Redirecting to secure payment page...</p>
        <a
          href={EXTERNAL_RAZORPAY_DONATE_URL}
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Payment Link
        </a>
      </div>
    </section>
  );
});
