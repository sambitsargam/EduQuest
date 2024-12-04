import React from 'react';
import { Box, FormControl, InputAdornment, OutlinedInput, Button } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import { useOCAuth } from '@opencampus/ocid-connect-js';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
    const { ocAuth } = useOCAuth();

    // Function to handle OCID login using the provided signInWithRedirect method
    const handleOCIDLogin = async () => {
        try {
            await ocAuth.signInWithRedirect({ state: 'opencampus' });
            console.log("Redirecting to OCID login...");
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControl sx={{ width: { xs: '100%', md: 224 }, mr: 2 }}>
                <OutlinedInput
                    size="small"
                    id="header-search"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchOutlined />
                        </InputAdornment>
                    }
                    aria-describedby="header-search-text"
                    inputProps={{
                        'aria-label': 'search'
                    }}
                    placeholder="Ctrl + K"
                />
            </FormControl>

            {/* OCID Login Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleOCIDLogin}
                sx={{ height: '40px', width: '120px' }}
            >
                OCID Login
            </Button>
        </Box>
    );
};

export default Search;
