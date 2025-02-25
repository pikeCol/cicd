import React, { useState } from "react";
import {
  AddButton,
  InputWrapper,
  PlaylistWrapper,
  RectWrapper,
  TableContainer,
  Table,
} from "../styles/Playlist.modules";
import Rectangle from "../components/Rectangle";
// import styles from "./Playlist.modules.css";
import http from "../utils/http";
import { LoadingDots } from "../components/Loading";
import Toast from "../components/Toast";

const Playlist = () => {
  type PlaylistEntry = {
    id: number;
    song: string;
    artist: string;
    url?: string;
    error?: string;
  };
  const [playlist, setPlaylist] = useState<PlaylistEntry[]>([]); // State to store playlist entries
  const [song, setSong] = useState(""); // State for the song input
  const [artist, setArtist] = useState(""); // State for the artist input
  const [hasResults, setHasResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (song && artist) {
      const newEntry = {
        id: playlist.length,
        song: song,
        artist: artist,
      };

      if (playlist.length >= 30) {
        alert(
          "Sorry you've reached the limit! You can't add more than 30 songs!"
        );
        return;
      }

      setPlaylist([...playlist, newEntry]); // Add new entry to playlist
      setSong(""); // Clear the song input
      setArtist(""); // Clear the artist input
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const hadnleRemove = (id: number) => {
    const newPlayer = playlist.filter((v) => v.id !== id);
    setPlaylist(newPlayer);
  };

  //This asynchronous function sends a POST request to the backend API
  const handleFindChords = async () => {
    const json = JSON.stringify({
      playlist: playlist,
    });

    console.log(json);
    setLoading(true);
    try {
      const res = await http.post(
        "/playlist-processing/create-playlist",
        json,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res.successList, res.failedList);
      const newPlaylist = playlist.map((entry) => {
        let song = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        song = res.successList.find((item) => item.id === entry.id);
        if (!song) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          song = res.failedList.find((item) => item.id === entry.id);
        }
        return { ...entry, ...song };
      });
      setPlaylist(newPlaylist);

      setHasResults(true);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  //Open the URL in the entry (if it exists) to view it in a new page
  const goToLesson = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <PlaylistWrapper>
      <Toast
        message="Please fill in both the song title and artist name !"
        show={showToast}
      />
      <RectWrapper>
        <Rectangle />
        <div className="text1">
          <h1>Enter a Song and an Artist of your choice</h1>
        </div>
        <InputWrapper>
          <form className="Input1">
            <div className="inputRow">
              <div className="inputField">
                {/* <label>Song</label> */}
                <input
                  type="text"
                  name="song"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  placeholder="Enter a song"
                  style={{ paddingLeft: "28px" }}
                  maxLength={30}
                />
              </div>
              <div className="inputField">
                {/* <label>Artist</label> */}
                <input
                  type="text"
                  name="artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Enter an artist"
                  style={{ paddingLeft: "28px" }}
                  maxLength={30}
                />
              </div>
            </div>
            <AddButton>
              <input
                className="submit"
                onClick={handleAdd}
                type="button"
                value="Add"
                style={{ textAlign: "center" }}
              />
            </AddButton>
          </form>
        </InputWrapper>
      </RectWrapper>

      {/* {playlist.length > 0 && (
        <div
          className="playlist"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop: "0px",
            fontFamily: "Newake",
            // fontSize: "30px"
          }}
        >
          <div
            style={{
              display: "flex",
              width: "500px", // consistent width for each header
              marginBottom: "10px",
              color: "#fff",
              fontFamily: "Newake",
              fontWeight: "bold",
              fontSize: "2rem",
              paddingLeft: hasResults ? "150px" : "76px",
              justifyContent: hasResults ? "flex-start" : "center",
            }}
          >
            <span
              className="sBuck"
              style={{ flexBasis: "150px", textAlign: "left" }}
            >
              Song
            </span>{" "}
            <span
              className="sBuck"
              style={{ flexBasis: "150px", textAlign: "left" }}
            >
              Artist
            </span>
          </div>
          {playlist.map((entry, index) => (
            <div
              key={entry.id}
              style={{
                display: "flex",
                alignItems: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.6rem",
                marginBottom: "10px",
                width: "500px", // consistent width for each entry
                fontFamily: "Newake",
                justifyContent: hasResults ? "flex-start" : "center",
              }}
            >
              <span style={{ flexBasis: "80px" }}>{index + 1}</span>
              <span style={{ flexBasis: "150px", textAlign: "left" }}>
                {entry.song}
              </span>
              <span style={{ flexBasis: "150px", textAlign: "left" }}>
                {entry.artist}
              </span>
              <div
                style={{
                  flex: 1,
                  paddingLeft: "10px",
                }}
              >
                {entry.url && (
                  <button
                    onClick={() => entry.url && goToLesson(entry.url)}
                    style={{
                      fontSize: "1rem",
                      backgroundColor: "#ffb96a",
                      fontFamily: "Newake",
                      color: "#2d004d",
                      border: "none",
                      borderRadius: "20px",
                      height: "40px",
                      width: "120px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                  >
                    CHORDS
                  </button>
                )}
                {entry.error && (
                  <span
                    style={{
                      color: "white",
                      fontFamily: "Newake",
                      width: "120px",
                      fontSize: "18px",
                    }}
                  >
                    {entry.error}
                  </span>
                )}
                <button
                  onClick={() => hadnleRemove(entry.id)}
                  style={{
                    fontSize: "1rem",
                    backgroundColor: "#ffb96a",
                    fontFamily: "Newake",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    height: "40px",
                    width: "94px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                    marginLeft: "10px",
                  }}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
          <button className="findChords" onClick={handleFindChords}>
            Find Chords
          </button>
        </div>
      )} */}

      {playlist.length > 0 && (
        <TableContainer>
          <Table>
            <tr className="t-header">
              <th></th>
              <th>
                <span className="sBuck" style={{ textAlign: "left" }}>
                  Song
                </span>
              </th>
              <th>
                <span className="sBuck" style={{ textAlign: "left" }}>
                  Artist
                </span>
              </th>
              <th></th>
              <th></th>
            </tr>
            {playlist.map((entry, index) => (
              <tr key={entry.id} className="row">
                <td className="index">{index + 1}</td>
                <td className="song">{entry.song}</td>
                <td className="artist">{entry.artist}</td>
                <td className="buttons">
                  {entry.url && (
                    <button onClick={() => entry.url && goToLesson(entry.url)}>
                      CHORDS
                    </button>
                  )}
                  {entry.error && (
                    <span style={{ color: "white", fontFamily: "Newake" }}>
                      {entry.error}
                    </span>
                  )}
                </td>
                <td className="remove">
                  <button onClick={() => hadnleRemove(entry.id)}>remove</button>
                </td>
              </tr>
            ))}
          </Table>
          <button className="findChords" onClick={handleFindChords}>
            Find Chords
          </button>
        </TableContainer>
      )}
      {loading && <LoadingDots />}
    </PlaylistWrapper>
  );
};

export default Playlist;
