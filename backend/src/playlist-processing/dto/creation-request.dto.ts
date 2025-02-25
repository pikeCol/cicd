import { IsArray, ArrayMinSize, ArrayMaxSize, IsString, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// Define the structure of a song + artist
class PlaylistElem {
  @IsInt()
  id:number;

  @IsString()
  artist: string;

  @IsString()
  song: string;

}

export class CreationRequestDTO {
  // Validate that the input is an array and define size constraints
  @IsArray()
  @ArrayMinSize(1) // Array must have at least 1 element
  @ArrayMaxSize(30) // Array can have at most 30 elements
  @ValidateNested({ each: true }) // Validate each item inside the array
  @Type(() => PlaylistElem) // Transform plain object into instance of Item class
  playlist: PlaylistElem[];
}
