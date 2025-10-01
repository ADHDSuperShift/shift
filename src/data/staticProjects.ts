// Static project data - works without database
export const staticProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.',
    image: '/placeholder.svg',
    category: 'Web Application',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    demo_url: 'https://demo.example.com',
    created_at: '2024-01-15'
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication, transaction history, and bill payments.',
    image: '/placeholder.svg',
    category: 'Mobile App',
    technologies: ['React Native', 'Firebase', 'Plaid API', 'TouchID'],
    demo_url: 'https://banking-demo.example.com',
    created_at: '2024-02-20'
  },
  {
    id: '3',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Business intelligence dashboard with machine learning insights and predictive analytics.',
    image: '/placeholder.svg',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
    demo_url: 'https://analytics-demo.example.com',
    created_at: '2024-03-10'
  },
  {
    id: '4',
    title: 'Real-Time Collaboration Tool',
    description: 'Team collaboration platform with real-time editing, video calls, and project management features.',
    image: '/placeholder.svg',
    category: 'Web Application',
    technologies: ['Next.js', 'Socket.io', 'WebRTC', 'MongoDB', 'Docker'],
    demo_url: 'https://collab-demo.example.com',
    created_at: '2024-03-25'
  },
  {
    id: '5',
    title: 'IoT Device Management System',
    description: 'Comprehensive IoT platform for device monitoring, data visualization, and remote control.',
    image: '/placeholder.svg',
    category: 'Desktop App',
    technologies: ['Electron', 'MQTT', 'InfluxDB', 'Grafana', 'Python'],
    created_at: '2024-04-05'
  },
  {
    id: '6',
    title: 'Blockchain Supply Chain Tracker',
    description: 'Transparent supply chain tracking system using blockchain technology for product authenticity.',
    image: '/placeholder.svg',
    category: 'Web Application',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
    demo_url: 'https://blockchain-demo.example.com',
    created_at: '2024-04-20'
  }
];

export default staticProjects;
