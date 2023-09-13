import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import '../scss/body.scss'
import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

interface ResponseData {
    endDateForNextRequest: string;
    rssFeedPageUrl: string;
    trendingSearchesDays: Array<trendingSearches>;
}

interface trendingSearches {
    date: string,
    formattedDate: string,
    trendingSearches:Array<TrendData>
}

interface TrendData {
    title: {
      query: string;
      exploreLink: string;
    };
    formattedTraffic: string;
    relatedQueries: {
      query: string;
      exploreLink: string;
    }[];
    image: {
      newsUrl: string;
      source: string;
      imageUrl: string;
    };
    articles: {
      title: string;
      timeAgo: string;
      source: string;
      image: {
        newsUrl: string;
        source: string;
        imageUrl: string;
      };
      url: string;
      snippet: string;
    }[];
    shareUrl: string;
  }

function Row(props: { row: TrendData, index: number }) {
    const { row, index } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, display:'flex', height:'118px'}} key={index}>
          <TableCell align="right" style={{
            fontSize:'23px',
            paddingLeft:'20px',
            marginTop:'20px'
          }}>{index}</TableCell>
          <TableCell align="left" sx={{flex:1,display:'flex',alignItems:'center'}}>
            <div className='detail'>
                <div className='detail-top'>{row.title.query}</div>
                <div className='detail-bottom'>
                    <div className='sumary-text'>{row.articles[0].title}</div>
                    <div className='source-and-time'>{row.articles[0].source} • {row.articles[0].timeAgo}</div>
                </div>
            </div>
          </TableCell>
          <TableCell align="center" sx={{display:'flex',alignItems:'center'}}>
            <div className='search-count'>
                <div className='search-count-top'>{row.formattedTraffic}</div>
                <div className='search-count-bottom'>lượt tìm kiếm</div>
            </div>
          </TableCell>
          <TableCell align="center">
            <div className='image-link-wrapper'>
                <div style={{ 
                    backgroundImage: `url("${row.image.imageUrl}")`,
                    borderRadius:'15px',
                    height:'100%',
                    display:'flex',
                    alignItems:'flex-end'
                }}>
                    <div className='text-detail'>{row.image.source}</div>
                </div>
            </div>
          </TableCell>
          <TableCell style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

const Body: React.FC<unknown> = () => {

    const [trends, setTrends] = useState<ResponseData>();
    useEffect(() => {
        axios.get('http://192.168.1.13:3001/google-trends/trending-searches')
      .then((response) => {
        setTrends(response.data.default);
      })
    },[])
    

    return (
        <div className="Body">
            {trends?.trendingSearchesDays.map((el, index) => {
                return (
                    <div key={index} className='box-container'>
                        <div className='timeFormated'>{el.formattedDate}</div>
                        <TableContainer component={Paper} >
                            <Table aria-label="collapsible table">
                                <TableBody>
                                    {
                                        el.trendingSearches.map((e, index) => {
                                            return(
                                              <Row row={e} index={index} key={index}/>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                )
            })}
            
        </div>
    )
}

export default Body