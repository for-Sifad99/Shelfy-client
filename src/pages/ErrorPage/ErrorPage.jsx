import React from 'react';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>400 - Page Not Found - Job Wave</title>
                <meta name="description" content="Oops! The page you're looking for doesn't exist on Job Wave." />
            </Helmet>


            {/* Content */}
            <section className='py-10'>
                <h1 className=' dark:text-[var(--color-dark-primary)]'>Error Page!!</h1>
            </section>
        </>
    );
};

export default ErrorPage;