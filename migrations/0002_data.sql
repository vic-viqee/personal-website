-- project: 10 rows
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (1, 'FLUXPAY: SAAS', 'A specialized M-Pesa payment and subscription platform for Kenyan businesses. Features subscription billing, a payment gateway portal, admin dashboard with Recharts analytics, Google OAuth, and M-Pesa STK Push integration.', 'fullstack', 5, '["React", "Vite", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "MongoDB", "Docker"]', 'https://fluxpay-frontend.onrender.com/', 'https://github.com/vic-viqee/fluxpay', 'assets/images/fluxpay.png', '<p><strong>Mission:</strong> Build a comprehensive M-Pesa payment and subscription platform for Kenyan businesses.</p><p><strong>Two Products in One:</strong> FluxPay offers both subscription billing AND payment gateway services — businesses can collect recurring payments or accept one-off M-Pesa transactions through a single platform.</p><p><strong>Key Features:</strong> Subscription management with automated recurring billing, Gateway Portal (/gateway) for Retail/POS and E-commerce businesses with Dynamic Till and Payment Links, Full-featured Admin Dashboard with dark theme (overview, businesses, transactions, subscriptions, API keys, webhooks, plan limits, audit trail), Analytics Dashboard with Recharts for revenue trends and subscription health, Data export (CSV), Google OAuth + JWT with refresh tokens and httpOnly cookies, Email notifications (Brevo/Mailhog), Self-service password reset, API keys and webhooks for third-party integrations.</p><p><strong>Tech Stack:</strong> React 18, Vite, TypeScript, Tailwind CSS, Recharts, Python/FastAPI, MongoDB (Beanie ODM), Docker</p>', '2026-04-15T09:42:15.770082', 10);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (2, 'CRYPTO SIGNAL BOT (AI)', 'A 24/7 market monitor deployed on Render. It combines technical indicators (RSI) with an AI Brain (Gemma
              3) that acts as a "News Guard," suppressing signals during negative market news events.', 'backend', 5, '["Python", "Telegram", "Flask"]', NULL, 'https://github.com/vic-viqee/signal_bot', 'assets/images/crypto-bot-preview.png', '<div class="project-details-back">
<h4>MISSION BRIEFING: CRYPTO SENTINEL</h4>
<p>A 24/7 market monitor deployed on Render. It combines technical indicators (RSI) with an AI Brain (Gemma
              3) that acts as a "News Guard," suppressing signals during negative market news events.</p>
<h5>KEY FEATURES:</h5>
<ul>
<li><strong>AI Sentiment Analysis:</strong> Uses LLMs to analyze news context before alerting.</li>
<li><strong>Architecture:</strong> Zero-downtime loop with Flask keep-alive pingers.</li>
<li><strong>Telegram Control:</strong> Full bi-directional command interface via Telegram API.</li>
</ul>
<button class="close-details-btn comic-btn">X</button>
</div>', '2026-04-15T09:42:15.773911', 50);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (3, 'YT WEB HUB V4.0', 'Transforms a local machine into a centralized media server. Built with Flask and HTMX, it orchestrates
              complex FFmpeg operations (like lossless splitting) through a responsive mobile interface.', 'fullstack', 5, '["Python (Flask)", "HTML5", "Bootstrap", "Flask"]', NULL, 'https://github.com/vic-viqee/yt-web-hub', 'assets/images/yt-web-hub-preview.png', '<div class="project-details-back">
<h4>MISSION BRIEFING: YT WEB HUB</h4>
<p>Transforms a local machine into a centralized media server. Built with Flask and HTMX, it orchestrates
              complex FFmpeg operations (like lossless splitting) through a responsive mobile interface.</p>
<h5>KEY FEATURES:</h5>
<ul>
<li><strong>SPA Architecture:</strong> Uses HTMX for real-time progress updates without reloads.</li>
<li><strong>Smart Splitting:</strong> Parsing engine to chop videos based on chapters or timestamps.</li>
<li><strong>Queue Management:</strong> Asynchronous background job processing.</li>
</ul>
<button class="close-details-btn comic-btn">X</button>
</div>', '2026-04-15T09:42:15.777901', 60);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (4, 'VIDEO SPLITTER CLI', 'A CLI-based automation tool for media post-processing. It calculates time-deltas to precisely segment
              large video files into social-media-ready chunks without quality loss.', 'automation', 3, '["Python"]', NULL, 'https://github.com/vic-viqee/video-splitter', 'assets/images/video-splitter-preview.png', '<div class="project-details-back">
