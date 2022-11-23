import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav>
      <div>
        <h1>PokeDex Logo</h1>
      </div>
      <Link href="/">
        <p>Home</p>
      </Link>
      {/* <Link href=""><p>Search</p></Link> */}
      <Link href="/pokemon">
        <p>All Pokemon</p>
      </Link>
    </nav>
  );
}
