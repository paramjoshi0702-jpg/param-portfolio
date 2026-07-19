'use client';

export function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 animate-blob"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <div
        className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 animate-blob"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent 70%)', animationDelay: '4s' }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] rounded-full blur-[120px] opacity-20 animate-blob"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)', animationDelay: '8s' }}
      />
    </div>
  );
}
