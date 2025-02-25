import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { PlaylistSong } from "./PlaylistSong";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.playlist)
  playlistSongs: PlaylistSong[];
}
