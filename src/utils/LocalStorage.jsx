
const employees = [
      {
        "employeeId": "emp001",
        "email": "john.doe@company.com",
        "password": "password123",
        "tasks": [
          {
            "taskId": "task101",
            "taskTitle": "Update Website Content",
            "description": "Revise the homepage content based on the new marketing guidelines.",
            "date": "2024-10-15",
            "category": "Content Update",
            "activeTask": true,
            "newTask": true,
            "completedTask": false,
            "failedTask": false
          },
          {
            "taskId": "task102",
            "taskTitle": "Fix Landing Page Bugs",
            "description": "Identify and fix bugs on the landing page reported by the QA team.",
            "date": "2024-10-10",
            "category": "Bug Fixing",
            "activeTask": false,
            "newTask": false,
            "completedTask": true,
            "failedTask": false
          }
        ]
      },
      {
        "employeeId": "emp002",
        "email": "jane.smith@company.com",
        "password": "password456",
        "tasks": [
          {
            "taskId": "task103",
            "taskTitle": "Prepare Monthly Sales Report",
            "description": "Compile and prepare the sales report for the month of September.",
            "date": "2024-10-01",
            "category": "Report",
            "activeTask": false,
            "newTask": false,
            "completedTask": true,
            "failedTask": false
          },
          {
            "taskId": "task104",
            "taskTitle": "Organize Team Meeting",
            "description": "Arrange a meeting with the marketing and sales teams to discuss the upcoming product launch.",
            "date": "2024-10-12",
            "category": "Meeting",
            "activeTask": true,
            "newTask": true,
            "completedTask": false,
            "failedTask": false
          }
        ]
      },
      {
        "employeeId": "emp003",
        "email": "michael.williams@company.com",
        "password": "password789",
        "tasks": [
          {
            "taskId": "task105",
            "taskTitle": "Client Presentation",
            "description": "Prepare and deliver a presentation for the new client onboarding process.",
            "date": "2024-10-05",
            "category": "Presentation",
            "activeTask": false,
            "newTask": false,
            "completedTask": false,
            "failedTask": true
          },
          {
            "taskId": "task106",
            "taskTitle": "Research Market Trends",
            "description": "Research and provide insights on the latest market trends in the technology sector.",
            "date": "2024-10-20",
            "category": "Research",
            "activeTask": true,
            "newTask": true,
            "completedTask": false,
            "failedTask": false
          }
        ]
      }
]

const admin = [
    {
    "id": "admin001",
    "email": "admin@company.com",
    "password": "adminpassword123"
  }
]
  
  

export const setLocalStorage = () => {
    localStorage.setItem('admin', JSON.stringify(admin))
    localStorage.setItem('employee', JSON.stringify(employees))
}


export const getLocalStorage = () => {
  const adminData = JSON.parse(localStorage.getItem('admin')) || [];  // Ensure fallback to empty array
  const employeeData = JSON.parse(localStorage.getItem('employee')) || [];  // Ensure fallback to empty array

  return { adminData, employeeData };
};


