import subprocess
import signal
import os
import time

# Commands to start the frontend and backend servers
frontend_cmd = "serve -s build -l 80"
backend_cmd = "uvicorn main:app --host 0.0.0.0 --port 8000"

# Start the frontend and backend servers
print("Starting servers...")
print(frontend_cmd)
frontend_process = subprocess.Popen(frontend_cmd, shell=True, cwd='./frontend')
print(backend_cmd)
backend_process = subprocess.Popen(backend_cmd, shell=True, cwd='./backend')

# Create a list to hold all the spawned processes
processes = [frontend_process, backend_process]

# Function to handle SIGTERM and SIGINT signals
def signal_handler(signal, frame):
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