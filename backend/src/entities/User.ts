import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Playlist } from "./Playlist";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  spotifyAccessToken: string;

  @Column({ nullable: true })
  spotifyRefreshToken: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}
