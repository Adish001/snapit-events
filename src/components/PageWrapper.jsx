export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0f172a] text-ivory">
      {children}
    </div>
  );
}
