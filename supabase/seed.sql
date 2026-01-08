-- CLEANUP: Clears existing data before seeding to avoid duplicates
TRUNCATE TABLE public.projects RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.posts RESTART IDENTITY CASCADE;

-- Seed data for Projects (12 Items)
INSERT INTO public.projects (title, slug, description, technologies, image_url, repo_link, live_link, is_featured, created_at)
VALUES
  -- Key Personal Projects
  (
    'MagineAI',
    'magine-ai',
    'AI-based personalized magazine & story generator for children. Generates age-appropriate content using LLMs and Diffusion models. (Final Year Project)',
    ARRAY['Next.js', 'Python', 'Flask', 'Generative AI', 'LLMs', 'Stable Diffusion'],
    'https://placehold.co/600x400/png?text=MagineAI',
    'https://github.com/example/magineapi',
    NULL,
    true,
    NOW()
  ),
  (
    'CareConnect',
    'care-connect',
    'All-in-one medical service app connecting patients with healthcare providers. Streamlines appointment booking and medical record management.',
    ARRAY['Flutter', 'Dart', 'Mobile App', 'Firebase'],
    'https://placehold.co/600x400/png?text=CareConnect',
    'https://github.com/example/careconnect',
    NULL,
    true,
    NOW() - INTERVAL '1 day'
  ),
  (
    'Pharmacy Management System',
    'pharmacy-management',
    'Java-based inventory and sales management system for pharmacies. Handles stock tracking, billing, and reporting.',
    ARRAY['Java', 'SQL', 'Swing', 'Desktop App'],
    'https://placehold.co/600x400/png?text=Pharmacy+System',
    NULL,
    NULL,
    false,
    NOW() - INTERVAL '5 days'
  ),
  (
    'Flutter To-Do App',
    'flutter-todo',
    'A clean and efficient task management application built with Flutter using Provider for state management.',
    ARRAY['Flutter', 'Dart', 'Provider'],
    'https://placehold.co/600x400/png?text=To-Do+App',
    'https://github.com/example/flutter-todo',
    NULL,
    false,
    NOW() - INTERVAL '7 days'
  ),

  -- Additional Demo Projects
  (
    'IdeaForge Hackathon Helper',
    'ideaforge-ai',
    'An AI-powered brainstorming assistant for hackathons. Generates innovative project ideas and implementation plans based on themes.',
    ARRAY['OpenAI API', 'React', 'Tailwind CSS'],
    'https://placehold.co/600x400/png?text=IdeaForge',
    NULL,
    'https://ideaforge.example.com',
    true,
    NOW() - INTERVAL '10 days'
  ),
  (
    'E-Commerce Dashboard',
    'ecommerce-admin-panel',
    'A comprehensive admin dashboard for managing products, orders, and customers for an online store.',
    ARRAY['Next.js', 'TypeScript', 'Tremor UI', 'Supabase'],
    'https://placehold.co/600x400/png?text=E-Com+Dashboard',
    NULL,
    NULL,
    false,
    NOW() - INTERVAL '12 days'
  ),
  (
    'Plant Disease Detector',
    'plant-disease-detector',
    'Computer Vision model to detect invasive plant species and diseases using UAV imagery.',
    ARRAY['Python', 'YOLOv8', 'OpenCV', 'PyTorch'],
    'https://placehold.co/600x400/png?text=AgroTech+AI',
    NULL,
    NULL,
    true,
    NOW() - INTERVAL '15 days'
  ),
  (
    'Crypto Portfolio Tracker',
    'crypto-tracker',
    'Real-time cryptocurrency tracking app with price alerts and portfolio analysis charts.',
    ARRAY['React Native', 'CoinGecko API', 'Redux'],
    'https://placehold.co/600x400/png?text=Crypto+Tracker',
    NULL,
    NULL,
    false,
    NOW() - INTERVAL '18 days'
  ),
  (
    'Smart Home Controller',
    'iot-home-controller',
    'IoT dashboard to control smart lights, thermostats, and locks via MQTT protocol.',
    ARRAY['Vue.js', 'Node.js', 'MQTT', 'IoT'],
    'https://placehold.co/600x400/png?text=Smart+Home',
    NULL,
    NULL,
    false,
    NOW() - INTERVAL '20 days'
  ),
  (
    'Recipe Finder',
    'recipe-finder-app',
    'Mobile app to find recipes based on ingredients available in your fridge.',
    ARRAY['Flutter', 'API Integration'],
    'https://placehold.co/600x400/png?text=Recipe+Finder',
    NULL,
    NULL,
    false,
    NOW() - INTERVAL '25 days'
  ),
  (
    'PDF Chatbot',
    'pdf-chatbot-rag',
    'RAG-based chatbot that allows users to upload PDF documents and ask questions about them.',
    ARRAY['LangChain', 'Pinecone', 'Next.js', 'OpenAI'],
    'https://placehold.co/600x400/png?text=PDF+Chatbot',
    NULL,
    NULL,
    true,
    NOW() - INTERVAL '30 days'
  ),
  (
    'Expense Splitter',
    'expense-splitter',
    'Group expense splitting app for trips and roommates. Includes automatic settlement calculation.',
    ARRAY['React', 'Firebase', 'PWA'],
    'https://placehold.co/600x400/png?text=Expensify+Clone',
    NULL,
    NULL,
    false,
    NOW() - INTERVAL '35 days'
  );

