import { useSession } from "next-auth/react";

export default function Player() {
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

  async function pausePlay() {
    if (session?.data?.user) {
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: "Bearer " + session.data.user.access_token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const target = res.is_playing ? "pause" : "play";
          if (session.data?.user) {
            fetch(`https://api.spotify.com/v1/me/player/${target}`, {
              method: "PUT",
              headers: {
                Authorization: "Bearer " + session.data.user.access_token,
              },
            }).then((res) => {
              console.log(res);
            });
          }
        });
    }
  }

  return (
    <div className="flex flex-row justify-between w-[60rem] max-w-[80vw]">
      <button onClick={playPrevious}>previous</button>
      <button onClick={pausePlay}>pause/play</button>
      <button onClick={playNext}>next</button>
    </div>
  );
}
