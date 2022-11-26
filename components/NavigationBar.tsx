import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav>
      <div>
        <p>Home</p>
      </div>
      <Link href="/">
        <h1>PokeDex Logo</h1>
      </Link>
      <Link href="/pokemon">
        <p>All Pokemon</p>
      </Link>
    </nav>
  );
}
