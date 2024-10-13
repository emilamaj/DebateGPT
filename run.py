import subprocess
import signal
import os
import time
import http.server
import ssl
from threading import Thread

# Function to run the frontend HTTPS server
def run_frontend():
    # Change directory to the frontend build folder
    os.chdir('./frontend/build')
    
    # Define the handler and server
    handler = http.server.SimpleHTTPRequestHandler
    httpd = http.server.HTTPServer(('0.0.0.0', 443), handler)
    
    # Wrap the server socket with SSL
    try:
        httpd.socket = ssl.wrap_socket(
            httpd.socket,
            certfile='/etc/letsencrypt/live/debategpt.emileamaj.xyz/fullchain.pem',
            keyfile='/etc/letsencrypt/live/debategpt.emileamaj.xyz/privkey.pem',
            server_side=True
        )
        print("Frontend HTTPS server running on port 443")
        httpd.serve_forever()
    except Exception as e:
        print(f"Failed to start HTTPS server: {e}")
        os._exit(1)

# Commands to start the backend server
backend_cmd = (
    "uvicorn main:app "
    "--host 0.0.0.0 "
    "--port 8000 "
    "--ssl-keyfile=/etc/letsencrypt/live/debategpt.emileamaj.xyz/privkey.pem "
    "--ssl-certfile=/etc/letsencrypt/live/debategpt.emileamaj.xyz/fullchain.pem"
)

# Function to run the backend server
def run_backend():
    try:
        print("Starting backend server...")
        subprocess.run(backend_cmd, shell=True, cwd='./backend', check=True)
    except subprocess.CalledProcessError as e:
        print(f"Backend server failed: {e}")
        os._exit(1)

# Start the frontend server in a separate thread
frontend_thread = Thread(target=run_frontend, daemon=True)
frontend_thread.start()

# Start the backend server in the main thread
backend_process = subprocess.Popen(backend_cmd, shell=True, cwd='./backend')

# Create a list to hold all the spawned processes
processes = [backend_process]

# Function to handle SIGTERM and SIGINT signals
def signal_handler(sig, frame):
    print("Shutting down servers...")
    for process in processes:
        if process.poll() is None:  # Check if process is still running
            process.terminate()     # If it is, terminate it
    os._exit(0)  # Exit the script

# Register the signal handler
signal.signal(signal.SIGTERM, signal_handler)
signal.signal(signal.SIGINT, signal_handler)

# Keep the script running
print("Servers started. Press Ctrl+C to shut down.")
while True:
    time.sleep(1)
