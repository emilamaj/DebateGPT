import subprocess
import shutil
import os


# Clean up the 'release' directory
if os.path.exists("./release.zip"):
    os.remove("./release.zip")
if os.path.exists("./release"):
    shutil.rmtree("./release")

# Build the frontend
print("Building the frontend...")
subprocess.check_call(["cmd", "/c", "npm run build"], cwd="./frontend")
print("Frontend build completed.")

print("Packaging the app into release.zip...")
# Create a directory structure
os.makedirs("release/frontend", exist_ok=True)

# Copy built frontend to the newly created directory
shutil.copytree("./frontend/build", "./release/frontend/build")

# Copy backend to the newly created directory
shutil.copytree("./backend", "./release/backend")

# Copy run.py to the newly created directory
shutil.copy("./run.py", "./release/run.py")

# Create a zip file from the 'release' directory
shutil.make_archive("release", 'zip', "./release")
print("release.zip created.")

# Clean up the 'release' directory
shutil.rmtree("./release")

print("Build completed.")