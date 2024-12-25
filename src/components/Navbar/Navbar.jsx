import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-background brightness-[.97] px-4 py-2 rounded-lg shadow-sm mb-4">
      <Link href="/" className=" no-underline font-light hover:font-medium transition-[font]  duration-300">
        <span className="text-sm italic ">Back to home</span>
      </Link>
    </nav>
  );
}
