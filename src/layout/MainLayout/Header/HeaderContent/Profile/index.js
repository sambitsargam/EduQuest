import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import axios from 'axios'; // Corrected import for axios
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Grid,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    Typography,
    Modal,
    Button
} from '@mui/material';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../../../../../smart-contract/abi'; // Corrected import for contractABI and contractAddress

// project imports
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import { useNavigate } from 'react-router-dom';
import Utils from 'utils/utils';

// Styling for Modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

// Tab Panel Wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const [address, setAddress] = useState(Utils.getMyAddress());
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [userCreateTx, setUserCreateTx] = useState(null);
    const [value, setValue] = useState(0);
    const [account, setAccount] = useState(null);
    const anchorRef = useRef(null);

    const handleLogout = async () => {
        if (window.ethereum) {
            if (!address) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                accountChangeHandler(accounts[0]);
            } else {
                setAddress(null);
                Utils.setMyAddress(null);
                window.location.reload();
            }
        } else {
            alert('Please install the MetaMask extension!');
        }
    };

    const accountChangeHandler = async (newAccount) => {
        setAccount(newAccount);
        setAddress(newAccount);
        Utils.setMyAddress(newAccount);

        try {
            const response = await getUserDetails(newAccount);
            const userDetails = response.data.data.userUpdateds[0];

            if (!userDetails || !userDetails.name) {
                const newName = prompt('New user signup, Please provide your name');
                if (!newName) {
                    window.location.reload();
                } else {
                    setOpenModal(true);
                    Utils.createUser(newName, setUserCreateTx, () => {
                        setOpenModal(false);
                        navigate('/profile');
                    });
                }
            } else {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const getUserDetails = async () => {
        if (!account) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        try {
            const user = await contract.users(account);
            console.log('User details:', user);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <Modal open={openModal}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Creating User
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {userCreateTx}
                    </Typography>
                </Box>
            </Modal>

            <ButtonBase
                sx={{
                    p: 0.25,
                    bgcolor: open ? 'grey.300' : 'transparent',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter' }
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleLogout}
            >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                    <Typography variant="subtitle1">
                        {address ? 'Disconnect Wallet' : 'Connect Wallet'}
                    </Typography>
                </Stack>
            </ButtonBase>

            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [{ name: 'offset', options: { offset: [0, 9] } }]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                width: 290,
                                minWidth: 240,
                                maxWidth: 290,
                                [theme.breakpoints.down('md')]: { maxWidth: 250 }
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard elevation={0} border={false} content={false}>
                                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                                        <Grid container justifyContent="space-between" alignItems="center">
                                            <Grid item>
                                                <Stack direction="row" spacing={1.25} alignItems="center">
                                                    <Typography variant="body2" color="textSecondary">
                                                        {address}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    {open && (
                                        <>
                                            <TabPanel value={value} index={0} dir={theme.direction}>
                                                <ProfileTab handleLogout={handleLogout} />
                                            </TabPanel>
                                            <TabPanel value={value} index={1} dir={theme.direction}>
                                                <SettingTab />
                                            </TabPanel>
                                        </>
                                    )}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Profile;
