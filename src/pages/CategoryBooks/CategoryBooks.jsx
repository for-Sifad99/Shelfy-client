import React from 'react';
import { useParams } from 'react-router';

const CategoryBooks = () => {
    const {category} = useParams();
    console.log(category)
    return (
        <div>
            
        </div>
    );
};

export default CategoryBooks;