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
    console.log(row.image.imageUrl)
    console.log(row)
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, display:'flex' }} key={index}>
          <TableCell component="th" scope="row">
          </TableCell>
          <TableCell align="right" style={{
            fontSize:'23px',
            paddingRight:'24px',
            paddingTop:'auto',
            paddingBottom:'auto'
          }}>{index}</TableCell>
          <TableCell align="left" sx={{flex:1}}>
            <div className='detail'>
                <p className='detail-top'>{row.title.query}</p>
                <div className='detail-bottom'>
                    <div className='sumary-text'>{row.articles[0].title}</div>
                    <div className='source-and-time'>{row.articles[0].source} • {row.articles[0].timeAgo}</div>
                </div>
            </div>
          </TableCell>
          <TableCell align="center">
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
        axios.get('http://localhost:3000/google-trends/trending-searches')
      .then((response) => {
        setTrends(response.data.default);
      })
    },[])
    

    return (
        <div className="Body">
            {trends?.trendingSearchesDays.map((el, index) => {
                return (
                    <div key={index}>
                        <div className='timeFormated'>{el.formattedDate}</div>
                        <TableContainer component={Paper} >
                            <Table aria-label="collapsible table">
                                <TableBody>
                                    {
                                        el.trendingSearches.map((e, index) => {
                                            return(
                                                <div>
                                                    <Row row={e} index={index}/>
                                                </div>
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