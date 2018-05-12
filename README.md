# Magically
This project contains the implementation of an application that aims to help improve the accessibility of any website without relying on the owner to fix the issues it has.  

To achieve this behavior, the application tries to empower non-technical users by giving them an editor that helps them provide sensible fixes to the accessiblity issues found in a particular website of their choice.  

We then use the high-level fixes provided by our users in a chrome extension. The extension checks if the website the user is currently on has had its accessibility improved by a user in our editor. If this is the case, we automatically translate the high-level fixes our user created to code. This code is injected into the website, providing real-time correction of the accessibility issues that were fixed by our users in the first place.  

## Project Structure  
1. The editor is provided through a web app. As such, this is located under the frontend/ folder.  
2. The chrome extension that automatically loads the fixes made by users and applies them to the current website is located under chrome_extension/.  
3. The backend that the editor relies on to find the accessibility issues of a given url is found under /audit_backend.  
