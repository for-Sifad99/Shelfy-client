import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import Categories from './Categories';


const Home = () => {
    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Book Vibes Start Here - Shelfy</title>

                <meta name="description" content="Welcome to Shelfy - Discover, borrow, and manage books with ease. Your digital library experience starts here!" />
            </Helmet>

            {/* Content */}
            <Banner />

            {/* Categories */}
            <Categories />
        </>
    );
};

export default Home;