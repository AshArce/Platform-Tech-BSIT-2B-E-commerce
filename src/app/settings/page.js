
"use client"; // Retained to allow use of React Hooks like useState

import { DarkMode } from '@mui/icons-material';
import React from 'react';

// ---------------------------
// 1. Reusable Styles (Updated for Website View)
// ---------------------------
const styles = {
    screenContainer: {
        // --- CHANGES FOR WEBSITE VIEW ---
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', // Light gray background for the overall page
        display: 'flex',
        justifyContent: 'center', // Center the content card
        alignItems: 'flex-start',
        padding: '40px 20px', // Add more vertical padding
        boxSizing: 'border-box',
    },
    settingsCard: {
        width: '100%',
        maxWidth: '700px', // Increased max width for a desktop screen
        backgroundColor: 'white',
        borderRadius: '12px', // Slightly less rounded for a web feel
        padding: '20px 0',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Subtle shadow
        marginTop: '0px',
        overflow: 'hidden',
    },
    // ---------------------------------
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px 10px',
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px', // Slightly larger title for desktop
        fontWeight: '600',
        flexGrow: 1,
        textAlign: 'left', // Aligned left for website view
        marginLeft: '20px', // Give space after the back button
    },
    backButton: {
        cursor: 'pointer',
    },
    section: {
        padding: '0 20px',
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#333',
        marginTop: '25px',
        marginBottom: '10px',
    },
    divider: {
        height: '1px',
        backgroundColor: '#f0f0f0',
        margin: '10px 0',
    },
    // Toggle Switch Styling (Unchanged)
    switchContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    toggleInput: { opacity: 0, width: 0, height: 0 },
    slider: {
        cursor: 'pointer',
        width: '40px',
        height: '20px',
        backgroundColor: '#ccc',
        transition: '0.4s',
        borderRadius: '34px',
        position: 'relative',
    },
    sliderBefore: (isChecked) => ({
        position: 'absolute',
        content: '""',
        height: '16px',
        width: '16px',
        left: '2px',
        bottom: '2px',
        backgroundColor: 'white',
        transition: '0.4s',
        borderRadius: '50%',
        transform: isChecked ? 'translateX(20px)' : 'translateX(0)',
    }),
    toggleChecked: { backgroundColor: '#007aff' },
    arrowIcon: { fontSize: '18px', color: '#999', fontWeight: 'bold' }
};

// ---------------------------
// 2. Reusable Components (Unchanged)
// ---------------------------

const ToggleSwitch = ({ isChecked, onToggle }) => (
    <div style={styles.switchContainer}>
        <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onToggle}
                style={styles.toggleInput}
            />
            <div style={{...styles.slider, ...(isChecked ? styles.toggleChecked : {})}}>
                <div style={styles.sliderBefore(isChecked)}></div>
            </div>
        </label>
    </div>
);

const ToggleSettingItem = ({ title, description, isChecked, onToggle }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
        <div style={{ flexGrow: 1 }}>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '500' }}>{title}</p>
            {description && <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#999' }}>{description}</p>}
        </div>
        <ToggleSwitch isChecked={isChecked} onToggle={onToggle} />
    </div>
);

const NavigationItem = ({ title, onClick }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 0',
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        <p style={{ margin: 0, fontSize: '15px' }}>{title}</p>
        <span style={styles.arrowIcon}>&gt;</span>
    </div>
);

const ProfileHeader = ({ name, description, onEdit }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
           
            <div>
                <p style={{ fontWeight: 'bold', fontSize: '16px', margin: 0 }}>{name}</p>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>{description}</p>
            </div>
        </div>
        <button
            onClick={onEdit}
            style={{
                backgroundColor: '#007aff',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 15px',
                fontWeight: '600',
                cursor: 'pointer',
            }}
        >
            Edit
        </button>
    </div>
);


// ---------------------------
// 3. Main Page Component (Unchanged logic)
// ---------------------------
export default function SettingsPage() {
    const [pushChecked, setPushChecked] = React.useState(true);
    const [Darkmode, setDarkMode] = React.useState(false);

    const handleBack = () => console.log('Go back action');
    const handleEdit = () => console.log('Edit profile clicked!');
    const handleNavClick = (item) => console.log(`Navigating to ${item}`);

    return (
        <div style={styles.screenContainer}>
            <div style={styles.settingsCard}>
                {/* Header */}
                <div style={styles.header}>
                    <span style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handleBack}>&larr;</span>
                    <h1 style={styles.title}>Settings</h1>
                </div>

                {/* General Settings Card */}
                <div style={styles.section}>
                    <h3 style={{...styles.sectionTitle, marginTop: 0}}>General Settings</h3>
                    
                    {/* Profile Header */}
                    <ProfileHeader
                        name="Location Settings"
                        description="Change Location"
                        onEdit={handleEdit}
                    />
                    <div style={styles.divider} />
                    
                    {/* Push Notifications */}
                    <ToggleSettingItem
                        title="Push Notifications"
                        description="Allow fetch to send push notifications to your device"
                        isChecked={pushChecked}
                        onToggle={() => setPushChecked(!pushChecked)}
                    />
                    <div style={styles.divider} />

                    {/* Email Notifications */}
                    <ToggleSettingItem
                        title="Dark Mode"
                        isChecked={Darkmode}
                        onToggle={() => setDarkMode(!Darkmode)}
                    />
                </div>

                {/* Support Section Card */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Support</h3>
                    <NavigationItem
                        title="Terms of Service"
                        onClick={() => handleNavClick('Terms of Service')}
                    />
                    <div style={styles.divider} />
                    <NavigationItem
                        title="Data Policy"
                        onClick={() => handleNavClick('Data Policy')}
                    />
                    <div style={styles.divider} />
                    <NavigationItem
                        title="About"
                        onClick={() => handleNavClick('About')}
                    />
                    <div style={styles.divider} />
                    <NavigationItem
                        title="Help / FAQ"
                        onClick={() => handleNavClick('Help / FAQ')}
                    />
                    <div style={styles.divider} />
                    <NavigationItem
                        title="Contact us"
                        onClick={() => handleNavClick('Contact us')}
                    />
                </div>
            </div>
        </div>
    );
}