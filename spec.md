# RRK Portfolio

## Current State
A personal portfolio site for Rohan Raj Kapoor (MERN Full Stack Developer) with sections: Hero, About, Experience, Skills, Projects, Services, Contact, Footer. Static content, no backend interaction.

## Requested Changes (Diff)

### Add
- Resume download button in the Hero section linking to the uploaded PDF (`/assets/uploads/ROHAN-RAJ-KAPOOR-FULLSTACK-1-1.pdf`)
- Contact form in the Contact section with fields: Name, Email, Subject, Message
- Backend storage for contact form submissions
- Admin view (behind login) to read submitted messages

### Modify
- Contact section: add contact form alongside existing contact info
- Navigation: possibly add an admin/messages link for logged-in admin

### Remove
- Nothing removed

## Implementation Plan
1. Select `authorization` component for admin login/access control
2. Generate Motoko backend with `submitContactMessage` (public) and `getContactMessages` (admin only) functions
3. Add resume download button in Hero section
4. Add contact form that calls `submitContactMessage`
5. Add admin messages page viewable after login
