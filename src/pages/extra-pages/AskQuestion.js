// material-ui
import { Typography } from '@mui/material';
const ethers = require('ethers');
import './tags.css';


// project import
import MainCard from 'components/MainCard';
import {
    Avatar,
    AvatarGroup,
    Grid,
    Stack,
    Button,
    Autocomplete,
    TextField,
    Box,
    InputLabel,
    Input,
    FormHelperText
} from '../../../node_modules/@mui/material/index';
import Multiselect from 'multiselect-react-dropdown';
import Utils from 'utils/utils';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { FormControl } from '../../../node_modules/@mui/material/index';
import { CardContent } from '../../../node_modules/@mui/material/index';
import { Alert } from '../../../node_modules/@mui/material/index';
import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

// ==============================|| SAMPLE PAGE ||============================== //

const AskQuestion = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [bounty, setBounty] = useState(0);
    const [tags, setTags] = useState([]);

    function submitQuestion() {
        console.log(tags);
        let tempTags = tags.map(x => x.id);
        console.log("Asking question:" + title + " with desc: "+ desc + " and tags: " + tempTags + " and bounty: "+ bounty);
        Utils.askQuestion(ethers.utils.getAddress(Utils.getMyAddress()), title, desc, tempTags, bounty);
    }      
      const KeyCodes = {
        comma: 188,
        enter: 13
      };
      
      const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    if (!Utils.getMyAddress()) {
        return (
            <MainCard sx={{ mt: 0 }}>
                <CardContent>
                    <Alert severity="error">
                        <Typography variant="h5">Connect your wallet to access questions </Typography>
                    </Alert>
                </CardContent>
            </MainCard>
        );
    }

    return (
        <>
            <MainCard sx={{ mt: 0 }}>
                <Stack spacing={3}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '90%' }
                        }}
                    >
                        <div>
                            <FormControl fullWidth="true" sx={{ m: 1 }} variant="outlined">
                                <TextField label="Title" variant="outlined" focused value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <FormHelperText id="title-helper-text">
                                    Title
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth="true" sx={{ m: 1 }}>
                                <TextField label="Description" variant="outlined" multiline rows={4} maxRows={4} value={desc} onChange={(e) => setDesc(e.target.value)}/>
                                <FormHelperText id="desc-helper-text">
                                    Description
                                </FormHelperText>
                            </FormControl>
                            <Grid container>
                                <Grid item>
                                    <FormControl fullWidth="true" sx={{ m: 1 }}>
                                        <TextField label="Bounty" variant="outlined" value={bounty} onChange={(e) => setBounty(e.target.value)}/>
                                        <FormHelperText id="title-helper-text">
                                            Bounty
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl sx={{ m: 2 }}>
                                        <ReactTags
                                            tags={tags}
                                            inline
                                            delimiters={delimiters}
                                            handleDelete={handleDelete}
                                            handleAddition={handleAddition}
                                            handleDrag={handleDrag}
                                            handleTagClick={handleTagClick}
                                            autocomplete
                                        />
                                        <FormHelperText id="desc-helper-text">Tags</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl sx={{ m: 2 }}>
                                <Button onClick={submitQuestion} variant="contained">Ask</Button>
                            </FormControl>
                        </div>
                    </Box>
                </Stack>
            </MainCard>
            <MainCard sx={{ mt: 2 }}>
                <Stack spacing={3}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Stack>
                                <Typography variant="h5" noWrap>
                                    Help & Support Chat
                                </Typography>
                                <Typography variant="caption" color="secondary" noWrap>
                                    Typical replay within 5 min
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                <Avatar alt="Remy Sharp" src={avatar1} />
                                <Avatar alt="Travis Howard" src={avatar2} />
                                <Avatar alt="Cindy Baker" src={avatar3} />
                                <Avatar alt="Agnes Walker" src={avatar4} />
                            </AvatarGroup>
                        </Grid>
                    </Grid>
                    <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                        Need Help?
                    </Button>
                </Stack>
            </MainCard>
        </>
    );
};

export default AskQuestion;
