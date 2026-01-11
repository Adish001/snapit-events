export default function Section({ title, subtitle, children }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {title && (
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
          {title}
        </h1>
      )}

      {subtitle && (
        <p className="text-center text-gray-400 mb-10">
          {subtitle}
        </p>
      )}

      {children}
    </section>
  );
}
