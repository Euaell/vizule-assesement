# Survey Application

A modern, responsive survey application built with Next.js, MongoDB, and Mongoose. This application allows users to create surveys with custom questions and collect responses from participants.

## Features

- **Create Surveys**: Create custom surveys with multiple questions
- **Respond to Surveys**: Easy interface for users to submit responses
- **View Responses**: See all responses for a specific survey
- **MongoDB Integration**: Data persistence using MongoDB and Mongoose
- **Modern UI**: Responsive design with a clean, modern interface
- **Error Handling**: Comprehensive error pages and graceful error handling

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **Backend**: Next.js API routes, Server Components, and Server Actions
- **Database**: MongoDB with Mongoose ODM
- **Styling**: TailwindCSS for utility-first styling
- **TypeScript**: Type-safe code throughout the application

## Project Structure

```
├── actions/            # Server actions for form submissions
├── app/                # Next.js app router components
│   ├── api/            # API routes
│   ├── create-survey/  # Create survey page
│   ├── survey/         # Survey pages
│   └── ...
├── components/         # Reusable React components
├── data/               # Data access layer with server actions
├── helper/             # Helper utilities
├── lib/                # Library code (Mongoose connection)
├── models/             # Mongoose models for MongoDB
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## Data Models

The application uses two main Mongoose models:

### Survey Model
```typescript
{
  title: string;              // Survey title
  questions: string[];        // Array of question texts
  responses: ObjectId[];      // References to Response documents
  createdAt: Date;            // Timestamp when created
  updatedAt: Date;            // Timestamp when updated
}
```

### Response Model
```typescript
{
  answers: string[];          // Array of answers
  surveyId: ObjectId;         // Reference to parent Survey
  createdAt: Date;            // Timestamp when created
  updatedAt: Date;            // Timestamp when updated
}
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/survey-application.git
   cd survey-application
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/vizule-survey-app
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## API Routes

The application includes the following API endpoints:

- `GET /api/surveys` - Get all surveys
- `POST /api/surveys` - Create a new survey
- `GET /api/surveys/:id` - Get a specific survey
- `GET /api/surveys/:id/responses` - Get all responses for a survey
- `POST /api/surveys/:id/responses` - Submit a response to a survey

## Server Actions

The application uses React Server Actions for form handling:

- `addSurvey(title, questions)` - Create a new survey
- `addResponse(surveyId, answers)` - Add a response to a survey
- `fetchSurveyById(id)` - Fetch a survey by ID
- `fetchAllSurveys()` - Fetch all surveys

## Error Handling

The application includes three types of error pages:

1. **Not Found (404)**: When a page or resource cannot be found
2. **Global Error**: For application-wide errors
3. **Survey Error**: Specific to survey loading issues

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB and Mongoose teams for the database and ODM
- TailwindCSS team for the styling utilities
