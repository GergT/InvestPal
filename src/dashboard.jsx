import './dashboard.css';
import FileUploader from './components/fileuploader.jsx';

function Dashboard({ user, setUser }) {
    return (

         

        <div>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap');
            </style>




            <h1>My Dashboard</h1>
            <p>Upload a file to get started and view your dashboard!</p>

            <FileUploader />
        </div>
    );
}

export default Dashboard;
