import os
import zipfile
import requests

# Set up the URL for the API endpoint
url = "https://api.anonfiles.com/upload"

# Check if the "Extension" folder exists
if os.path.isdir("Extension"):
    
    # Create a zip file of the folder contents
    with zipfile.ZipFile("Extension.zip", "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk("Extension"):
            for file in files:
                zipf.write(os.path.join(root, file))
    
    # Open the zip file and create a requests file object
    with open("Extension.zip", "rb") as f:
        files = {"file": f}
        
        # POST the file to the API endpoint
        response = requests.post(url, files=files, verify=False)
        
        # Check the response for success
        if response.ok and response.json()['status']:
            full_url = response.json()['data']['file']['url']['full']
            print(f'Uploaded Extension.zip to:')
            
            # Send a GET request to the URL and get the HTML content
            response = requests.get(full_url)

            # Find the index of the id "download-url" in the HTML content
            download_url_index = response.text.find('id="download-url"')
            href_start_index = response.text.find('href="', download_url_index) + len('href="')
            href_end_index = response.text.find('"', href_start_index)
            href = response.text[href_start_index:href_end_index]
            print("Direct URL: ", href)
        
        else:
            print("Upload failed.")
else:
    print("Folder 'Extension' not found.")
