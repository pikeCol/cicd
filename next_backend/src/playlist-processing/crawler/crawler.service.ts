import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {CreationRequestDTO} from '../dto/creation-request.dto';
import {CreationResponseDTO, ReturnLiveElem} from '../dto/creation-response.dto';
import {ReturnDeadElem} from '../dto/creation-response.dto';
import { error } from 'console';
//import { response } from 'express';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
  };
  const proxyConfig = {
    host: '', //proxy ip address
    port: 0,  //port number

  };

//creates types song and playlist for the purposes of interfacing with the JSON
type Song = {
    title: string;
    artist: string;
}
type Playlist = {
    playlist: Song[];
}


@Injectable()
export class CrawlerService {

    private async crawlLinks(url: string, artist: string){
        //axios runs an http request to the input url & saves the page data as a variable html
        try {const response = await axios.get(url, {headers} );
        const html = response.data;

        //loads the html into cheerio
        const $ = cheerio.load(html);
        //searches all html elements in the page for those of the h-16... class. These are the 
        //elements that contain links to tabs. It maps these elements to their href attributes, saving
        //the links
        const links = $('.h-16.list_song_item.transition').map((i,el) => $(el).attr('href')).get();

        //filters through all links, finds the correct chord according to the artist and saves and returns the url
        for(var i in links){      
            if (links[i].includes(artist)){
                var songURL = new URL("https://www.mychordbook.com" + links[i]).toString();

                //checks if links work by querying each one that is found
                try{
                    //if the link works and leads to a chord site, save the data and return it in an array with the URL
                    const songResponse = await axios.get(songURL, {headers});
                    const songHtml = songResponse.data;
                    return [songURL, songHtml];
                }catch (error){
                    //if the link doesn't work then return a text message, like when a song cannot be found
                    return "sorry, that link is problematic"
                }

            }
        }
        //there is no song found on the site with that name, so return an error message 
        return "sorry, can't find that song"



    } catch (error){
        console.error(error);
    }
    }

    //scrapes each good link for data so that they can be categorised and sorted
    private scrapeLinks(aliveData: any[][], dtos: ReturnLiveElem[]){
        //creates a 2D array for the links to be sorted in
        for (var i in aliveData){

            const name = aliveData[i][0]; //the song name is the first field in each array in live data
            const $ = cheerio.load(aliveData[i][1]); //loads the html data of each chord page into a cheerio query
            const chords = $('[class^="c "]'); //searches for every html element whose class starts with 'c ': these are the chord icons
            var chordArray: string[] = [] //creates an array for chords to be stored in
            //runs through every chord element and, if it is not yet present in the chordArray, add its text value to the array
            chords.each((i, el) => {
                if (!chordArray.includes($(el).text())){
                    chordArray.push($(el).text());}
            });
            //console.log(chordArray);
                    
            dtos[i].rank = chordArray.length; // saves the difficulty of the chord sheet (currently classified by the number of different chords)
        }
        
    }

    public async CrawlerService(inputPlaylist : CreationRequestDTO): Promise<CreationResponseDTO>{
    //creates an empty array to contain arrays containing the song title and artist
    var inSongs = [];

    // doesnt work directly with dto because it needs to be modified
    //cycles through each song in the inputPlaylist, saving the title and artist as separate variables
    for (var i in inputPlaylist.playlist){
        var title = inputPlaylist.playlist[i].song;
        var artist = inputPlaylist.playlist[i].artist;
        inSongs.push([title,artist]);
        //pushes an arra containing the song and artist to the insongs array
    }
    

    var aliveLinks: ReturnLiveElem[] = []
    var deadLinks: ReturnDeadElem[] = []
    var liveData: any[][] = []

    for (var j = 0; j <inSongs.length; j++){
        //formats the artist and song title to the site format.
        var re = / /gi;
        var inSong = inSongs[j][0].replace(re, '+').toLowerCase();
        var inArtist = inSongs[j][1].replace(re, '-').toLowerCase();
        //crawls for the chord and saves the link to the output array

        var result = await this.crawlLinks("https://www.mychordbook.com/search?search=" + inSong, inArtist);

        if (result == "sorry, that link is problematic"){
            //adds the song name and server error message to dead links array
            var failure: ReturnDeadElem = {
                id: j,
                error: "can't reach due to server error"
            }
            deadLinks.push(failure);

        }else if (result == "sorry, can't find that song"){
            //adds the song name and missing song error message to the dead links array
            var failure: ReturnDeadElem = {
                id: j,
                error: "can't find that song"
            }
            deadLinks.push(failure);
        }else{
            //if the result exists, push the song name and URL to aliveLinks, and the URL and HTML data to liveData
            if (!(typeof result == "undefined")){
            liveData.push([result[0], result[1]])
            var success: ReturnLiveElem = {
                id: j,
                url: result[0],
                rank: -1
            }
            aliveLinks.push(success);
        }}
    }

    this.scrapeLinks(liveData, aliveLinks) 
    var response: CreationResponseDTO = {failedList: deadLinks, successList: aliveLinks}

    return response;
    
    //Debugging, returns successful and unsuccessful links
    console.log("the successful links are as follows :");
    for (var i in aliveLinks){
        console.log(aliveLinks[i]
        );
    }

    console.log("the unsuccessful links are as follows :");
    for (var i in deadLinks){
        console.log(deadLinks[i]);
    }
    // //scrapes each successful link and returns a list of song sorted by difficulty
    // console.log(this.scrapeLinks(liveData));
    // }
}}