<h4>MISSION BRIEFING: VIDEO SPLITTER</h4>
<p>A CLI-based automation tool for media post-processing. It calculates time-deltas to precisely segment
              large video files into social-media-ready chunks without quality loss.</p>
<h5>KEY FEATURES:</h5>
<ul>
<li><strong>FFmpeg Wrapper:</strong> Automates complex trimming commands via Python.</li>
<li><strong>Memory Management:</strong> Efficient handling of large file I/O operations.</li>
<li><strong>User Feedback:</strong> Integrated tqdm for real-time progress visualization.</li>
</ul>
<button class="close-details-btn comic-btn">X</button>
</div>', '2026-04-15T09:42:15.782663', 70);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (5, 'CAESAR CIPHER', 'A robust CLI implementation of the classic Caesar Cipher. Demonstrates mastery of string manipulation,
              modular arithmetic, and ASCII character mapping.', 'backend', 3, '["Python"]', NULL, 'https://github.com/vic-viqee/caesar_cipher', 'assets/images/caesar-cipher-preview.png', '<div class="project-details-back">
<h4>MISSION BRIEFING: ENIGMA LOGIC</h4>
<p>A robust CLI implementation of the classic Caesar Cipher. Demonstrates mastery of string manipulation,
              modular arithmetic, and ASCII character mapping.</p>
<h5>KEY FEATURES:</h5>
<ul>
<li><strong>Algorithm Logic:</strong> Custom implementation of shift-based encryption/decryption.</li>
<li><strong>Input Validation:</strong> Robust handling of non-alpha characters and case preservation.</li>
<li><strong>CLI Design:</strong> Clean, loop-based user interface for continuous operation.</li>
</ul>
<button class="close-details-btn comic-btn">X</button>
</div>', '2026-04-15T09:42:15.786673', 80);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (6, 'VIDEO DOWNLOADER CLI', 'A pure command-line automation tool script built with PowerShell. Designed for developers who prefer the
              terminal over GUIs for quick media extraction.', 'automation', 2, '["PowerShell", "Terminal"]', NULL, 'https://github.com/vic-viqee/online-video-downloader', 'assets/images/online-video-downloader-preview.png', '<div class="project-details-back">
<h4>MISSION BRIEFING: SHELL DOWNLOADER</h4>
<p>A pure command-line automation tool script built with PowerShell. Designed for developers who prefer the
              terminal over GUIs for quick media extraction.</p>
<h5>KEY FEATURES:</h5>
<ul>
<li><strong>Shell Scripting:</strong> Native PowerShell logic for seamless Windows integration.</li>
<li><strong>Batch Processing:</strong> Loops through URL lists for bulk downloads.</li>
<li><strong>CLI Arguments:</strong> accepts flags for format selection and resolution quality.</li>
</ul>
<button class="close-details-btn comic-btn">X</button>
</div>', '2026-04-15T09:42:15.791315', 90);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (7, 'CHOOSE YOUR OWN ADVENTURE', 'A lightweight interactive narrative engine. Built to demonstrate mastery of DOM manipulation and state
              management using pure JavaScript, with zero external dependencies.', 'frontend', 2, '["HTML5", "CSS", "JavaScript"]', NULL, 'https://github.com/vic-viqee/choose_your_own_adventure', 'assets/images/choose-your-own-adventure-preview.png', '<div class="project-details-back">
<h4>MISSION BRIEFING: ADVENTURE ENGINE</h4>
<p>A lightweight interactive narrative engine. Built to demonstrate mastery of DOM manipulation and state
              management using pure JavaScript, with zero external dependencies.</p>
<h5>KEY FEATURES:</h5>
<ul>
<li><strong>State Management:</strong> Custom object-based data structure to track narrative branching.
              </li>
