import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const Footer = () => {
    return (
        <footer>
            <Box
            px={{ xs: 3, sm: 4 }}
            py={{ xs: 3, sm: 4 }}
            bgcolor="text.secondary"
            color="white"
            sx={{
                fontSize: 16,
                fontFamily: 'monospace',
            }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={{xs: 2, sm: 5}}>
                        <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'grid' } }}>
                            <Box
                            textAlign="left"
                            sx={{display: 'flex', alignItems: 'center', p: 0}}
                            >
                                HoneyMoney &reg; {new Date().getFullYear()}
                            </Box>
                        </Grid>
                        <Grid item md={5} sx={{ display: { xs: 'none', md: 'grid' } }}> </Grid>
                        <Grid item xs={12} sm={4} md={2} p={{xs: 0}} sx={{ textAlign: { xs: 'center' } }}>
                            <Box
                            mb={1}
                            sx={{
                                fontWeight: 700,
                                fontSize: 16,
                                color: 'inherit',
                            }}
                            >
                                Help
                            </Box>
                            <Box mb={1}>
                                <Link href="/" color="inherit" sx={{ textDecoration: 'none'}}>
                                    Contact
                                </Link>
                            </Box>
                            <Box mb={1}>
                                <Link href="/" color="inherit" sx={{ textDecoration: 'none'}}>
                                    Support
                                </Link>
                            </Box>
                            <Box mb={1}>
                                <Link href="/" color="inherit" sx={{ textDecoration: 'none'}}>
                                    Privacy
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2} sx={{ textAlign: { xs: 'center' } }}>
                            <Box
                            mb={1} 
                            sx={{
                                fontWeight: 700,
                                fontSize: 16,
                                color: 'inherit',
                            }}
                            >
                                Account
                            </Box>
                            <Box mb={1}>
                                <Link href="/" color="inherit" sx={{ textDecoration: 'none'}}>
                                    Login
                                </Link>
                            </Box>
                            <Box mb={1}>
                                <Link href="/" color="inherit" sx={{ textDecoration: 'none'}}>
                                    Register
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ display: { xs: 'grid', sm: 'none' } }}>
                            <Box textAlign="center" fontStyle='italic' pt={{ xs: 1, sm: 4 }} pb={{ xs: 1, sm: 0 }}>
                                HoneyMoney &reg; {new Date().getFullYear()}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer;
