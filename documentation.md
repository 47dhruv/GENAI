# AI Persona Chat - Documentation

This document explains the architecture, design decisions, and setup instructions for the AI Persona Chat application.

## 1. How the Persona Data was Collected and Prepared
The persona data was meticulously gathered to capture both the teaching and conversational styles of the educators.
- **Transcripts Analysis**: For Hitesh, data was collected by analyzing 5 transcripts, which included 4 unscripted Hindi live Q&A streams (covering topics like DevOps, career advice, pricing philosophy) and 1 scripted tutorial intro. For Piyush, similar rigorous transcription and analysis were performed on his cohort-based courses and live streams.
- **Style and Vocabulary Extraction**: Key phrases, catchphrases (e.g., "dekho yaar", "right?", "samjh rahe ho?"), and vocabulary were extracted to understand their distinct Hinglish speaking styles (code-switching between Hindi and English).
- **Teaching Philosophy**: Their teaching philosophies (e.g., Hitesh's direct, no-nonsense approach and real-world analogies, vs. Piyush's philosophical, mental-model building, repetitive emphasis style) were documented into JSON and text files in the `server/data` directory to guide the AI behavior accurately.

## 2. Prompt Engineering Strategy
The core of the personas relies on highly detailed system prompts (located in `server/personas/*.js`), heavily tested and iterated to enforce strict persona alignment.
- **Core Identity and Roleplay**: The prompts establish the persona's background, years of experience, and ultimate goals in answering the user (e.g., encouraging action over just watching tutorials).
- **Linguistic Profile and Tone**: The prompts strictly instruct the LLM on how to mix languages (Hinglish), including specific filler words ("obviously", "toh", "yaar", "Riiiight?"). The tone is defined precisely (e.g., deadpan-sarcastic but warm for Hitesh; engaging and philosophical for Piyush).
- **Answering Guidelines**: The LLM is given specific rules on how to format answers—using short punchy sentences for Q&A, and avoiding pure formal English or pure shuddh Hindi. The prompts contain "Do's and Don'ts" and "Negative Constraints" to prevent generic AI behaviors (like overly polite apologies, robotic transitions, or long bulleted lists).

## 3. Context Management Approach
The application handles conversational context to maintain coherent and flowing interactions between the user and the persona.
- **Message History**: The conversation history (previous user and assistant messages) is maintained by the client and passed along with every new prompt to the Gemini API (`server/services/geminiapi.service.js`).
- **Structure**: The `openaiClient.chat.completions.create` method is used where the `messages` array is structured as:
  1. `role: 'system'` - Containing the large injected persona prompt (from `server/personas/`).
  2. `role: 'user'/'assistant'` - The historical conversation payload to maintain continuity.
  3. `role: 'user'` - The latest user query.
- **Temperature Configuration**: The model temperature is explicitly set to `0.9` to allow for a more creative, natural, and human-like variation in their Hinglish responses, preventing repetitive or robotic phrasing.

## 4. Sample Conversations Demonstrating Both Personas

### Persona: Hitesh
**User**: Bhai, I am stuck in tutorial hell for 2 years. Should I learn React or Next.js first?
**Hitesh**: Arre yaar, dekho. You are already stuck in tutorial hell for 2 years and you are asking whether to pick React or Next.js? It doesn't work that way. Honestly, you are just finding an excuse to watch another 10-hour course. Sabse pehle, pick plain React, build one simple ugly project, and deploy it. That's it. Next.js baad ki baat hai, pehle fundamentals toh clear karo. Bas itna hi hai, start writing code.

### Persona: Piyush
**User**: Can you explain what Docker is?
**Piyush**: Okee, dekho. Samjh rahe ho? Let's build a mental model for this. Imagine you are moving to a new house, right? Ab apne saare saman ko ek box me daal diya hai. No matter which truck moves it, the inside of the box stays exactly the same, yes aur no? Docker is exactly like that box, but for your code. It packages your code and all its dependencies so it runs exactly the same everywhere. Ye sirf ek container hai, right? Samjh aaya?

## 5. Setup and Run Instructions (README)

### Prerequisites
- Node.js (v18+)
- Gemini API Key

### Setup
1. Clone the repository and install dependencies in both the `client` and `server` directories:
   ```bash
   cd client && npm install
   cd server && npm install
   ```
2. **Environment Configuration**:
   - In the `server` directory, create a `.env` file based on `.env.example` (or just create it) and add your `GEMINI_API_KEY`:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
   - In the `client` directory, create a `.env` file with:
     ```env
     VITE_API_URL=https://genai-xuio.onrender.com
     ```

### Run Development Servers
Start both servers simultaneously in two separate terminals:

- **Backend (Server)**:
  ```bash
  cd server && npm run dev
  ```
  *The server will run on https://genai-xuio.onrender.com*

- **Frontend (Client)**:
  ```bash
  cd client && npm run dev
  ```
  *The client will run on https://genai-vert.vercel.app/*
