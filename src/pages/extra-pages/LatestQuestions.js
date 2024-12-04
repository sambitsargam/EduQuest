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

// ==============================|| SAMPLE PAGE ||============================== //

const LatestQuestions = () => {
    const [latestQuestions, setLatestQuestions] = useState([]);
    const [fetchState, setFetchState] = useState(false);

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
            const questionCount = "3"; // This should give the total number of questions
            
            // Loop through all question IDs and fetch questions for the specific user
            for (let i = 1; i < questionCount; i++) {
                const question = await contract.questions(i); // Fetch question by ID
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
    
            // Set the user's questions in state
            setLatestQuestions(userQuestions);
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
            <QuestionsTable items={latestQuestions} />
        </MainCard>
    );
};

export default LatestQuestions;
