import React, { useState, useEffect, useContext } from 'react';
import heartFull from './heartFull.png';
import heartEmpty from './heartEmpty.png';
import "./LikeButton.css"

// 0 = unliked
// 1 = liked

export function LikeButton(props: any) {
    const [likeState, changeLikeState] = useState(false);

    const onButtonClick = () => {

        // check if liked or unliked

        // if unliked: 
            // change button to liked
            // add title to list
        // if liked: 
            // chnage button to unliked
            // remove title from list


        if (likeState == false && !props.favList.includes(props.title)) {
            const newFavList = [...props.favList, props.title];
            props.setFavList(newFavList);

        } else if (likeState == true && props.favList.includes(props.title)) {
            const newFavList = props.favList.filter((item: any) => item !== props.title);
            props.setFavList(newFavList);
            // console.log(props.favList)

        }
        changeLikeState(!likeState);
    }

    return (
    <div>
        <button onClick={() => onButtonClick()}>
            { likeState ? <img className="heart-button" src={heartFull} /> : <img className="heart-button" src={heartEmpty} />}
        </button>
    </div>
    );
}
