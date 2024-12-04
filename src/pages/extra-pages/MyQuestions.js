// material-ui
import { Typography } from '@mui/material';
import Utils from 'utils/utils';
// project import
import MainCard from 'components/MainCard';
import QuestionsTable from './QuestionsTable';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../../smart-contract/abi';
import { useState } from 'react';
import axios from 'axios';
import { Alert, CardContent } from '../../../node_modules/@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const MyQuestions = () => {
    const [myQuestions, setMyQuestions] = useState([]);
    const [fetchState, setFetchState] = useState(false);
    const userId = Utils.getMyAddress();

    if (!Utils.getMyAddress()) {
        return (
            <MainCard sx={{ mt: 0 }}>
                <CardContent>
                    <Alert severity="error">
                        <Typography variant="h5">Connect your wallet to access questions </Typography>
                    </Alert>
                </CardContent>
            </MainCard>
        )
    }

    async function getUserQuestions() {
        if (!window.ethereum) {
            alert('MetaMask is not installed. Please install it to use this feature.');
            return;
        }

        try {
            // Initialize the Ethereum provider and contract instance

            const rpcURL = "https://open-campus-codex-sepolia.drpc.org";
            const provider = new ethers.providers.JsonRpcProvider(rpcURL);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const userId = Utils.getMyAddress();

            let userQuestions = [];
            const questionCount = "12"; // This should give the total number of questions

            // Loop through all question IDs and fetch questions for the specific user
            for (let i = 0; i < questionCount; i++) {
                const question = await contract.questions(i); // Fetch question by ID

                if (question.creator.toLowerCase() === userId.toLowerCase()) {
                    // If the question is created by the user, push to the userQuestions array
                    userQuestions.push({
                        questionId: i,
                        creator: question.creator,
                        title: question.title,
                        description: question.description,
                        bounty: question.bounty.toString(),
                        acceptedIndex: question.acceptedIndex.toString() // Add any other fields you need
                    });
                }
            }

            // Set the user's questions in state
            setMyQuestions(userQuestions);
        } catch (error) {
            console.error('Error fetching user questions:', error);
            alert('Failed to fetch user questions. Please try again.');
        }
    }
    if (!fetchState) {
        getUserQuestions();
    }

    return (
        <MainCard>
            <QuestionsTable items={myQuestions} />
        </MainCard>
    );
};

export default MyQuestions;
