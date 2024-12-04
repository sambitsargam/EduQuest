import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// material-ui
import { Typography, Button, Grid, Stack, Avatar, Chip, Card, CardContent,CardHeader, CardActions } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Utils from 'utils/utils';
import HuddleApp from '../../huddle/huddleApp';
import LivePeerApp from 'livepeer/LivePeerApp';

// smart contract imports
import { contractABI, contractAddress } from "../../smart-contract/abi";

// ==============================|| QUESTION PAGE ||============================== //

const Question = () => {
    let { id } = useParams();
    const questionID = id;
    const userId = Utils.getMyAddress();
    const [question, setQuestion] = useState({});
    const [creator, setCreator] = useState();
    const [proposals, setProposals] = useState([]);
    const [questionStatus, setQuestionStatus] = useState(0);
    const [showHuddle, setShowHuddle] = useState(false);
    const [livePeer, setLivePeer] = useState(false);

    // Dummy proposals for fallback
    const dummyProposals = [
        {
            id: 'Shakti',
            creator: '0x123...',
            details: 'Reputation: 100 | Rating 8/10'
        },
        {
            id: 'Aayushmaan',
            creator: '0x456...',
            details: 'Reputation: 132 | Rating 9/10'
        }
    ];

    // Fetching question and proposals from the smart contract
    const fetchQuestion = async () => {
        try {
            const rpcURL = "https://open-campus-codex-sepolia.drpc.org";
            const provider = new ethers.providers.JsonRpcProvider(rpcURL);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            // Fetch question by ID
            const questionData = await contract.questions(questionID);
            
            setQuestion({
                questionId: questionID,
                creator: questionData.creator,
                title: questionData.title,
                description: questionData.description,
                bounty: ethers.utils.formatUnits(questionData.bounty, 3),
                tags: questionData.tags
            });

            // Fetch the creator details
            const creatorData = await contract.users(questionData.creator);
            setCreator({
                userAddress: creatorData.userAddress,
                name: creatorData.name,
                pictureCID: creatorData.pictureCID,
                rating: creatorData.rating.toString(),
                reputation: creatorData.reputation.toString()
            });

            // Fetch proposals for the question
            const proposalCount = "0";
            let fetchedProposals = [];

            for (let i = 0; i < proposalCount; i++) {
                const proposal = await contract.getProposal(questionID, i);
                fetchedProposals.push({
                    id: proposal.id,
                    creator: proposal.creator,
                    details: proposal.details
                });
            }

            if (fetchedProposals.length === 0) {
                setProposals(dummyProposals); // Use dummy proposals if no proposals exist
            } else {
                setProposals(fetchedProposals); // Use actual proposals
            }

        } catch (error) {
            console.error("Error fetching question or creator details", error);
            setProposals(dummyProposals); // In case of an error, fallback to dummy proposals
        }
    };

    async function showInterest() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
            if (!question || !question.questionId) {
                alert("Invalid question details.");
                return;
            }

            console.log("Question ID:", question.questionId);
            console.log("User ID:", userId);
    
            const tx = await contract.updateProposers(questionID,userId);
            console.log("Transaction submitted:", tx.hash);
    
            // Wait for the transaction to be mined
            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);
    
            alert("Successfully shown interest!");
        } catch (error) {
            console.error("Error in showInterest function:", error);
            alert("Failed to show interest. Please try again.");
        }
    }
    

    useEffect(() => {
        fetchQuestion();
    }, [questionID]);

    const startHuddle = () => {
        setShowHuddle(true);
    };

    const startLivePeer = () => {
        setShowHuddle(false);
        setLivePeer(true);
    };

    const showVideoCall = () => (
        <Card sx={{ mt: 2 }}>
            {livePeer ? (
                <Typography variant="h3" sx={{ m: 3, mb: 0 }}>
                    Mint Call Recording as NFT with LivePeer
                </Typography>
            ) : (
                <CardHeader
                    avatar={<Avatar aria-label="recipe" src={null} alt=""></Avatar>}
                    action={
                        showHuddle ? (
                            <Button variant="contained" aria-label="settings" onClick={startLivePeer}>
                                Mint Recording as NFT
                            </Button>
                        ) : (
                            <Button variant="contained" aria-label="settings" onClick={startHuddle}>
                                Start Huddle
                            </Button>
                        )
                    }
                    title="Connected"
                    subheader="Active 2 minutes ago."
                />
            )}
            <CardContent>{livePeer ? <LivePeerApp /> : <HuddleApp />}</CardContent>
        </Card>
    );

    const showProposals = () => (
        <MainCard sx={{ mt: 2 }} title="Proposals">
            <Stack spacing={3}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Stack>
                            {proposals.length === 0 ? (
                                <Typography variant="subtitle1" color="secondary" noWrap>
                                    No proposals received so far.
                                </Typography>
                            ) : (
                                <Grid container>
                                    {proposals.map((proposal, index) => (
                                        <Grid item m={1} key={proposal.id + index}>
                                            <Card style={{ minWidth: 300 }} key={proposal.id}>
                                                <CardContent>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={0}>
                                                            <Avatar alt={proposal.id} src={null} />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h3">{proposal.id}</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption">{proposal.details}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                                {question.creator === Utils.getMyAddress() && (
                                                    <CardActions>
                                                        <Button size="small" variant="outlined">
                                                            Chat
                                                        </Button>
                                                    </CardActions>
                                                )}
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
                {question.creator !== Utils.getMyAddress() &&  (
                    <Grid item sx={{ ml: 2 }} key={'dummy'}>
                        <Button onClick={() => showInterest()} size="large" variant="contained">
                            Show Interest
                        </Button>
                    </Grid>
                )}
            </Stack>
        </MainCard>
    );

    return (
        <>
            <MainCard sx={{ mt: 0 }}>
                <Stack spacing={3}>
                    <Typography variant="h3" mb={0}>
                        {question.title}
                    </Typography>
                    {question.tags && (
                        <Grid container>
                            {question.tags.map((tag) => (
                                <Chip avatar={<Avatar>{tag[0]}</Avatar>} label={tag} key={tag} />
                            ))}
                        </Grid>
                    )}
                    <Typography variant="subtitle1" mt={0}>
                        {question.description}
                    </Typography>
                    <Typography variant="body1" mt={0}>
                        Bounty: {question.bounty} EDU
                    </Typography>
                    {creator && (
                        <Stack>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Avatar src={creator.pictureCID} alt={creator.name} style={{ width: '32px', height: '32px' }} />
                                </Grid>
                                <Grid item mt={1}>
                                    <Typography variant="h5">{creator.name}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item mt={1}>
                                <Typography variant="body1">
                                    Rating: {creator.rating}/10 &nbsp; | &nbsp; Reputation: {creator.reputation} points
                                </Typography>
                            </Grid>
                        </Stack>
                    )}
                </Stack>
            </MainCard>
            {questionStatus === 1 ? showVideoCall() : showProposals()}
        </>
    );
};

export default Question;