-- Seed data for Blog Posts (10 Items)
INSERT INTO public.posts (title, slug, content, published, published_at, created_at)
VALUES
  (
    'Welcome to My Portfolio',
    'welcome-portfolio',
    '# Welcome!

I am **Anil Das P.**, a Computer Science Engineering student specialized in Flutter and Full-Stack Web Development.

## My Journey
I started with a diploma in Computer Engineering and am now pursuing my B.Tech. I enjoy building practical solutions, from mobile apps like **CareConnect** to AI-driven web apps like **MagineAI**.

Stay tuned for more updates on my projects and learning journey!',
    true,
    NOW(),
    NOW()
  ),
  (
    'Getting Started with Flutter in 2025',
    'getting-started-flutter-2025',
    '# Why Flutter?

Flutter continues to be the dominant force in cross-platform mobile development. With Impeller engine now stable on both iOS and Android, performance is better than ever.

## Key Features
- **Hot Reload**: Speed up development.
- **Single Codebase**: Deploy to iOS, Android, Web, and Desktop.
- **Widget Catalog**: Extensive library of pre-built UI components.

I used Flutter to build **CareConnect**, and the experience was seamless.',
    true,
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days'
  ),
  (
    'Fine-Tuning LLMs on a Budget',
    'fine-tuning-llms-budget',
    '# Fine-Tuning Made Accessible

Training Large Language Models (LLMs) used to require massive compute. Today, techniques like **PEFT (Parameter-Efficient Fine-Tuning)** and **LoRA (Low-Rank Adaptation)** make it possible to run on consumer GPUs or free tiers like Google Colab.

## Tools I Use
- **Hugging Face**: For model hosting and datasets.
- **Google Colab**: Free GPU resources.
- **Unsloth**: For faster training.

I am currently exploring this for my final year project, **MagineAI**.',
    true,
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '5 days'
  ),
  (
    'Building Scalable Apps with Next.js 15',
    'scalable-apps-nextjs-15',
    'Next.js 15 introduces Turbopack and improved Server Actions. In this post, I discuss how I structured my portfolio using the App Router and Supabase for the backend.',
    true,
    NOW() - INTERVAL '8 days',
    NOW() - INTERVAL '8 days'
  ),
  (
    'My Experience at Xteum Technologies',
    'internship-experience-xteum',
    'Working as an intern at Xteum has been an eye-opening experience. I have been exposed to real-world development cycles, client requirements, and the importance of clean code architecture.',
    true,
    NOW() - INTERVAL '12 days',
    NOW() - INTERVAL '12 days'
  ),
  (
    'Understanding SQL Joins Visualized',
    'sql-joins-visualized',
    'A quick guide to understanding Inner, Left, Right, and Full Outer joins with visual diagrams. Essential for any backend developer.',
    true,
    NOW() - INTERVAL '15 days',
    NOW() - INTERVAL '15 days'
  ),
  (
    'Deploying Python Flask Apps to Vercel',
    'deploy-flask-vercel',
    'While Vercel is known for Next.js, it handles Python serverless functions surprisingly well. Here is a tutorial on deploying a Flask backend.',
    true,
    NOW() - INTERVAL '20 days',
    NOW() - INTERVAL '20 days'
  ),
  (
    'The Future of Generative AI in Education',
    'gen-ai-education',
    'How personalized story generation can help children engage more with reading. A look into the philosophy behind my MagineAI project.',
    false, -- DRAFT
    NULL,
    NOW() - INTERVAL '22 days'
  ),
  (
    'Dark Mode Implementation in Tailwind CSS',
    'dark-mode-tailwind',
    'Implementing a theme switcher using `next-themes` and Tailwind CSS. It is easier than you think!',
    true,
    NOW() - INTERVAL '25 days',
    NOW() - INTERVAL '25 days'
  ),
  (
    'Why I Switched from VS Code to Cursor? (Maybe)',
    'vscode-vs-cursor',
    'Just kidding, I use both! But AI-integrated IDEs are definitely changing the way we write code.',
    true,
    NOW() - INTERVAL '30 days',
    NOW() - INTERVAL '30 days'
  );
