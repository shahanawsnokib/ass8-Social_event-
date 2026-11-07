# Community Event Platform — Assignment Plan

Treat this document as the working summary of the assignment brief supplied by the project owner. Use it as the requirements reference when adding features or changing the interface.

## Product goal

Build a unique, responsive, community-driven platform where people can create, discover, join, and manage local social-service events. Example events include winter-clothes and blanket distributions in Dhaka neighborhoods such as Mirpur 10 and Mohammadpur. The visual identity and banner should clearly support community service and social development.

## Main pages and behavior

- **Shared navigation:** show the site name/logo and Upcoming Events. Signed-out users see Login. Signed-in users see their profile picture and Logout; hovering the picture reveals their display name. The profile dropdown links to protected Create Event, Manage Events, and Joined Events pages.
- **Home page:** include a community-service banner, feature highlights, six recent upcoming events loaded dynamically from MongoDB (use a limit), a static community-event photo gallery, and a newsletter signup design with no subscription functionality required.
- **Authentication:** email/password login and registration, plus either Google or GitHub login. Registration collects name, email, photo URL, and password. Passwords require at least six characters, one uppercase letter, and one lowercase letter. Show success/error feedback with a toast or SweetAlert. Do not add email verification or password reset for this assignment.
- **Create Event:** protected; any authenticated user may create an event with title, description, event type (for example cleanup, planting, or donation), thumbnail URL, location, and a future event date. Validate all fields and disallow past dates. Store the creator's email with the event. On success, show feedback and navigate to Upcoming Events.
- **Upcoming Events:** dynamically list user-created events that have not passed. Use consistent cards with thumbnail, title, location, type, date, and a View Event action.
- **Event details:** public to read. Joining requires authentication and must save both event and user information in MongoDB.
- **Joined Events / management:** show the current user's joined events sorted by event date. Allow users to view their own created events and update or delete them; enforce ownership so users cannot edit or delete another person's events.
- **Theme:** add a working light/dark toggle that applies across the full system.
- **Security and routing:** protect private pages and relevant APIs with JWT validation. Refreshing any route must work. Restoring a logged-in session on a private route must not send the user to Login.

## Quality and submission requirements

- Use meaningful copy; never use Lorem ipsum or the browser's default `alert()` for feedback.
- Make all pages responsive on mobile, tablet, and desktop. Keep heading, logo, button, spacing, and image treatments consistent; use aligned grids and equal-size cards where appropriate.
- Use the current X mark if a social link is shown; do not use the retired Twitter bird.
- README must identify the website, include its live URL, and have at least five feature bullets.
- Aim for at least 15 notable client-side GitHub commits and 8 notable server-side commits.
- Implement at least two optional enhancements: loading skeletons, profile view/edit, or an additional original feature.

## Intended stack

- **Client:** Next.js App Router, TypeScript or JavaScript, and Hero UI, DaisyUI, or shadcn/ui.
- **Authentication:** Better Auth with the MongoDB adapter and JWT-based authorization.
- **Server:** Express.js and MongoDB, using TypeScript or JavaScript.

The current repository is the Next.js client. Keep client and server work aligned with the assignment as the project grows, and record the eventual live URL in the README when deployment is available.
