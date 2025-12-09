// src/components/TermsDialog.js
import React, { useState } from 'react';
import { 
    Dialog, AppBar, Toolbar, IconButton, Typography, Button, Box,
    DialogContent, DialogActions, FormControlLabel, Checkbox, Container, Paper,
    Divider
} from '@mui/material';
// CloseIcon removed, as requested
// import CloseIcon from '@mui/icons-material/Close'; 

// --- TERMS OF SERVICE CONTENT ---
const TERMS_CONTENT = `
Last Updated: December 2025

Please read these Terms of Service carefully before using the E-Bike Express mobile application operated by Ebike Services Corp. 

1. Account Registration and Eligibility
To use our Service, you must register for an account and be at least 18 years old. You are responsible for maintaining the confidentiality of your account.

2. Service and Orders
We provide a platform connecting you with independent local vendors and independent E-Bike riders for the delivery of goods. E-Bike Express does not prepare, handle, or own the goods being delivered, nor are we the employer of the independent riders. All orders are subject to acceptance by the vendor.

3. Payment and Billing
You agree to pay all fees and charges incurred, including delivery fees, service fees, and applicable taxes, at the time of order confirmation. We use a secure third-party processor for all payments.

4. User Conduct
You agree not to use the Service to violate any applicable laws, upload viruses, or harass any person, including our Riders and local partners.

5. Intellectual Property
The Service and its original content are the exclusive property of Ebike Services Corp. and its licensors.

6. Termination
We may terminate or suspend your account immediately, without prior notice, for any breach of these Terms.

7. Limitation of Liability
In no event shall Ebike Services Corp., nor its directors, employees, or affiliates, be liable for any indirect or consequential damages resulting from your use of the Service.

8. Governing Law and Dispute Resolution
These Terms shall be governed and construed in accordance with the laws of [Insert Jurisdiction]. Disputes shall be subject to binding arbitration in [Insert City/Region].

9. Changes to Terms
We reserve the right to modify these Terms at any time, providing at least 30 days' notice before new terms take effect.

10. Contact Us
For questions, contact us at ebikeexpress@gmail.com.
`;

export default function TermsDialog({ open, onClose }) {
    const [hasAgreed, setHasAgreed] = useState(false);

    const handleAgreeAndClose = () => {
        if (hasAgreed) {
            console.log("User explicitly agreed to Terms of Service.");
            // In a production app, save this agreement status permanently here.
            onClose(); 
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Terms of Service
                    </Typography>
                    <Box sx={{ width: 48 }} /> 
                </Toolbar>
            </AppBar>
            
            <DialogContent dividers sx={{ p: 0 }}>
                {/* 1. MINIMIZE PADDING ON CONTAINER: Use px: 0 to force max width utilization */}
                <Container maxWidth="md" sx={{ py: 1, px: 0 }}>
                    {/* 2. MINIMIZE PADDING ON PAPER: Use p: 0 */}
                    <Paper elevation={0} sx={{ p: 0 }}>
                        
                        {/* 3. MAIN CONTENT - Set large variant, use sx for internal padding */}
                        <Typography 
                            variant="subtitle1" 
                            component="pre" 
                            sx={{ px: 2, py: 1 }} 
                            style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
                        >
                            {TERMS_CONTENT}
                        </Typography>

                        <Divider sx={{ my: 2 }}/>
                        
                        {/* 4. CHECKBOX */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={hasAgreed} 
                                        onChange={(e) => setHasAgreed(e.target.checked)} 
                                        color="primary"
                                    />
                                }
                                label="I have read and agree to the Terms of Service"
                            />
                        </Box>
                    </Paper>
                </Container>
            </DialogContent>
            
            {/* 5. DIALOG ACTIONS AT THE BOTTOM */}
            <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', p: 3, borderTop: '1px solid #ccc' }}>
                <Button 
                    onClick={handleAgreeAndClose} 
                    color="primary" 
                    variant="contained"
                    disabled={!hasAgreed} 
                >
                    I Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}