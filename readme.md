# Ai Interview Taker

# Requirements
  - Interview Catalog(Dashboard)
    * List all saved interviews (createdAt = -1);
    * Show interview detials like, [role,experience level,createdAt,
    tech stack,type (technical,behavioural,mixed)]
    * Get the interview done

  - Create Interview 
    * User should be able to create the interview  [role,experience level,createdAt,
    tech stack,type (technical,behavioural,mixed)]
    * The OpenAi api should generate a JSON array of interview questions based on interview created
    * Generated questions should avoid that breaking voice assistants (/,*,markdown)
    * Once interview is created , user should be redirected to dashboard
    
  - Voice mock interview (Vapi)
    * User should be able to start a real-time voice session on interview detials page
    * Voice shall be powered by Vapi web sdk with a configured interviewer assistant (system prompt+injected questions)
    * call status : Connection , Active , Finished
    * The frontend should accumulate the live transacript from Vapi message events both user and assistant and send back to backend

  - Ai Feedback
    * Accept transcript [interview id ,userid , role , content ]
    * Call OpenAi with a structured schema to produce [totalScore(0-100), strengths  areasForImprovement,five categories scores,and finalAssesment]
    * Get feed back based on interview id
    * User should be able to retake and update the existing feedback

# Api Design
  - GET 
    - api/v1/health : health check
  - GET
    - api/v1/interviews : List interviews based on user id (query)
  - POST
    - api/v1/interviews : Create a interview
  - GET
    - api/v1/interviews/:id : Get interview by id
  - POST 
    - api/v1/feedback : Generate and save feedback based on interview id
  - GET
    - api/v1/feedback/interviews/:id : Get feedback of an interview id
  
# Improvements (as most of them are common)
  - No Auth (sign-up,sign-in,authentication(jwt/cookies),authroization) 
  - No user id (relationships)
  - global interview (user based)


# Tech stack
  - Front End (Ready to use basic reactjs code provided with vapi client)
  - Backend End Focused
    * Nodejs
    * Typescript
    * Express
    * Mongoose (Collections : Interviews & FeedBack)
    * Cors (allow local frontend to communicate with server)
    * Zod
    * OpenAi (any model)

# External Services
   - OpenAi Apis - call via axios 
   - MongoDb - mongoose orm
   - Vapi publice token (frontend voice ai agent)(sdk)
      - SST (speech to text)
      - LLM (interviewer decides what to say next)
      - TTS (text to speech) - the reply that is spoken by interviewer says

# Flow
  - Browser will ask for microphone permission
  - ui starts a vapi call using public web token (vite vapi web token)
  - vapi talks / listens - Backend is idle
  - ui accumulates a live transcrpt from vapi events 
  - call ends - ui - post req - server 
  - server - post req - openai - saves in db 
  - feed back


import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "your-api-key",
});

const response = openai.responses.create({
  model: "gpt-6-luna",
  input: "Ask anything",
  store: true,
});

response.then((result) => console.log(result.output_text));


# 2 important things about mongodb
  - [Embedding] : storing related data inside the same parent document like nested objects
  - [Refrencing] : storing realted data inside the other collection, by only keeping a referreing id pointer

# you can store nested objects and embeddings in relational databases like PostgreSQL and MySQL, but they handle them differently than MongoDB. While MongoDB natively stores flexible JSON documents, modern SQL databases have evolved specialized data types and features to handle unstructured data, nested documents, and high-dimensional vector embeddings.
 - PostgreSQL (JSONB): PostgreSQL has a jsonb (Binary JSON) data type. Unlike standard text JSON, jsonb parses the data into a decomposed binary format, making it fast to query and index. You can create GIN (Generalized Inverted Index) indexes inside nested keys and query deep properties using operators like -> and ->>.

 - MySQL (JSON): MySQL also supports a native JSON data type with built-in functions (like JSON_EXTRACT, JSON_CONTAINS, and multi-valued virtual generated columns) that let you query and index nested fields. 
