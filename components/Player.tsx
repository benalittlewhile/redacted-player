import { PlaybackInfo } from "@/lib/types";
import { useSession } from "next-auth/react";

export default function Player({ playback }: { playback: PlaybackInfo }) {
  const session = useSession();

  function playPrevious() {
    if (session?.data?.user) {
      fetch("https://api.spotify.com/v1/me/player/previous", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.data.user.access_token,
        },
      }).then((res) => {
        console.log(res);
      });
    }
  }

  function playNext() {
    if (session?.data?.user) {
      fetch("https://api.spotify.com/v1/me/player/next", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.data.user.access_token,
        },
      }).then((res) => {
        console.log(res);
      });
    }
  }

  function pausePlay() {
    if (session?.data?.user) {
      const target = playback.is_playing ? "pause" : "play";
      fetch(`https://api.spotify.com/v1/me/player/${target}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + session.data.user.access_token,
        },
      }).then((res) => {
        console.log(res);
      });
    }
  }

  return (
    <div id="player" className="flex flex-col items-center gap-28">
      <div
        id="controls"
        className="flex flex-row justify-between w-[60rem] max-w-[80vw]"
      >
        <button onClick={playPrevious}>previous</button>
        <button onClick={pausePlay}>
          {playback.is_playing === false ? "play" : "pause"}
        </button>
        <button onClick={playNext}>next</button>
      </div>
      <div
        id="playbar"
        className="w-[55rem] max-w-[75vw] bg-slate-200 h-2"
      ></div>
    </div>
  );
}
