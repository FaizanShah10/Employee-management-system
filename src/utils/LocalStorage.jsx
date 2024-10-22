const employees = [
  {
    employeeId: "emp001",
    firstName: "John",
    email: "john.doe@company.com",
    password: "password123",
    tasks: [
      {
        taskId: "task101",
        taskTitle: "Update Website Content",
        description: "Revise the homepage content based on the new marketing guidelines.",
        date: "2024-10-15",
        category: "Content Update",
        status: "new" 
      },
      {
        taskId: "task102",
        taskTitle: "Fix Landing Page Bugs",
        description: "Identify and fix bugs on the landing page reported by the QA team.",
        date: "2024-10-10",
        category: "Bug Fixing",
        status: "completed"
      }
    ],
    CountTask: {
      newTaskCount: 1,
      activeTaskCount: 1,
      completedTaskCount: 1,
      failedTaskCount: 0
    }
  },
  {
    employeeId: "emp002",
    firstName: "Jane",
    email: "jane.smith@company.com",
    password: "password456",
    tasks: [
      {
        taskId: "task103",
        taskTitle: "Prepare Monthly Sales Report",
        description: "Compile and prepare the sales report for the month of September.",
        date: "2024-10-01",
        category: "Report",
        status: "completed"
      },
      {
        taskId: "task104",
        taskTitle: "Organize Team Meeting",
        description: "Arrange a meeting with the marketing and sales teams to discuss the upcoming product launch.",
        date: "2024-10-12",
        category: "Meeting",
        status: "active"
      }
    ],
    CountTask: {
      newTaskCount: 1,
      activeTaskCount: 1,
      completedTaskCount: 1,
      failedTaskCount: 0
    }
  },
  {
    employeeId: "emp003",
    firstName: "Michael",
    email: "michael.williams@company.com",
    password: "password789",
    tasks: [
      {
        taskId: "task105",
        taskTitle: "Client Presentation",
        description: "Prepare and deliver a presentation for the new client onboarding process.",
        date: "2024-10-05",
        category: "Presentation",
        status: "failed"
      },
      {
        taskId: "task106",
        taskTitle: "Research Market Trends",
        description: "Research and provide insights on the latest market trends in the technology sector.",
        date: "2024-10-20",
        category: "Research",
        status: "new"
      }
    ],
    CountTask: {
      newTaskCount: 1,
      activeTaskCount: 1,
      completedTaskCount: 0,
      failedTaskCount: 1
    }
  }
];

const admin = [
  {
    id: "admin001",
    firstName: "Admin",
    email: "admin@company.com",
    password: "adminpassword123"
  }
];

// Function to set localStorage data
export const setLocalStorage = () => {
    localStorage.setItem('admin', JSON.stringify(admin));
    localStorage.setItem('employee', JSON.stringify(employees));
};

// Function to get localStorage data
export const getLocalStorage = () => {
  const adminData = JSON.parse(localStorage.getItem('admin')) || [];
  const employeeData = JSON.parse(localStorage.getItem('employee')) || [];
  return { adminData, employeeData };
};
