import React, { useState } from 'react'
interface SearchProps {
    setsearch: (search: boolean) => void;
}

const Search = ({setsearch}: SearchProps) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = async () => {
        setIsClicked(!isClicked); 
        setsearch(!isClicked);
    };

    
    return (    
        <button
            onClick={handleClick}
            className={`bg-[url('/images/web.png')] bg-contain bg-no-repeat w-9 h-9 cursor-pointer p-2 rounded-full 
                ${isClicked ? '' : 'opacity-50'}`}
        > 
        </button>
    );
}

export default Search
