import '../scss/header.scss'
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';

const Header: React.FC<unknown> = () => {

  return (
    <div className="header">
        <div className='menu-button'>
            <MenuIcon/>
        </div>
        <div className='brand-name'>WeoJa trends</div>
        <div className='style-trends'>
            <div> <p>Trang chủ</p> </div>
            <div> <p>Khám phá</p> </div>
            <div> <p>Thịnh hành</p> </div>
        </div>
        <div className='info-bar'>
            <div className='search-input'>
                <div className='search-input-child'>
                    <SearchIcon sx={{marginRight:'40px'}}/>
                    <input placeholder='Khám phá chủ đề'></input>
                </div>
            </div>
            <div className='feedback-icon'>
                <FeedbackOutlinedIcon/>
            </div>
            <div className='avatar'>
                <div className='child'>
                    <AppsIcon/>
                </div>
                <div className='child'>
                    <Avatar/>
                </div>
            </div>
        </div>

    </div>
  );
};

export default Header;
