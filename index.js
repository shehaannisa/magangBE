const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Set up Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle quiz-related events here
});

const quizQuestions = [
    { question: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Madrid', 'Rome'], correctAnswer: 'Paris' },
    // Add more questions
  ];
  
  let currentQuestionIndex = 0;
  
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Send quiz question to the connected client
    socket.emit('quizQuestion', quizQuestions[currentQuestionIndex]);
  
    // Handle client answers
    socket.on('answer', (userAnswer) => {
      const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
      
      // Check if the answer is correct
      const isCorrect = userAnswer === correctAnswer;
  
      // Broadcast the result to all connected clients
      io.emit('answerResult', { isCorrect, correctAnswer });
  
      // Move to the next question
      currentQuestionIndex++;
  
      // Send the next question to all connected clients
      if (currentQuestionIndex < quizQuestions.length) {
        io.emit('quizQuestion', quizQuestions[currentQuestionIndex]);
      } else {
        // End of the quiz
        io.emit('quizEnd');
      }
    });
  });
  