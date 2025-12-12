# Victor Lewis Murimi - The Portfolio Issue

This is the source code for the personal portfolio website of Victor Lewis Murimi. The website is designed with a unique comic book/tech/gamified aesthetic to showcase projects, skills, and personality.

## What it Does

*   **Showcases Projects:** Displays a grid of projects with details, links, and difficulty ratings.
*   **Highlights Skills:** Features a "Superpowers" section with skill bars and an "Arsenal" of favorite tools.
*   **Tells a Story:** Includes a comic-strip style timeline of the developer's journey.
*   **Themed Experience:** Offers multiple themes (Light, Noir, Cyberpunk) that change the look and feel of the site.
*   **Interactive Elements:** Features animated panels, flippable project cards, and a hidden "Gemini" mini-quest.
*   **Blog:** Includes a static blog to share articles and insights.

## How to Set Up and Run

This is a static website built with pure HTML, CSS, and vanilla JavaScript. No complex build process is required.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Open `index.html` in your browser:**
    *   Simply open the `index.html` file in your web browser to view the website.
    *   For the best experience, it is recommended to serve the files using a local web server to handle asset loading correctly. You can use the VS Code "Live Server" extension or a simple Python server:
      ```bash
      # If you have Python 3
      python -m http.server
      ```
      Then, navigate to `http://localhost:8000` in your browser.

## Adding a New Blog Post

To add a new blog post, simply create a new HTML file (e.g., `post-2.html`) in the root directory and add a corresponding card to the `blog.html` file.
