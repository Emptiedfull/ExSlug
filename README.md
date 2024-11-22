Backlink Server

This project provides a simple backend server to manage and serve shortened links. It allows you to create new links with custom slugs, which redirect to the specified long URL.

Features:

Link Shortening: Creates short, shareable URLs for any given long URL.
Custom Slug Support: Allows you to specify custom slugs for your shortened links.
Admin Interface: A web-based admin panel to manage links, add new ones, and view statistics.
Getting Started:

Clone the Repository:

Bash
git clone https://github.com/Emptiedfull/ExSlug/


Install Dependencies:

pip install -r requirements.txt


Configure Environment Variables:
Create a .env file in the project root and add the following environment variables:

CODE= preffered admin access code
DATABASE_URL=your sql database


Start the Server:

uvicorn main:app --host <host> --port <port>

Usage:

Admin Interface: Access the admin panel at http://localhost:{port}/admin?code={code}
Going to a slug: http://localhost:{port}/{slug}