<li><strong>DOM Manipulation:</strong> Dynamic rendering of story nodes based on user input.</li>
<li><strong>Performance:</strong> Optimized rendering with a near-zero initial load time.</li>
</ul>
<button class="close-details-btn comic-btn">X</button>
</div>', '2026-04-15T09:42:15.796677', 100);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (8, 'lipa-pole-pole', 'A mobile-first payment solution enabling installment-based transactions. Built with React and FastAPI, designed to make split payments simple and accessible for Kenyan users.', 'payment', 2, '["React", "Vite", "FastAPI", "Python", "JavaScript"]', 'https://lipa-polepole-api.victorlewismurimi.workers.dev/', 'https://github.com/vic-viqee/lipa-pole-pole', 'assets/images/lipa-pole-pole-hero.png', '<p><strong>Mission:</strong> Build a payment solution that lets users pay in installments — "Pole Pole" (Slowly).</p><p><strong>The Problem:</strong> Many Kenyans need flexible payment options that work with their cash flow. Traditional payment systems don''t support installment-based purchases easily.</p><p><strong>The Solution:</strong> A mobile-first web app using React for the frontend and FastAPI for the backend, designed to make split payments simple and accessible.</p><p><strong>Tech Stack:</strong> React, Vite, FastAPI, Python</p>', '2026-05-25T09:10:15.055810', 30);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (9, 'anything_marketplace', 'A peer-to-peer marketplace MVP for buying and selling anything with a ''Pay on Delivery'' model. Features product listings, buyer-seller chat, KYC verification, subscription tiers, and an admin dashboard. Built to serve Kenyan users who prefer cash-on-delivery.', 'fullstack', 5, '["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker", "Redis"]', 'https://anything-marketplace-web.onrender.com', 'https://github.com/vic-viqee/anything_marketplace', 'assets/images/anything-marketplace-hero.png', '<p><strong>Mission:</strong> Build a full-featured P2P marketplace where anyone can buy and sell anything — safely.</p><p><strong>The Problem:</strong> Existing marketplaces don''t cater well to Kenyan users who prefer cash-on-delivery and need a trust system for P2P transactions without street addresses.</p><p><strong>The Solution:</strong> A comprehensive marketplace with product feed, chat messaging, KYC verification, subscription tiers, rating system, and admin moderation.</p><p><strong>Key Features:</strong> Peer-to-peer chat, admin dashboard, subscription tiers, KYC verification, product approval workflow, seller ratings, dark/light mode.</p><p><strong>Tech Stack:</strong> Next.js 16, TypeScript, FastAPI, PostgreSQL, Redis, Docker</p>', '2026-05-25T09:10:15.057512', 20);
INSERT INTO "project" ("id", "name", "description", "category", "difficulty", "tech_stack", "live_demo_link", "github_repo_link", "image_url", "mission_briefing", "created_at", "sort_order") VALUES (10, 'Delivery', 'A grocery delivery platform purpose-built for Embu, Kenya that solves the addressing problem plaguing last-mile delivery. Uses GPS coordinates, landmark identification (Stage Anchors like Dallas, Kiritiri), voice directions, Plus Codes, and photo verification so riders can always find customers.', 'fullstack', 4, '["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "shadcn/ui", "PWA"]', NULL, 'https://github.com/vic-viqee/Delivery', 'assets/images/delivery-hero.png', '<p><strong>Mission:</strong> Solve last-mile grocery delivery in Kenya where street addresses don''t exist.</p><p><strong>The Problem:</strong> Kenya''s lack of street addresses makes delivery nearly impossible. Riders can''t find customers using traditional navigation.</p><p><strong>The Solution:</strong> A custom addressing system combining GPS coordinates, Stage Anchors (Matatu/Boda stages like Dallas, Kiritiri), 15-second voice directions, Plus Codes, and photo verification. Built as a mobile-first PWA with offline support and M-Pesa integration.</p><p><strong>Key Features:</strong> Custom address system, voice directions, PWA with offline sync, M-Pesa payments, stage anchor navigation.</p><p><strong>Tech Stack:</strong> Next.js 16, TypeScript, FastAPI, PostgreSQL, shadcn/ui, PWA</p>', '2026-05-25T09:10:15.058832', 40);

