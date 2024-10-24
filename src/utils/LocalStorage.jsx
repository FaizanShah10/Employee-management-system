const employees = [
  {
    employeeId: "1",
    firstName: "John",
    email: "john.doe@company.com",
    password: "password123",
    tasks: [
      {
        taskId: "task101",
        taskTitle: "Update Website Content",
        taskDescription: "Revise the homepage content based on the new marketing guidelines.",
        taskCategory: "Content Update",
        taskDate: "2024-10-15",
        assignTo: "John",
        status: "new"
      },
      {
        taskId: "task102",
        taskTitle: "Fix Landing Page Bugs",
        taskDescription: "Identify and fix bugs on the landing page reported by the QA team.",
        taskCategory: "Bug Fixing",
        taskDate: "2024-10-10",
        assignTo: "John",
        status: "completed"
      }
    ],
    CountTask: {
      newTaskCount: 1,
      activeTaskCount: 0,
      completedTaskCount: 1,
      failedTaskCount: 0
    }
  },
  {
    employeeId: "2",
    firstName: "Jane",
    email: "jane.smith@company.com",
    password: "password456",
    tasks: [
      {
        taskId: "task103",
        taskTitle: "Prepare Monthly Sales Report",
        taskDescription: "Compile and prepare the sales report for the month of September.",
        taskCategory: "Report",
        taskDate: "2024-10-01",
        assignTo: "Jane",
        status: "completed"
      },
      {
        taskId: "task104",
        taskTitle: "Organize Team Meeting",
        taskDescription: "Arrange a meeting with the marketing and sales teams to discuss the upcoming product launch.",
        taskCategory: "Meeting",
        taskDate: "2024-10-12",
        assignTo: "Jane",
        status: "active"
      }
    ],
    CountTask: {
      newTaskCount: 0,
      activeTaskCount: 1,
      completedTaskCount: 1,
      failedTaskCount: 0
    }
  },
  {
    employeeId: "3",
    firstName: "Michael",
    email: "michael.williams@company.com",
    password: "password789",
    tasks: [
      {
        taskId: "task105",
        taskTitle: "Client Presentation",
        taskDescription: "Prepare and deliver a presentation for the new client onboarding process.",
        taskCategory: "Presentation",
        taskDate: "2024-10-05",
        assignTo: "Michael",
        status: "failed"
      },
      {
        taskId: "task106",
        taskTitle: "Research Market Trends",
        taskDescription: "Research and provide insights on the latest market trends in the technology sector.",
        taskCategory: "Research",
        taskDate: "2024-10-20",
        assignTo: "Michael",
        status: "new"
      }
    ],
    CountTask: {
      newTaskCount: 1,
      activeTaskCount: 0,
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
    password: "adminpassword123",
    tasks: []
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
