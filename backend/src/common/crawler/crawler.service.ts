import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {CreationRequestDTO} from '../../playlist-processing/dto/creation-request.dto';
import {CreationResponseDTO, ReturnLiveElem} from '../../playlist-processing/dto/creation-response.dto';
import {ReturnDeadElem} from '../../playlist-processing/dto/creation-response.dto';
import { error } from 'console';

//import { response } from 'express';


import puppeteer from 'puppeteer';
import { URL } from 'url';
import { Url } from 'url';
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

    private async crawlLinks(url: string, artist: string, path: string){
        //launches a puppeteer browser within which to search ultimate guitar
        const browser = await puppeteer.launch({headless: true});
        //creates a page in the browser that will load ultimate guitar
        const page = await browser.newPage();
        //sets metadata for the browser
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.setViewport({width: 1280, height: 800});
        //creates the url of the search string
        const fullUrl = new URL(path, url).toString();
        //tloads the search page in the browser
        await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 100000});
        //waits for the search results with class 'a.aPPf7...' to be loaded before searching
        await page.waitForSelector('a.WfRYb.OtmaM.YD9Tl');
        //extracts the link component of each search result anf filters by those that include the artist name
        const links = await page.evaluate((artist: string) => {
            const allLinks = Array.from(document.querySelectorAll("a.WfRYb.OtmaM.YD9Tl"));

            var links = allLinks.map(link => link.getAttribute('href'));

            links = links.filter(link => link?.includes(artist));
            return links;
        }, artist);
        
        //links will have length 0 iff there are no results. ie the song does not exist
        if(links.length == 0){
            return "sorry, can't find that song";
        }else{
            //nonnulls the links and saves the first result (this is usually the best chord sheet.)
            var defLinks = links.filter(link => link !== null);
            const songURL = new URL(defLinks[0]);

            try{
                //creates a new page that crawls the chord sheet.
                const page2 = await browser.newPage();
                await page2.goto(songURL.toString(), {waitUntil: 'domcontentloaded', timeout: 1000000});
                await page2.content();
                //waits for the h1 tag to load (needed to check the shords actually render properly)
                await page2.waitForSelector('h1');

                const content = await page2.evaluate(() => {
                    //finds the difficulty from the chord sheet
                    let id = "difficulty";
                    const element = document.querySelector(`#${id}`);
                    return element ? element.textContent?.trim() : null;
                });

                var containsString = await page2.evaluate((searchString) => {
                    //extracts all h1 tag content, searching for an error message
                    const h1Tags = Array.from(document.querySelectorAll('h1')); // Select all <h1> tags
                    if (h1Tags.length == 0) return false;
                    const h1Texts = h1Tags.map(h1 => h1.textContent || ''); // Extract text content
                    return h1Texts.some(text => text.includes(searchString)); // Check if any <h1> contains the string
                }, "Sorry, this artist has told us we can't show this tab."); 
                //containsString will be true when the artist has copyright struck the chord sheet, meaning its page just shows an error message
                if (containsString == true) {
                    return "sorry, that link is problematic"
                }
                //closes the browser and returns the url for the song and the difficulty in the content field
                browser.close();
                return [songURL.toString(), content];
            }catch(error){
                console.error(error);
            }
        }

    }

    //scrapes each good link for data so that they can be categorised and sorted
    private async scrapeLinks(aliveData: any[][], dtos: ReturnLiveElem[]){
        //cycles through each entry in live data (the functional links) and categorises the difficulty with a rank
        for (var i in aliveData){

            var difficulty = aliveData[i][1];
            var rank = 3;

            if(difficulty == "beginner"){
                rank = 0;
           }else if(difficulty == "intermediate"){
                rank = 1;
           }else if(difficulty == "advanced"){
                rank = 2;
           }
                    
            dtos[i].rank = rank; // saves the difficulty of the chord sheet (currently classified by the number of different chords)
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

        var result = await this.crawlLinks("https://ultimate-guitar.com", inArtist, '/search.php?search_type=title&value=' + inSong);

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
            if (!(typeof result == "undefined") && (result[0] != null)){
            liveData.push([result[0], result[1]])
            var success: ReturnLiveElem = {
                id: j,
                url: result[0],
                rank: -1,
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