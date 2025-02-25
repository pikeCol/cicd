import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Playlist } from "./Playlist";
import { Song } from "./Song";

@Entity()
export class PlaylistSong {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistSongs, { onDelete: "CASCADE" })
  playlist: Playlist;

  @ManyToOne(() => Song, (song) => song.playlistSongs, { onDelete: "CASCADE" })
  song: Song;
}
