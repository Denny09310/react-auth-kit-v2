# React Auth Kit v2

React Auth Kit v2 is a TypeScript library for managing authentication state in React applications. It builds upon the original "react-auth-kit" with enhancements and improvements, offering a robust solution for handling user authentication and token management.

## Features

- **Authentication State Management**: Easily manage user authentication state in your React app.
- **Token Management**: Securely handle access and refresh tokens.
- **User Authentication**: Implement user login and logout functionality.
- **Customizable**: Configure and extend the library to fit your specific authentication requirements.
- **React Router Integration**: Seamlessly integrate with React Router for protected routes.

## Installation

You can install React Auth Kit v2 via npm or yarn:

```bash
npm install react-auth-kit-v2
# OR
pnpm install react-auth-kit-v2
# OR
yarn add react-auth-kit-v2
```

## Usage
Here's how you can get started with React Auth Kit v2 in your React application:

```tsx
Copy code
import React from 'react';
import { AuthProvider } from 'react-auth-kit-v2';

function App() {
  return (
    <AuthProvider authType="token">
      {/* Your application components */}
    </AuthProvider>
  );
}

export default App;
```

## Documentation
The official documentation for React Auth Kit v2 is currently under development. Stay tuned for in-depth guides, examples, and API references.

## Contributing
We welcome contributions from the community to make React Auth Kit v2 even better. Whether it's reporting issues, suggesting improvements, or submitting pull requests, your help is valuable. Please follow our contribution guidelines to get started.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- React
- React Router
- TypeScript
- Immer
- Original react-auth-kit

## Contact
If you have any questions, suggestions, or issues, please feel free to contact us at k.denny2000@gmail.com.
