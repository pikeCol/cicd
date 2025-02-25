import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PlaylistSong } from "./PlaylistSong";

@Entity()
export class Song {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  hyperlink: string;

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.song)
  playlistSongs: PlaylistSong[];
}
