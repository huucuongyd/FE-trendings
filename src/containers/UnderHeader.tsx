import '../scss/underheader.scss'
import { MenuItem, Select } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react';

interface MyObject {
    id: string;
    name: string;
  }

const UnderHeader: React.FC<unknown> = () => {

    const [geo,setGeo] = useState<string>('');
    const [geoInfo,setGeoInfo] = useState<MyObject>({
        id:'',
        name:''
    });

    const [geoList, setGeoList] = useState([]);

    useEffect(()=>{
        axios.get('http://192.168.1.13:3001/google-trends/get-country-code')
        .then(response => {
          setGeoList(response.data);
          setGeo('VN');
        })
        .catch(error => {
          console.error(error)
        })
    },[])


    useEffect(()=>{
        geoList.map((el:MyObject) => {
            if(el.id === geo){
                setGeoInfo(el)
            }
        })
    },[geo, geoInfo, geoList])

    const filteredGeoList = geoList.filter((el:MyObject) => el.id !== geo);

    const handleChange = (event: { target: { value: string; }; }) => {
        setGeo(event.target.value as string);
      };

  return (
    <div className='under-header'>
        <div className='container'>
            <div className='searchtrends'>
                <div className='text'>Xu hướng tìm kiếm hằng ngày</div>
                <div className='divider'></div>
                <div className='text'>Xu hướng tìm kiếm theo thời gian thực</div>
            </div>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={geo}
            onChange={handleChange}
            className='region'
            MenuProps={{
                sx:{
                    maxHeight:'400px'
                }
            }}
            >  
                <MenuItem value={geoInfo.id}>{geoInfo.name}</MenuItem>
                {filteredGeoList.map((el:MyObject) => (
                    <MenuItem value={el.id} key={el.id}>
                    {el.name}
                    </MenuItem>
                ))}
            </Select>
        </div>

    </div>
  );
};

export default UnderHeader;
