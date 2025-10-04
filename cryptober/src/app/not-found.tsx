import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="card text-center">
      <Image
        src="/errors/404.svg"
        alt="Not found"
        width={400}
        height={300}
        className="mx-auto mb-4 max-w-xs h-auto"
        priority
      />
      <h1 className="text-xl font-semibold mb-1">Page not found</h1>
      <p className="muted mb-4">The page youre looking for has vanished into the pumpkin patch.</p>
      <Link href="/" className="btn-accent">Back to Home</Link>
    </div>
  );
}
