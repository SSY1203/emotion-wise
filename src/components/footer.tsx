"use client"

export function Footer() {
  return (
    <footer className="w-full py-6 text-center text-muted-foreground text-sm relative z-10">
      <p>&copy; {new Date().getFullYear()} EmotionWise. All rights reserved.</p>
    </footer>
  );
}
