import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import { BodyContainer, CardContainer, CardContainer2, HeroSection, MainHeading, SignUpButton, SongCard, SongCard2, SubHeading, TrendingHeading, TrendingSection } from "../styles/Body.modules";
import Rectangle from "../components/Rectangle";
const Home: React.FC = () => {
    return (
        <div>
            <div className='herosection'>
                <Rectangle />
                <HeroSection>
                    <MainHeading>
                        Learn the songs you love, <br></br>
                        one chord at a time.
                    </MainHeading>
                    <SubHeading>
                        Connecting your playlist has never been this easy.
                    </SubHeading>
                    <Link to='/signup'>
                    <SignUpButton>Sign Up</SignUpButton>
                    </Link>
                </HeroSection>
            </div>
            <BodyContainer>
                <TrendingSection>
                    <TrendingHeading>Explore what's trending now</TrendingHeading>
                    <CardContainer>
                        <SongCard>
                            <h1>
                                Your Power
                            </h1>
                            <h3>
                                Billie Eilish
                            </h3>
                        </SongCard>

                        <SongCard>
                            <h1 className="cardSong">
                                Perfect
                            </h1>
                            <h3 className="cardArtist">
                                Ed Sheeran
                            </h3>
                        </SongCard>

                        <SongCard>
                            <h1 className="cardSong">
                                Sparks
                            </h1>
                            <h3 className="cardArtist">
                                Coldplay
                            </h3>
                        </SongCard>

                        <SongCard>
                            <h1 className="cardSong">
                                Tush
                            </h1>
                            <h3 className="cardArtist">
                                Fandango!
                            </h3>
                        </SongCard>
                    </CardContainer>
                    <CardContainer2>
                    <SongCard2>
                            <h1 className="cardSong">
                                The Nights
                            </h1>
                            <h3 className="cardArtist">
                                Avicii
                            </h3>
                        </SongCard2>

                        <SongCard2>
                            <h1 className="cardSong">
                                The Scientist
                            </h1>
                            <h3 className="cardArtist">
                                Coldplay
                            </h3>
                        </SongCard2>

                        <SongCard2>
                            <h1 className="cardSong">
                                Ivy
                            </h1>
                            <h3 className="cardArtist">
                                Frank Ocean
                            </h3>                     
                            </SongCard2>

                            <SongCard2>
                            <h1 className="cardSong">
                                Yellow
                            </h1>
                            <h3 className="cardArtist">
                                Parachutes
                            </h3>                     
                            </SongCard2>
                    </CardContainer2>
                    <CardContainer>
                        <SongCard>
                            <h1>
                                Chasing Cars
                            </h1>
                            <h3>
                                Eyes Open
                            </h3>
                        </SongCard>

                        <SongCard>
                            <h1 className="cardSong">
                                Where is My Mind
                            </h1>
                            <h3 className="cardArtist">
                                Surfer Rosa
                            </h3>
                        </SongCard>

                        <SongCard>
                            <h1 className="cardSong">
                                Shape of You
                            </h1>
                            <h3 className="cardArtist">
                                Ed Sheeran
                            </h3>
                        </SongCard>

                        <SongCard>
                            <h1 className="cardSong">
                                One
                            </h1>
                            <h3 className="cardArtist">
                                Achtung Baby
                            </h3>
                        </SongCard>
                    </CardContainer>
                </TrendingSection>
            </BodyContainer>


        </div>
    );
};

const NavBar = () => {
    return (
        <nav className="navbar">

        </nav>

    )
}
export default Home;