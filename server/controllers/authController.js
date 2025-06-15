// controllers/authController.js

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  console.log('Register request:', { name, email, password });

  // Just a mock response for now
  res.status(201).json({
    message: 'User registered successfully (mock)',
    user: {
      id: '123abc',
      name,
      email
    },
    token: 'mock-jwt-token-123'
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', { email, password });

  // Just a mock response for now
  res.status(200).json({
    message: 'User logged in (mock)',
    user: {
      id: '123abc',
      email
    },
    token: 'mock-jwt-token-123'
  });
};
