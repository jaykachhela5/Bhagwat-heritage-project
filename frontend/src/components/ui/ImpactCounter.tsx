import { memo, useEffect, useRef, useState } from "react";

interface CounterItem {
  label: string;
  target: number;
  suffix?: string;
}

interface ImpactCounterProps {
  items: CounterItem[];
}

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const CounterCard = memo(function CounterCard({ item }: { item: CounterItem }) {
  const { count, ref } = useCountUp(item.target);
  return (
    <div ref={ref} className="text-center p-6">
      <h3 className="text-4xl font-bold text-[#0d3b66] mb-2">
        {count.toLocaleString()}
        {item.suffix ?? "+"}
      </h3>
      <p className="text-gray-600">{item.label}</p>
    </div>
  );
});

export const ImpactCounter = memo(function ImpactCounter({ items }: ImpactCounterProps) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <CounterCard key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
});
