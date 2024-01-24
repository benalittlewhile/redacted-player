import Player from "@/components/Player";
import { DefaultPlaybackInfo, PlaybackInfo } from "@/lib/types";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const session = useSession();
  const [isPaused, setIsPaused] = useState(true);
  const [playBackInfo, setPlaybackInfo] =
    useState<PlaybackInfo>(DefaultPlaybackInfo);

  function heartbeat() {
    if (session?.data?.user && isPaused === false) {
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: "Bearer " + session.data.user.access_token,
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setPlaybackInfo(res);
          });
        } else {
          setPlaybackInfo({ ...DefaultPlaybackInfo, is_playing: false });
        }
      });
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused !== true) {
        heartbeat();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

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
        {session.status === "authenticated" ? (
          <Player playback={playBackInfo}></Player>
        ) : null}
        <p>
          {session.status === "authenticated" ? (
            <button className="mr-2" type="button" onClick={() => signOut()}>
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
          <button
            type="button"
            onClick={() => {
              setIsPaused((isPaused) => {
                console.log("isPaused = ", !isPaused);
                return !isPaused;
              });
            }}
          >
            toggle heartbeat
          </button>
        </p>
      </main>
    </div>
  );
};

export default Home;
