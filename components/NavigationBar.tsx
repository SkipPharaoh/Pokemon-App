import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav>
      <div>
        <h1>PokeDex Logo</h1>
      </div>
      <Link href="/">Home</Link>
      {/* <Link href="">Search</Link> */}
      <Link href="/pokemon">All Pokemon</Link>
    </nav>
  );
}
