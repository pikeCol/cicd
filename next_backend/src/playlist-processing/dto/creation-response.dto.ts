import { IsArray, ArrayMinSize, ArrayMaxSize, IsString, IsInt, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { Url } from 'url';

// TODO add test to make sure all requested elems are acknowledged

// Define the structure of a return element
export class ReturnLiveElem {
    @IsInt()
  id:number;

  @IsUrl()
  url: Url

  @IsInt()
  rank:number;
}

export class ReturnDeadElem{
    @IsInt()
    id: number

    @IsString()
    error: string;

}

export class CreationResponseDTO {
  // Validate that the input is an array and define size constraints
  @IsArray()
  @ArrayMinSize(0) // Array can be empty
  @ArrayMaxSize(30) // Array can have at most 30 elements
  @ValidateNested({ each: true }) // Validate each item inside the array
  @Type(() => ReturnLiveElem) // Transform plain object into instance of Item class
  successList: ReturnLiveElem[];

  @IsArray()
  @ArrayMinSize(0) // Array can be empty
  @ArrayMaxSize(30) // Array can have at most 30 elements
  @ValidateNested({ each: true }) // Validate each item inside the array
  @Type(() => ReturnDeadElem) // Transform plain object into instance of Item class
  failedList: ReturnDeadElem[];
}