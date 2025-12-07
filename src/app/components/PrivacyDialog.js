// src/components/PrivacyDialog.js
import React from 'react';
import { 
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, Box,
    DialogContent, DialogActions, Container, Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DATA_POLICY_CONTENT = `
Last Updated: December 2025

This Data Policy explains how Ebike Services Corp. collects, uses, protects, and handles your Personal Information when you use our Service.

1. Types of Data Collected
* User-Provided Data: Name, email, phone number, payment details, and delivery address.
* Automatic Data Collection:
    * Location Data: Precise real-time GPS location is collected for order matching, delivery, and safety purposes.
    * Usage Data: Device ID, IP address, operating system details, and interaction logs.

2. How We Use Your Data
We use your data to:
* Fulfill and manage delivery orders and process payments.
* Communicate service updates and provide customer support.
* Improve service quality, speed, and safety.
* Prevent fraud and ensure legal compliance.

3. Data Sharing and Disclosure
Your Personal Information may be shared with:
* Delivery Partners (Riders): Shared data includes your name, contact number, and delivery address.
* Vendors/Merchants: Order details necessary to prepare your items.
* Service Providers: Third parties handling cloud hosting, data analytics, and payment processing.

4. Data Security
We implement reasonable security measures to protect your Personal Information.

5. Your Rights
You have the right to request access to, correction of, or deletion of your Personal Information. You can also disable location tracking via your device settings, though this will significantly limit the app's core functionality.

6. Policy Updates
We will notify you of significant changes to this policy.

Contact: ebikeexpress@gmail.com
`;

export default function PrivacyDialog({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    {/* Retaining Close Button for Data Policy */}
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Data Policy
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent dividers sx={{ p: 0 }}>
                
                <Container maxWidth="md" sx={{ py: 1, px: 0 }}> 
                    
                    <Paper elevation={0} sx={{ p: 0 }}> 
                        
                        {/* FONT SIZE ADJUSTMENT: Changed variant to 'subtitle1' for larger text */}
                        <Typography 
                            variant="subtitle1" 
                            component="pre" 
                            sx={{ px: 2, py: 1 }} 
                            style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
                        >
                        </Typography>
                    </Paper>
                </Container>
            </DialogContent>
            <DialogActions sx={{ borderTop: '1px solid #ccc' }}>
            </DialogActions>
        </Dialog>
    );
}