-- blogpost: 4 rows
INSERT INTO "blogpost" ("id", "title", "slug", "content", "excerpt", "image_url", "published_at") VALUES (1, 'My Journey into Web Development', 'post-1', '<section class="comic-panel" id="blog-post">
<h1 class="section-header">My Journey into Web Development</h1>
<div class="post-meta">Published on December 12, 2025</div>
<div class="post-content">
<img alt="Blog Post 1 Image" class="post-full-image" src="assets/images/blog-post-1-full.png"/>
<h2>The Spark</h2>
<p>It all started with a simple question: "How does the internet work?". This curiosity led me down a rabbit hole of HTML, CSS, and JavaScript. I was immediately hooked. The ability to create something from scratch, to bring an idea to life on a screen, was nothing short of magic to me.</p>
<h2>The First Steps</h2>
<p>My first "real" project was a simple one-page website for a local bakery. It was a static site, but to me, it was a masterpiece. I spent hours tweaking the CSS, making sure every pixel was in its right place. It was during this project that I realized the power of web development to make a real impact on businesses and people''s lives.</p>
<h2>The Challenges</h2>
<p>Of course, the journey wasn''t without its challenges. I''ve spent countless nights debugging code, fighting with webpack configurations, and trying to understand the latest JavaScript framework. But every challenge was a learning opportunity, a chance to grow and become a better developer.</p>
<h2>The Future</h2>
<p>Today, I''m more passionate about web development than ever before. I''m constantly learning, exploring new technologies, and building new things. The web is a constantly evolving landscape, and I''m excited to be a part of it. The journey is far from over; in fact, I feel like it has just begun.</p>
</div>
</section>', '', 'assets/images/journey-to-webdev.png', '2026-04-15T09:42:20.978153');
INSERT INTO "blogpost" ("id", "title", "slug", "content", "excerpt", "image_url", "published_at") VALUES (2, '3 Days of Hosting Hell: Deploying FluxPay', 'post-2', '<section class="comic-panel" id="blog-post">
<h1 class="section-header">3 Days of Hosting Hell: Deploying FluxPay</h1>
<div class="post-meta">Published on January 3, 2026</div>
<div class="post-content">
<img alt="FluxPay Deployment Chaos" class="post-full-image" src="assets/images/blog-post-2-full.png"/>
<h2>The "It Works on Localhost" Trap</h2>
<p>You know that feeling when your full-stack app finally runs perfectly on your laptop? The API is talking to the frontend, MongoDB is storing data, and the JWT auth is actually authenticating. You feel invincible. A coding god. That was me with FluxPay last week.</p>
<p>I thought the hard part was over. I thought deploying to Render would be a simple victory lap. "Just git push and go," I told myself.</p>
<p><strong>I was wrong. Dead wrong.</strong></p>
<h2>The 72-Hour Nightmare</h2>
<p>What followed was three days of absolute frustration. I''m talking about the kind of debugging where you stare at the screen at 3 AM, fueled by cold coffee, wondering if you should just become a goat farmer instead.</p>
<p>The problem? <strong>The MERN Stack structure.</strong> FluxPay isn''t just a static HTML site. It has a React frontend (which needs to be built) and a Node.js backend (which needs a server). Trying to get Render to understand which folder was which inside my repo was a disaster.</p>
<h3>The Rookie Mistakes I Made:</h3>
<ul>
<li><strong>The "Root Directory" Mess:</strong> I kept telling Render to look for the backend in the root folder, but my code was nested. Result? <code>Error: Cannot find module ''server.js''</code>. Over and over again.</li>
<li><strong>The Build Command Struggle:</strong> I tried running <code>npm install</code> on the frontend, forgetting that Render needs to run <code>npm run build</code> to generate the static files. My site deployed, but it was just a blank white screen of death.</li>
<li><strong>The Environment Variable trap:</strong> This was the one that kept me up the longest. My local <code>.env</code> file wasn''t pushed to GitHub (obviously, for security). I deployed the app, and it crashed instantly because it couldn''t find <code>MONGO_URI</code>. I felt like an idiot when I realized I hadn''t added them to the Render dashboard.</li>
</ul>
<h2>How to Actually Host FluxPay (So You Don''t Suffer)</h2>
<p>If you''re stuck in the same loop, here is the solution that finally worked for me. It turns out, you can''t just "host the repo." You have to treat them as two separate entities.</p>
<h3>1. Separate the Powers</h3>
<p>Don''t try to host everything as one "Web Service." Create two separate services on Render:</p>
<ul>
<li><strong>Backend:</strong> Create a "Web Service". Point it to your server folder. Set the Build Command to <code>npm install</code> and the Start Command to <code>node index.js</code>.</li>
<li><strong>Frontend:</strong> Create a "Static Site". Point it to your client folder. Set the Build Command to <code>npm run build</code> and the Publish Directory to <code>dist</code> (or <code>build</code>).</li>
</ul>
<h3>2. The Magic of Environment Variables</h3>
<p>Go to the "Environment" tab in Render for your Backend service. Manually add every single variable from your <code>.env</code> file. <br/><code>MONGO_URI</code>, <code>JWT_SECRET</code>, <code>PORT</code>. <br/>Without these, your app is just an empty shell.</p>
<h3>3. The CORS Fix</h3>
<p>Once both were live, my frontend couldn''t talk to my backend. Why? CORS. I had to go back into my Node.js code and whitelist my new Render frontend URL in the CORS configuration. One simple line of code, hours of headache.</p>
<h2>The Victory</h2>
<p>When I finally saw that green "Live" badge and logged into FluxPay from my phone, the relief was unreal. It wasn''t just about the code working; it was about beating the server environment.</p>
<p>Hosting isn''t just "uploading files." It''s understanding how the internet actually glue things together. I lost sleep, but I gained a skill.</p>
</div>
</section>', '', 'assets/images/hosting-hell.png', '2026-04-15T09:42:20.997353');
INSERT INTO "blogpost" ("id", "title", "slug", "content", "excerpt", "image_url", "published_at") VALUES (3, '7 Months at Tembo Tech Ventures: From Beginner to Builder', 'tembo-tech-ventures-cohort-experience', '<div class="comic-panel"><h1>7 Months at Tembo Tech Ventures: From Beginner to Builder</h1><p><em>Published May 2026</em></p><h2>How I Joined Tembo</h2><p>In late 2025, I joined Tembo Tech Ventures — a practical tech community for early builders across Africa. The program promised something different from traditional bootcamps: real software, working engineers as mentors, and a community that stays connected long after the cohort ends.</p><p>I was part of Cohort 04, based in Embu, Kenya. Over 7 months, I went from writing basic scripts to shipping full-stack applications.</p><h2>The Structure</h2><p>Tembo isn''t a course — it''s a working group. Each week, working engineers showed us the shape of real systems: how the backend connects to the frontend, how authentication works in production, how to structure a database that doesn''t fall apart when real users show up.</p><p>The accountability was the key difference. You don''t just watch videos; you build, you break things, you fix them, and you ship.</p><h2>What I Built</h2><p>During the cohort, I built three major projects:</p><p><strong>lipa-pole-pole</strong> — A payment solution for installment-based transactions. My first full-stack app combining React with FastAPI.</p><p><strong>anything_marketplace</strong> — A full P2P marketplace with buyer-seller chat, KYC verification, admin dashboard, subscription tiers, and product approval workflows. Built with Next.js + FastAPI + PostgreSQL, deployed on Render.</p><p><strong>Delivery</strong> — A grocery delivery platform solving Kenya''s addressing problem using GPS coordinates, stage anchors, voice directions, and photo verification. Built as a PWA with offline support.</p><h2>The Skills I Gained</h2><p>Beyond the technical skills (React, Next.js, FastAPI, PostgreSQL, Docker, TypeScript), I learned how to:</p><ul><li>Structure a full-stack project from scratch</li><li>Design databases that model real business logic</li><li>Deploy and debug production applications</li><li>Work with authentication, payments, and real-time features</li><li>Collaborate and communicate technical decisions clearly</li></ul><h2>What''s Next</h2><p>Tembo gave me the foundation and the confidence to build anything I can imagine. I''m now actively looking for opportunities where I can contribute, learn from experienced engineers, and build software that matters.</p><p>If you''re an early builder in Africa considering Tembo — apply. The community is the real product, and it stays with you long after the cohort ends.</p></div>', 'My journey through 7 months at Tembo Tech Ventures — building real full-stack applications, learning from working engineers, and discovering what it takes to ship production software.', 'assets/images/ttv-blog.png', '2026-05-25T09:10:17.031758');
INSERT INTO "blogpost" ("id", "title", "slug", "content", "excerpt", "image_url", "published_at") VALUES (4, 'Building Viq Systems: Code, Chaos, and the Reality of Tech Entrepreneurship', 'building-viq-systems-code-chaos-and-the-reality-of-tech-entrepreneurship', '<div class="comic-panel"><h1>Building Viq Systems: Code, Chaos, and the Reality of Tech Entrepreneurship</h1><p><em>Published July 2026</em></p><h2>Moving Beyond the Sandbox</h2><p>After spending months building full-stack applications in structured environments, I realized something critical: shipping clean code is only 20% of the battle. The remaining 80% is building a system that a real business actually needs, values, and is willing to pay for.</p><p>That realization is what led me to launch Viq Systems (viqsystems.tech).</p><p>The goal was straightforward but ambitious: build robust, highly automated custom business systems designed to eliminate manual bottlenecks for enterprises. But moving from a local environment to trying to acquire real paying clients opened up an entirely new set of challenges—both in the terminal and out in the real world.</p><h2>The Core Architecture</h2><p>To handle real-world business data without falling apart, I needed a stack optimized for speed, reliability, and rapid iteration. I built the foundation of Viq Systems utilizing:</p><ul><li><strong>FastAPI</strong> – For a blazing-fast, type-safe asynchronous backend.</li><li><strong>PostgreSQL &amp; Prisma</strong> – To model complex, relational business data with strict integrity.</li><li><strong>Next.js &amp; Tailwind CSS</strong> – To deliver a clean, intuitive, and highly responsive user dashboard.</li><li><strong>Automated Workflows</strong> – Deeply integrated background tasks designed to handle core business logic seamlessly.</li></ul><h2>Where the Code Broke: The Technical Hurdles</h2><p>Building a commercial product means there is zero room for error. If a script fails in a personal project, you restart the server. If an automated pipeline fails in a live business system, a company loses money.</p><p>One of the biggest engineering hurdles was designing the state management for our automated business workflows. When dealing with multi-step processes—like handling sequential data updates or external API triggers—real-world edge cases constantly try to break the chain. I had to implement strict error handling, retry mechanisms, and asynchronous worker queues to ensure that even if a network request dropped or an unexpected payload arrived, the system could recover gracefully without losing data integrity.</p><p>I also had to transition our web service monitoring to a strict, highly active setup using Cronitor, ensuring that any heartbeat failure or silent backend error alerts me instantly before a client ever notices.</p><h2>The ''Hard'' Part: The Marketing Grind</h2><p>If building the engine was a technical challenge, getting people to care about it was an absolute reality check.</p><p>As developers, we like to think that if we build something beautiful, users will magically appear. They don''t. The reality of tech entrepreneurship is that clean code doesn''t matter if nobody knows your product exists.</p><p>The marketing grind has been the hardest part of this journey. I''ve had to completely step out of my comfort zone and learn how to sell. This means:</p><ul><li><strong>Handling Constant Rejection:</strong> Reaching out to busy business managers who have zero time to read an email or listen to a pitch.</li><li><strong>Translating Tech into Value:</strong> Learning that non-technical business owners do not care about FastAPI, Docker, or database normalization. They care about two things: saving time and cutting costs. I''ve had to completely re-engineer my pitch from explaining how the code works to demonstrating how much manual labor the system eliminates.</li><li><strong>The Continuous Hustle:</strong> Consistently doing cold outreach, refining the value proposition, and finding the specific operational gaps where custom automation can make an undeniable impact.</li></ul><h2>What I''ve Learned So Far</h2><p>Launching Viq Systems has completely evolved how I approach software engineering. It has forced me to stop thinking just like a coder and start thinking like a product owner. Every line of code I write now is directly tied to a business outcome.</p><p>The hustle is real, the rejections are frequent, but the momentum is building. We are actively pushing forward, refining our custom modules, and knocking on doors to show businesses what true software-driven automation looks like.</p><p>If you are a business owner looking to automate your workflows, streamline your data, and stop wasting hours on repetitive manual tasks, check out what we are doing at viqsystems.tech. Let''s build something efficient together.</p></div>', 'After spending months building full-stack applications in structured environments, I realized something critical: shipping clean code is only 20% of the battle.', 'assets/images/viq_systems.png', '2026-07-08T08:51:42.158729');

-- skill: 11 rows
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (1, 'Agentic Engineering', 79, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (2, 'Prompting', 86, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (3, 'Git / GitHub', 67, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (4, 'Python', 93, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (5, 'HTML / CSS', 87, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (6, 'M-Pesa Daraja API', 40, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (7, 'Automation & Bots', 25, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (8, 'JavaScript', 41, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (10, 'Typescript', 38, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (11, 'FastAPI', 68, 'superpower');
INSERT INTO "skill" ("id", "name", "level", "category") VALUES (13, 'Linux', 84, 'superpower');

-- timelineevent: 3 rows
INSERT INTO "timelineevent" ("id", "year", "title", "description", "side") VALUES (1, '2024', 'ISSUE #1: THE REAL START!', 'Dove into HTML, CSS, and JavaScript while grinding through countless YouTube tutorials. Built my first
              real projects by hand.', 'left');
INSERT INTO "timelineevent" ("id", "year", "title", "description", "side") VALUES (2, '2025', 'LEVEL-UP YEAR!', 'Expanded into Python and Next.js. Entered the AI era using coding agents like Gemini CLI and Opencode to
              accelerate builds and experimentation.', 'right');
INSERT INTO "timelineevent" ("id", "year", "title", "description", "side") VALUES (3, 'FUTURE', 'THE FLUXPAY ERA!', 'Building FluxPay into a full-scale M-Pesa automation platform: STK Push, virtual tills,
              auto-reconciliation, AI systems, and beyond.', 'left');

-- educationentry: 8 rows
INSERT INTO "educationentry" ("id", "degree", "institution", "years") VALUES (1, 'Diploma in Information Technology', '[Embu College] | 2024 – Present', '');
INSERT INTO "educationentry" ("id", "degree", "institution", "years") VALUES (2, 'Cisco Certified Networking Associate (CCNA1)', '[Embu College] | 2024', '');
INSERT INTO "educationentry" ("id", "degree", "institution", "years") VALUES (3, 'HTML, CSS & JavaScript Fundamentals', '[Self-Taught / YouTube] | 2024', '');
INSERT INTO "educationentry" ("id", "degree", "institution", "years") VALUES (4, 'Version Control (Git & GitHub)', '[GitHub Docs + Git Bash] | 2024 – Present', '');
INSERT INTO "educationentry" ("id", "degree", "institution", "years") VALUES (5, 'Python Programming & Automation', '[Self-Taught] | 2024 – Present', '');
INSERT INTO "educationentry" ("id", "degree", "institution", "years") VALUES (6, 'M-Pesa Daraja API & Financial Automation', '[Safaricom Developer Portal] | 2025 – Present', '');
INSERT INTO "educationentry" ("id", "degree", "institution", "years") VALUES (7, 'Cloud Deployment (Netlify, Vercel, Render)', '[Documentation & Practical Deployment] | 2025 – Present', '');
INSERT INTO "educationentry" ("id", "degree", "institution", "years") VALUES (8, 'AI Agents & Vibecoding (Gemini CLI, Opencode)', '[Cutting-Edge AI Tools] | 2025 – Present', '');

-- award: 4 rows
INSERT INTO "award" ("id", "title", "host", "badge_id", "is_certificate", "link") VALUES (1, 'Intro to Cybersecurity', 'Cisco Networking Academy', NULL, 1, '/legacy-static/certificates/Introduction_to_Cybersecurity_certificate_victorlewismurimi-gmail-com_f7cb4c93-1e69-47ac-ad03-03212bc50067.pdf');
INSERT INTO "award" ("id", "title", "host", "badge_id", "is_certificate", "link") VALUES (2, 'CCNA: Intro to Networks', NULL, '4525fb82-ceed-4986-a227-e99a2923119e', 0, NULL);
INSERT INTO "award" ("id", "title", "host", "badge_id", "is_certificate", "link") VALUES (3, 'Python Essentials 1', 'Cisco Networking Academy', 'c017a71b-fdc9-46fa-a2d1-e2843ff02d28', 0, '/legacy-static/certificates/Python_Essentials_1_certificate_victorlewismurimi-gmail-com_10232ebd-7b37-4e44-8c1d-60e60122b011.pdf');
INSERT INTO "award" ("id", "title", "host", "badge_id", "is_certificate", "link") VALUES (4, 'Cisco Packet Tracer', 'Cisco Networking Academy', NULL, 1, '/legacy-static/certificates/Getting_Started_with_Cisco_Packet_Tracer_certificate_victorlewismurimi-gmail-com_4dabb282-ff43-47e5-a6f0-fe48e4fb1e65.pdf');

-- tool: 5 rows
INSERT INTO "tool" ("id", "name", "description", "icon_url") VALUES (1, 'VS CODE', 'My primary code editor, where the magic happens.', 'assets/tech/vscode.svg');
INSERT INTO "tool" ("id", "name", "description", "icon_url") VALUES (2, 'GITHUB', 'My mission control for version control and collaboration.', 'assets/tech/github.svg');
INSERT INTO "tool" ("id", "name", "description", "icon_url") VALUES (3, 'GEMINI CLI', 'My AI pair programmer for coding and debugging.', 'assets/images/gemini.webp');
INSERT INTO "tool" ("id", "name", "description", "icon_url") VALUES (4, 'OPENCODE', 'Open-source platform for collaborative coding and learning.', 'assets/images/opencode.webp');
INSERT INTO "tool" ("id", "name", "description", "icon_url") VALUES (5, 'GITHUB COPILOT', 'AI-powered code completion and suggestion tool.', 'assets/images/github-copilot.webp');

-- hobby: 9 rows
INSERT INTO "hobby" ("id", "name", "side") VALUES (1, 'AI EXPERIMENTATION: Testing Gemini CLI, Opencode, and building small AI agents.', 'left');
INSERT INTO "hobby" ("id", "name", "side") VALUES (2, 'TECH YOUTUBE QUESTS: Binge-learning new frameworks, tools, and dev tips.', 'left');
INSERT INTO "hobby" ("id", "name", "side") VALUES (3, 'AUTOMATION MINI-PROJECTS: Creating scripts and tiny tools that solve everyday problems.', 'right');
INSERT INTO "hobby" ("id", "name", "side") VALUES (4, 'BUG HUNTING: Tracking and eliminating code villains across the multiverse.', 'right');
INSERT INTO "hobby" ("id", "name", "side") VALUES (5, 'CODING MARATHONS: All-night missions powered by focus mode and determination.', 'left');
INSERT INTO "hobby" ("id", "name", "side") VALUES (6, 'IDEA FORGING: Crafting micro-SaaS concepts, futuristic tools, and bold side projects.', 'right');
INSERT INTO "hobby" ("id", "name", "side") VALUES (7, 'YOUTUBE QUESTING: Diving into deep tutorials, hacks, and knowledge vaults.', 'left');
INSERT INTO "hobby" ("id", "name", "side") VALUES (8, 'ENTREPRENEURSHIP: Studying SaaS, monetization, and building products like FluxPay.', 'right');
INSERT INTO "hobby" ("id", "name", "side") VALUES (9, 'API & SYSTEM DESIGN: Learning backend architecture, patterns, and modern API workflows.', 'left');

-- sitesetting: 2 rows
INSERT INTO "sitesetting" ("id", "key", "value") VALUES (1, 'linkedin_url', 'www.linkedin.com/in/victor-lewis-murimi-1357753b4');
INSERT INTO "sitesetting" ("id", "key", "value") VALUES (2, 'github_url', 'https://github.com/vic-viqee/');

-- sectionvisibility: 0 rows
