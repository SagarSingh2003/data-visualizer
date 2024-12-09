# data-visualizer
This project is a web application designed for analyzing chart data using interactive visualizations. The app integrates with Google Sheets to enable real-time updates and offers features like user authentication, data filtering, sharing, and preference persistence.

![image](https://github.com/user-attachments/assets/ea7bdec3-f836-474a-8752-4c73a43af6fa)




---

## Features

- **Cookie-Based Authentication**:
  - Secure and custom implementation of sign-up, sign-in, and sign-out functionality using cookies.

- **Real-Time Data Synchronization**:
  - Automatically updates data on the website whenever changes are made in connected Google Sheets, using a pipeline powered by webhooks and Apps Script.

- **Interactive Charts**:
  - Pan, zoom in, and zoom out functionality for line charts.
  - Clickable bar charts to view detailed time-trend analyses on the line chart.

- **User Preferences Persistence**:
  - Stores user preferences using cookies to provide a seamless, consistent experience across sessions.

- **Data Sharing**:
  - Users can apply filters, generate customized graph views, and share them via unique URLs. Shared graphs are accessible only to authenticated users.

---

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ORM
- **Data Pipeline**: Google Sheets webhooks and Apps Script
- **Authentication**: Cookie-based authentication

---

## API Endpoints

### Authentication
- `POST /signup`: Registers a new user.
- `POST /signin`: Logs in a user and issues a session cookie.
- `POST /signout`: Logs out a user and clears the session cookie (requires authentication).

### Chart Data
- `GET /`: Fetches chart data for visualization.
- `POST /update-data`: Updates chart data via a webhook triggered by Google Sheets.

### Sharing
- `POST /`: Shares filtered graph data with a unique URL.
- `GET /:id`: Fetches shared preferences for the authenticated user.

---

## Database Schemas

### Chart Data Schema
```javascript
const dataSchema = new mongoose.Schema({
  day: { type: Date },
  age: { type: String, enum: ["15-25", ">25"] },
  gender: { type: String, enum: ["Male", "Female"] },
  A: { type: Number },
  B: { type: Number },
  C: { type: Number },
  D: { type: Number },
  E: { type: Number },
  F: { type: Number },
});

```


### Cookie Data Schema
```javascript
const cookieDataSchema = new mongoose.Schema({
  email: { type: String, required: true },
  access_token: { type: String, required: true },
});
```

### Shared Data Schema
```javascript
const sharedDataSchema = new mongoose.Schema({
  uuid: { type: String },
  age: { type: String },
  gender: { type: String },
  date_range: { type: String },
});
```

### User Data Schema
```javascript
const userDataSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
```

## How It Works

### Authentication
- Users sign up and log in using a secure cookie-based authentication system.
- The app stores user preferences, enabling a consistent experience across sessions.

### Real-Time Data Updates
- The app listens for updates from Google Sheets via a webhook and reflects these changes on the website.

### Interactive Charts
- Users can manipulate charts with pan and zoom functionalities or explore data trends by interacting with chart elements.

### Data Sharing
- Filtered views of the data can be securely shared with others via unique URLs accessible only to authenticated users.

For any queries or feedback, feel free to reach out to iamsagar762@gmail.com
