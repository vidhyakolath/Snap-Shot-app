/*import IMG1 from '../../Images/Mountain/img1.jfif';
import IMG2 from '../../Images/Mountain/img2.jfif';
import IMG3 from '../../Images/Mountain/img3.jfif';
import IMG4 from '../../Images/Mountain/img4.jfif';*/
import Nav from '../../Nav';
import './Mountain.css';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import axios from 'axios';


function Mountain() {
    const [imageData,setImageData]=useState([]);
    const searchData=useRef(null);
     const [searchText,setSearchText]=useState("");
     useEffect(()=>{
    const data = {
        method: 'flickr.photos.search',
        api_key: "5e3de891a688d1f44cbafc0f733670d4",
        text:"mountains",
        sort: 'interestingness-desc',
        per_page: 12,
        license: '4',
        extras: 'owner_name,license',
        format: 'json',
        nojsoncallback: 1,
      };
      
      const parameters = new URLSearchParams(data);
      const url = `https://api.flickr.com/services/rest/?${parameters}`;
      console.log(url);
      axios.get(url)
    //.then(response => response.json(data))
    .then((response)=> {
      console.log(response.data)
    const arr= response.data.photos.photo.map((photo) => {
        return getFlickrImageURL(photo, 'q');
      });
      setImageData(arr);});
    },[searchText])
      const getFlickrImageURL = (photo, size) => {
        let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
          photo.secret
        }`;
        if (size) {
          // Configure image size
          url += `_${size}`;
        }
        url += '.jpg';
        return url;
      };
    return (
        <div className='main'>
            <h2>Mountain Pictures</h2>
            <div className='img'>
            {imageData.map((imageurl,key)=>{
              return <img src={imageurl} key={key}/>
            })}
                {/*<img src='' alt='img1' />*/}
                {/*<img srcSet={IMG2} alt='img2'/>
                <img srcSet={IMG3} alt='img3'/>
    <img srcSet={IMG4} alt='img4'/>*/}
            </div>
        </div>
    )
}
export default Mountain;