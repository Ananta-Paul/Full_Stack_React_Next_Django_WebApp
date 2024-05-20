# MyStockList

Welcome to MyStockList, a modern stock tracking application built with [Next.js](https://nextjs.org/) and Django. This application allows you to keep track of your favorite stocks.

## Project Structure

This project is divided into two main parts: the frontend and the backend.

### Frontend

The frontend is a [Next.js](https://nextjs.org/) application located in the `frontend` directory. It uses [React](https://reactjs.org/) for UI components, [SWR](https://swr.vercel.app/) for data fetching, and [Tailwind CSS](https://tailwindcss.com/) for styling.

### Backend

The backend is a Django application located in the `backend` directory. It provides a RESTful API for the frontend to interact with.

## Getting Started

To get started with development, you'll need to run both the frontend and backend servers.

### Running the Frontend

Navigate to the frontend directory and install the dependencies:

```sh
cd frontend
npm install
```

Then, start the development server:

```sh
npm run dev
```

Open `http://localhost:3000` with your browser to see the result.

### Running the Backend

Navigate to the backend directory and install the dependencies:

```sh
cd backend
pip install -r requirements.txt
```

Then, apply any outstanding database migrations:

```sh
python manage.py migrate
```

Finally, start the development server:

```sh
python manage.py runserver
```

Open `http://localhost:8000` with your browser to see the result.

### Contributing

Contributions are welcome! Please read our contributing guide for details.

### License

This project is licensed under the terms of the MIT license. See the LICENSE file for details.
