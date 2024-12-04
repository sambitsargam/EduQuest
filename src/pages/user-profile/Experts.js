// project import
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Utils from 'utils/utils';
import axios from 'axios';
import { VideoCameraOutlined, MessageOutlined } from '@ant-design/icons';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { Avatar, FormControl, Container, Stack, Grid } from '../../../node_modules/@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const tags = ['Polygon', 'Huddle01'];

const Experts = () => {
   
    return (

        <div>
            <h1>0x9603B054aDb114B550c5f2898b37A48926d0dAb1</h1>
        </div>
        // <Grid container spacing={2}>
        //     {expertsList.map((expert, index) => {
        //         if (userId === expert.userAddress) return <></>;
        //         return (
        //             <Grid item key={expert.id+index}>
        //                 <Card sx={{ maxWidth: 300, minWidth: 300 }} style={{ flex: 1 }}>
        //                     <CardHeader
        //                         style={{ cursor: 'pointer' }}
        //                         avatar={
        //                             <Avatar src={expert.pictureCID} aria-label="profile">
        //                                 {expert.name[0]}
        //                             </Avatar>
        //                         }
        //                         title={
        //                             <Typography gutterBottom variant="h5" component="div" mb="-3px">
        //                                 {expert.name}
        //                             </Typography>
        //                         }
        //                         subheader={`Reputation: ${expert.reputation} | Rating: ${expert.rating}/10`}
        //                         onClick={() => navigate(`/profile/${expert.userAddress}`)}
        //                     />
        //                     <CardActions>
        //                         <Button
        //                             size="small"
        //                             variant="outlined"
        //                             onClick={() => navigate(`/connect/${expert.userAddress}`)}
        //                             startIcon={<MessageOutlined />}
        //                             style={{ cursor: 'pointer' }}
        //                         >
        //                             Chat
        //                         </Button>
        //                     </CardActions>
        //                 </Card>
        //             </Grid>
        //         );
        //     })}
        // </Grid>
    );
};

export default Experts;
