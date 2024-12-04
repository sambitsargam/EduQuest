// material-ui
import { Typography } from '@mui/material';
import Utils from 'utils/utils';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../../smart-contract/abi';
import { VideoCameraOutlined, MessageOutlined } from '@ant-design/icons';
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
    FormHelperText,
    Badge,
    CardActions,
    CardContent,
    Alert
} from '../../../node_modules/@mui/material/index';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { FormControl } from '../../../node_modules/@mui/material/index';

import QuestionsTable from '../extra-pages/QuestionsTable';
import { useNavigate } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const tags = ['Polygon', 'Huddle01'];
const UserProfile = (userAddress) => {
    let { id } = useParams();
    userAddress = id ? id : Utils.getMyAddress();

    const [userDetails, setUserDetails] = useState({});
    const [userQuestions, setUserQuestions] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const navigate = useNavigate();

    if (!Utils.getMyAddress()) {
        return (
            <MainCard sx={{ mt: 0 }}>
                <CardContent>
                    <Alert severity="error">
                        <Typography variant="h5">Connect wallet to access your profile</Typography>
                    </Alert>
                </CardContent>
            </MainCard>
        );
    }

    async function fetchUserDetails() {
        if (!window.ethereum) {
            alert('MetaMask is not installed. Please install it to use this feature.');
            return;
        }
    
        try {
            // Initialize the Ethereum provider and contract instance
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
            // Fetch user details from the contract
            const userDetails = await contract.users(userAddress);
    
            // Extract details and set them in state
            const formattedDetails = {
                id: userAddress,
                userAddress,
                name: userDetails.name,
                pictureCID: userDetails.pictureCID,
                rating: userDetails.rating.toString(),
                reputation: userDetails.reputation.toString()
            };
    
            setUserDetails(formattedDetails);
        } catch (error) {
            console.error('Error fetching user details:', error);
            alert('Failed to fetch user details. Please try again.');
        }
    }
    

    async function getUserDetails() {
        try {
            let userDetail = fetchUserDetails();
            console.log(userDetail);
            setUserDetails(userDetail);
        } catch (error) {
            console.error(error);
        }
    }

    async function getUserQuestions() {
        if (!window.ethereum) {
            alert('MetaMask is not installed. Please install it to use this feature.');
            return;
        }
    
        try {
            // Initialize the Ethereum provider and contract instance
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
            let userQuestions = [];
            const questionCount = "12"; // This should give the total number of questions
            
            // Loop through all question IDs and fetch questions for the specific user
            for (let i = 0; i < questionCount; i++) {
                const question = await contract.questions(i); // Fetch question by ID
                
                if (question.creator.toLowerCase() === userAddress.toLowerCase()) {
                    // If the question is created by the user, push to the userQuestions array
                    userQuestions.push({
                        questionId: question.questionId,
                        creator: question.creator,
                        title: question.title,
                        description: question.description,
                        bounty: question.bounty.toString(),
                        acceptedIndex: question.acceptedIndex.toString() // Add any other fields you need
                    });
                }
            }
    
            // Set the user's questions in state
            setUserQuestions(userQuestions);
        } catch (error) {
            console.error('Error fetching user questions:', error);
            alert('Failed to fetch user questions. Please try again.');
        }
    }
    
    
    if (!fetchState) {
        getUserDetails();
        getUserQuestions();
        setFetchState(true);
    }

    return (
        <>
            <MainCard sx={{ mt: 0 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={0}>
                            <Avatar alt={userDetails.name} src={userDetails.pictureCID} sx={{ width: 56, height: 56 }} />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant="h1">{userDetails.name}</Typography>
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant="h5">
                                Reputation : {userDetails.reputation} &nbsp; | &nbsp; Rating : {userDetails.rating}/10
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                {Utils.getMyAddress() !== userAddress ? (
                    <CardActions>
                        <Button size="small" variant="outlined" onClick={() => navigate(`/connect/${userDetails.userAddress}`)} startIcon={<MessageOutlined />} style={{ cursor: 'pointer' }}>
                            Chat
                        </Button>
                    </CardActions>
                ) : (
                    <></>
                )}
            </MainCard>
            <MainCard sx={{ mt: 3 }} title={userDetails.name + "'s Questions"}>
                <QuestionsTable items={userQuestions}></QuestionsTable>
            </MainCard>
        </>
    );
};

export default UserProfile;
