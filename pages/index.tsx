import Player from "@/components/Player";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <div>
      <Head>
        <title>[Redacted] Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 `}
      >
        <header></header>
        {session.status === "authenticated" ? <Player></Player> : null}
        <p>
          {session.status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              Sign out {session.data.user?.email}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signIn("spotify")}
              disabled={session.status === "loading"}
            >
              Sign in with Spotify
            </button>
          )}
        </p>
      </main>
    </div>
  );
};

export default Home;
