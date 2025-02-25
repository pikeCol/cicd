import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Playlist } from "./entities/Playlist";
import { Song } from "./entities/Song";
import { PlaylistSong } from "./entities/PlaylistSong";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", // for test
  port: 5432, // default PostgreSQL port
  username: "postgres",
  password: "PGLtest", // for test
  database: "PGLtest", // for test
  synchronize: true, // for test
  logging: false,
  entities: [User, Playlist, Song, PlaylistSong],
});
