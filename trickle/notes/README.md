# PGP College Event Management System

## Overview
A comprehensive web application for managing college events and sending automated SMS reminders to participants.

## Features
- **Multi-User Login System**: Multiple user accounts with different roles
- **User Management**: Create new users and reset passwords via admin panel
- **Event Management**: Create, view, and delete college events
- **SMS Notifications**: Automated reminders sent 1 day before events
- **Phone Number Management**: Add/remove notification recipients
- **Responsive Design**: Mobile-friendly interface

## Login Credentials
- **Admin**: admin / admin123
- **Faculty**: faculty / faculty456  
- **Student**: student / student789
- **Coordinator**: coordinator / coord2024
- **Reset Panel**: reset / reset123

## System Components

### Pages
- `index.html` - Login page with college branding
- `dashboard.html` - Main event management dashboard
- `admin.html` - User management and password reset panel

### Key Components
- `LoginForm.js` - User authentication interface with multiple account support
- `EventForm.js` - Add new events
- `EventList.js` - View and delete events
- `PhoneManager.js` - Manage SMS recipient numbers
- `Header.js` - Navigation and college branding
- `UserManager.js` - Admin panel for user management and password resets

### Services
- `auth.js` - Authentication utilities
- `smsService.js` - Automated SMS reminder system

## Database Tables
- `event` - Stores event information
- `phone_number` - SMS notification recipients
- `sms_log` - SMS delivery tracking

## Usage
1. Login with any user credentials (admin, faculty, student, coordinator)
2. Switch between "Events Management" and "SMS Notifications" tabs
3. Add events with date, time, location details
4. Add phone numbers for SMS notifications
5. System automatically sends reminders 1 day before events

### Admin Panel Access
1. Use reset credentials (reset / reset123) to access admin panel
2. Reset passwords for existing users
3. Create new user accounts with different roles
4. View all current users in the system

## College Information
- **Institution**: PGP College of Engineering and Technology
- **Department**: ECE ELECTROSWAGGERS
- **Purpose**: Streamlined event management and communication